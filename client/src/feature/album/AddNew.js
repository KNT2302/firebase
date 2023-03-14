import { async } from '@firebase/util'
import { resolveTo } from '@remix-run/router'
import { addDoc, collection } from 'firebase/firestore'
import { ref, uploadString } from 'firebase/storage'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Button from '../../component/Button'
import Picture from '../../component/Picture'
import Popup from '../../component/Popup'
import { db, storage } from '../../firebaseConfig'
import axiosProvider from '../../ulti/axios'
import useResponsive from '../../ulti/hooks/reponsive'
import { useUploadPicture } from '../../ulti/hooks/uploadPicture'

const BoxAddNew = ({ bigScreen, handleClosePopup, updateList }) => {


  const { selectedPic, handlePickFile, upLoadImagesPicked } = useUploadPicture()
  const [isNeedChosen, setIsNeedChosen] = useState({ haveDone: false })


  const postNewImage = () => {
    return new Promise((resolve, reject) => {
      if (selectedPic) {
        try {
          setTimeout(async () => {

            const imagesUploaded = await upLoadImagesPicked()



            const docRef = await addDoc(collection(db, "posts"), {
              urlPhoto: imagesUploaded
            })

            const addPostToUser = await axiosProvider.post("/api/post", {}, {
              userId: JSON.parse(localStorage.getItem('user')).data.userId,
              postId: docRef._key.path.segments[1]
            })

            updateList({
              caption: "",
              urlPhoto: imagesUploaded,
              postId: docRef._key.path.segments[1]
            })

            if (bigScreen) {
              setIsNeedChosen({ ...isNeedChosen, haveDone: true })
              handlePickFile([])
            }
            if (handleClosePopup) {
              handleClosePopup()
            }
            resolve("copmplete")
          }, 0)

        }
        catch (e) {
          reject(e)
          console.log(e)
        }
      }
    })

  }

  return (
    <div>
      <form style={{ width: '100%' }}>
        <legend style={{ textAlign: 'center', height: '31px' }}>New picture</legend>
        <div style={{ width: '100%', height: '250px' }}>
          <Picture handlePickFile={handlePickFile} isNeedChosen={isNeedChosen} isAutoClick={bigScreen ? false : true} multiple />
        </div>
        <div style={{ fontSize: '1.8rem' }}>
          {selectedPic.length > 0 && <Button type="submit" name="Add" onClick={postNewImage} />}
        </div>
      </form>
    </div>
  )
}

const AddNew = ({ updateList }) => {

  const sizeObj = {
    BIG: 'big',
    SMALL: 'small'
  }

  const getSizeScreen = (size) => {
    if (size >= 800) {
      return sizeObj.BIG
    }
    return sizeObj.SMALL
  }



  const { screenSize } = useResponsive(getSizeScreen)


  const children = (handleClosePopup) => {
    return <BoxAddNew updateList={updateList} handleClosePopup={handleClosePopup} />
  }

  return (
    <div style={{ fontSize: '1.8rem' }}>
      {screenSize === sizeObj.BIG ? <BoxAddNew updateList={updateList} bigScreen /> :

        <Popup getChildren={children} name="New">
        </Popup>

      }



    </div>
  )
}

export default AddNew
