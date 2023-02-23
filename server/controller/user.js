
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


  const updateCurrentToken = async (res, req, user) => {

   



    const userRef = doc(db, "users", user.docId)

    await updateDoc(userRef, {
      currentToken: req.body.currentToken
    })

  }
  try {
    const users = await getAllUsers(res)
    const user = users.filter((user) => user.userId === req.body.userId)

    if (!user.length) {
      await createNewUser()
    }

    await updateCurrentToken(res, req, user[0])
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






