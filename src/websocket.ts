import { io } from "./http"

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    console.log(data)
  })
})
