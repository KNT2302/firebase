import { io } from "socket.io-client"
import environment from "./environment/env"

export const socket = io(environment,{
  maxHttpBufferSize: 1e8
});
