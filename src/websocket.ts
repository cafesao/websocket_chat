import { io } from "./http"
import { UserInterface, MessagesInterface } from "./interface/interface"

let users: UserInterface[] = []
let messages: MessagesInterface[] = []

io.on("connection", (socket) => {
  socket.on("join", (data: UserInterface) => {
    const userInRoom = users.find(
      (user) => user.username === data.username && user.room === data.room
    )
    socket.join(data.room)

    if (userInRoom) {
      userInRoom.socket_id = socket.id
    } else {
      const user = {
        socket_id: socket.id,
        username: data.username,
        room: data.room
      }
      users.push(user)
    }

    const messagesRoom = getMessagesRoom(data.room)
    socket.emit("join", { messages: messagesRoom })
  })
  socket.on("sendMessage", (data) => {
    const message: MessagesInterface = {
      username: data.username,
      room: data.room,
      message: data.message,
      createdAt: new Date()
    }
    messages.push(message)

    io.to(data.room).emit("sendMessage", message)
  })
  socket.on("disconnect", () => {
    users = users.filter((user) => user.socket_id !== socket.id)
  })
})

function getMessagesRoom(room: string) {
  return messages.filter((message) => message.room === room)
}
