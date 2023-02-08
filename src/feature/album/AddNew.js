import { resolveTo } from '@remix-run/router'
import { addDoc, collection } from 'firebase/firestore'
import { ref, uploadString } from 'firebase/storage'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Button from '../../component/Button'
import Picture from '../../component/Picture'
import Popup from '../../component/Popup'
import { db, storage } from '../../firebaseConfig'

const BoxAddNew = ({ bigScreen, handleClosePopup, updateList }) => {

  const [selectedPic, setSelectedPic] = useState("")
  const [nameFile, setNameFile] = useState("")
  const [isNeedChosen, setIsNeedChosen] = useState({ haveDone: false })

  const handlePickFile = (src, nameFile) => {
    setSelectedPic(src)
    setNameFile(nameFile)
  }

  const postNewImage = () => {
    return new Promise((resolve, reject) => {
      if (selectedPic) {
        try {
          setTimeout(async () => {

            const imageRef = ref(storage, `images/${nameFile}`)
            const uploaded = await uploadString(imageRef, selectedPic, "data_url")

            const docRef = await addDoc(collection(db, "photo"), {
              path: uploaded.ref._location.path_
            });

            updateList(uploaded.ref._location.path_)

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

const AddNew = ({updateList}) => {

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
    return <BoxAddNew updateList={updateList} handleClosePopup={handleClosePopup} />
  }

  return (
    <div style={{ fontSize: '1.8rem' }}>
      {screenSize === sizeObj.current.BIG ? <BoxAddNew updateList={updateList} bigScreen /> : <Popup getChildren={children} name="New">
      </Popup>}


    </div>
  )
}

export default AddNew
