import React, { useState } from 'react'
import { deleteDoc, doc, setDoc } from "firebase/firestore"
import Button from '../../component/Button'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsFillHeartFill } from 'react-icons/bs'
import { db } from '../../firebaseConfig'

const Like = () => {
  const [isLiked, setIsLiked] = useState(false)

  const likePhoto = async () => {
    try {
      let docRef = null
      if (!isLiked) {
        docRef = await setDoc(doc(db, "photo", "TPRaUU6jdgIIdCrESQIb", "like", "TPRaUU6jdgIIdCrESQIb"), {
          like: 1
        })
      } else {
        docRef = await deleteDoc(doc(db, "photo", "TPRaUU6jdgIIdCrESQIb", "like", "TPRaUU6jdgIIdCrESQIb"))
      }
      console.log("Document written with ID: ", docRef)
    } catch (e) {
      console.error("Error adding document: ", e)
      return e
    }
  }

  const handleOnClick = () => {
    return new Promise((resolve) => {

      setTimeout(async () => {

        const response = await likePhoto()
        if (response) {
          console.log(response)
          resolve("clicked")
          return
        }

        resolve("clicked")
        setIsLiked(!isLiked)
      }, 1000)
    })
  }
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <Button name={!isLiked ? <AiOutlineHeart /> : <BsFillHeartFill style={{ color: 'red' }} />} onClick={handleOnClick} />
    </div>
  )
}

export default Like
