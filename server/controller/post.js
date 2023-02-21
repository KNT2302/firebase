import { addDoc, collection, updateDoc, doc } from 'firebase/firestore'
import { db } from '../app.js'
import { getUser } from '../ulti/common.js'

export const addPostToUser = async (req, res, next) => {
  try {
    const user = await getUser(res, req.body.userId)
    const userRef = doc(db, 'users', user[0].docId)

    const postRef = doc(db, 'posts', req.body.postId)

    const posts = user[0].posts ? user[0].posts : []

    await updateDoc(postRef, {
      userId: user[0].docId,
      postId: req.body.postId
    })

    await updateDoc(userRef, {
      posts: [...posts, req.body.postId]
    })

    res.status(200).json({ success: true, message: 'complete' })
  } catch (err) {
    res.status(200).json({ success: false, err })
  }
}
