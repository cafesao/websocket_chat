import { io } from "./http"

io.on("connection", (socket) => {
  console.log(`User ID: ${socket.id}`)
})