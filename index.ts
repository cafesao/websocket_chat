import dotenv from "dotenv"
import { serverHttp } from "./src/http"
import "./src/websocket"

dotenv.config()

serverHttp.listen(process.env.PORT || 3000, () =>
  console.log(`Server start in Port: ${process.env.PORT}`)
)
