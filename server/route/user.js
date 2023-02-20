import express from 'express'
import { login, get } from '../controller/user.js'


const router = express.Router()

router.post("/", login)
router.get("/", get)


export default router
