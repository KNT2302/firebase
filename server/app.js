import express from "express"

import FCM from "fcm-node"

import { initializeApp } from "firebase/app"
import { getFirestore, getDocs, collection } from "firebase/firestore";
import tokenDeviceRoute from "./route/tokenDevice.js"
import pushNotificationRoute from "./route/pushNotification.js"
import { getMessaging } from "firebase/messaging";

var app = express()

const firebaseConfig = {
  apiKey: "AIzaSyCnpivtvDO0XegoH96q7ncfa9IxoFIpkU8",
  authDomain: "fire-3f3bd.firebaseapp.com",
  projectId: "fire-3f3bd",
  storageBucket: "fire-3f3bd.appspot.com",
  messagingSenderId: "352487235953",
  appId: "1:352487235953:web:8a904eefc1d636f5fa56d0",
  measurementId: "G-L7PM1VZ6MK"
}

var port = 3000



const firebase = initializeApp(firebaseConfig)

export const db = getFirestore(firebase)

app.listen(port, () => {
  console.log('Listening on port', port)
})

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.post("/fcm", async (req, res, next) => {
  try {
   
  } catch (err) {
    next(err)
  }
})

app.use("/api/deviceToken", tokenDeviceRoute)
app.use("/api/pushNotification", pushNotificationRoute)








