import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore"
import { db } from "../app.js"

export const getAllUsers = async (res) => {

  const devices = []
  try {
    const querySnapshot = await getDocs(collection(db, "users"))

    querySnapshot.forEach((doc) => {
      devices.push(doc.data())
    })

    return devices

  } catch (err) {
    res.status(200).json({ success: false, err })
  }
}


export const getUser = async (res, userId) => {
  try {
    const allUser = await getAllUsers(res)


    const user = allUser.filter((user) => user.userId === userId)
    return user
  } catch {
    res.status(200).json({ success: false, message: 'Failed!' })
  }
}


export const getOne = async (res, path, id, fieldName) => {
  try {
    const all = await getAll(res, path)


    const user = all.filter((item) => item[fieldName] === id)
    return user
  } catch {
    res.status(200).json({ success: false, message: 'Failed!' })
  }
}


export const getAll = async (res, path) => {
  const arr = []
  try {
    const querySnapshot = await getDocs(collection(db, path))

    querySnapshot.forEach((doc) => {
      devices.push(doc.data())
    })

    return arr

  } catch (err) {
    res.status(200).json({ success: false, err })
  }
}

export const createOne = async (collectionName, data, res) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data)


    const oneRef = doc(db, collectionName, docRef.id)

    await updateDoc(oneRef, {
      id: docRef.id
    })

    return docRef.id

  } catch (error) {
    res.status(200).json(`failed ${error}`)
  }
}
