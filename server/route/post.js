import express from 'express'
import { addPostToUser } from '../controller/post.js'

const router = express.Router()

router.post("/", addPostToUser)

export default router
