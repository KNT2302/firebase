import express from 'express'
import { create } from '../controller/user.js'


const router = express.Router()

router.post("/", create)


export default router
