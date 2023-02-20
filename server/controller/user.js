
import { db } from "../app.js"
import { collection, addDoc, updateDoc, doc } from "firebase/firestore"
import { getAllUsers } from "../ulti/common.js"


export const login = async (req, res, next) => {

  const createNewUser = async () => {
    const docRef = await addDoc(collection(db, "users"), {
      userId: req.body.userId,
      currentToken: req.body.currentToken,
      urlPhoto: req.body.photoURL,
      displayName: req.body.displayName,
      lastSignIn: req.body.lastSignIn,
    })


    const userRef = doc(db, 'users', docRef.id)

    await updateDoc(userRef, {
      docId: docRef.id
    })

  }


  const updateCurrentToken = async (res, req) => {

    const users = await getAllUsers(res)

    const userNeedUpdate = users.filter((user) => user.userId === req.body.userId)

    const userRef = doc(db, "users", userNeedUpdate[0].docId)

    // Set the "capital" field of the city 'DC'
    await updateDoc(userRef, {
      currentToken: req.body.currentToken
    })

  }
  try {

    const dateToday = new Date().getTime()
    if (dateToday === req.body.createdAt) {
      await createNewUser()
    }

    await updateCurrentToken(res, req)
    res.status(200).json({ success: true, data: "dvd" })
  } catch (error) {
    res.status(200).json({ success: false, error })
  }
}

export const get = async (req, res, next) => {
  try {
    const users = await getAllUsers(res)

  

    res.status(200).json({ success: true, data: users })
  } catch (error) {

    res.status(200).json({ success: false, error })
  }
}






