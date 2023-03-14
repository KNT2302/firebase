import { ref, uploadString } from 'firebase/storage'
import React, { useState } from 'react'
import { storage } from '../../firebaseConfig'

export const useUploadPicture = () => {
  const [selectedPic, setSelectedPic] = useState([])

  const handlePickFile = (files) => {
    if (!files.length) {
      setSelectedPic([])
    } else {
      setSelectedPic([...selectedPic, ...files])
    }
  }

  const upLoadImagesPicked = async () => {
    const upLoadImage = (file) => {
      return new Promise(async (resolve) => {
        const imageRef = ref(storage, `images/${file.nameFile}`)
        const uploaded = await uploadString(imageRef, file.data_url, "data_url")
        resolve(uploaded.ref._location.path_)
      })
    }

    const result = await Promise.all(selectedPic.map((picture) => {
      return upLoadImage(picture)
    }))
    return result
  }

  return {
    selectedPic,
    handlePickFile,
    upLoadImagesPicked
  }

}
