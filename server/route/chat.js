import express from "express"
import {createMessenger, getChat, getRoom} from "../controller/chat.js"

const route = express.Router()
route.get("/",getChat)
route.post("/", createMessenger)
route.get("/room", getRoom)

export default route
