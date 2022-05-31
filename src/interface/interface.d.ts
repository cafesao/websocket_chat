export interface UserInterface {
  socket_id: string
  username: string
  room: string
}

export interface MessagesInterface {
  username: string
  room: string
  message: string
  createdAt: Date
}
