import { resolveTo } from '@remix-run/router'
import { addDoc, collection } from 'firebase/firestore'
import { ref, uploadString } from 'firebase/storage'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Button from '../../component/Button'
import Picture from '../../component/Picture'
import Popup from '../../component/Popup'
import { db, storage } from '../../firebaseConfig'

const BoxAddNew = ({ bigScreen, handleClosePopup }) => {

  const [selectedPic, setSelectedPic] = useState("")
  const [isNeedChosen, setIsNeedChosen] = useState({ haveDone: false })

  const handlePickFile = (src) => {
    setSelectedPic(src)
  }

  const postNewImage = () => {
    return new Promise((resolve, reject) => {
      if (selectedPic) {
        try {
          setTimeout(async () => {

            const imageRef = ref(storage, `images/2`)
            const uploaded = await uploadString(imageRef, selectedPic, "data_url")

            console.log(uploaded)

            const docRef = await addDoc(collection(db, "photo"), {
              path: uploaded.ref._location.path_
            });

            if (bigScreen) {

              setIsNeedChosen({ ...isNeedChosen, haveDone: true })
              setSelectedPic("")
            }
            if (handleClosePopup) {

              handleClosePopup()

            }
            resolve("copmplete")
          }, 2000)

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

      <form>
        <legend style={{ textAlign: 'center', height:'30px' }}>New picture</legend>
        <div style={{ width: '100%', height: '250px' }}>
          <Picture handlePickFile={handlePickFile} isNeedChosen={isNeedChosen} isAutoClick={bigScreen ? false : true} />

        </div>
        <div style={{ fontSize: '1.8rem' }}>
          {selectedPic && <Button type="submit" name="Add" onClick={postNewImage} />}
        </div>
      </form>
    </div>
  )
}

const AddNew = () => {

  const sizeObj = useRef({
    BIG: 'big',
    SMALL: 'small'
  })

  const getSizeScreen = useCallback((size) => {
    if (size >= 800) {
      return sizeObj.current.BIG
    }
    return sizeObj.current.SMALL
  }, [])



  const [screenSize, setScreenSize] = useState(getSizeScreen(window.innerWidth))

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenSize(getSizeScreen(window.innerWidth))
    })
  }, [])


  const children = (handleClosePopup) => {
    return <BoxAddNew handleClosePopup={handleClosePopup} />
  }

  return (
    <div style={{ fontSize: '1.8rem' }}>
      {screenSize === sizeObj.current.BIG ? <BoxAddNew bigScreen /> : <Popup getChildren={children} name="New">
        <BoxAddNew />
      </Popup>}


    </div>
  )
}

export default AddNew
