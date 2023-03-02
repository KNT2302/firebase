import express from 'express'
import { login, get, makeFriend } from '../controller/user.js'


const router = express.Router()

router.post("/", login)
router.get("/", get)
router.post("/makefriend", makeFriend)


export default router
