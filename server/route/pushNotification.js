import express from "express"
import { pushCommon, subscribDevice } from "../controller/pushNotification.js"

const router = express.Router()

router.post("/", pushCommon)
router.post("/subscribe", subscribDevice)

export default router
