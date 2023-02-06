import { resolveTo } from '@remix-run/router'
import { ref, uploadString } from 'firebase/storage'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Button from '../../component/Button'
import Input from '../../component/Input'
import Picture from '../../component/Picture'
import Popup from '../../component/Popup'
import { storage } from '../../firebaseConfig'

const BoxAddNew = ({ bigScreen }) => {

  const [selectedPic, setSelectedPic] = useState("")

  const handlePickFile = (src) => {
    setSelectedPic(src)
  }

  const postNewImage = () => {
    return new Promise((resolve, reject) => {
      if (selectedPic) {
        try {
          setTimeout(async () => {

            // const imageRef = ref(storage, 'images/')
            // const uploaded = await uploadString(imageRef, selectedPic, "data_url")

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
        <legend style={{ textAlign: 'center' }}>New picture</legend>
        <div style={{ width: '100%', height: '250px' }}>
          <Picture handlePickFile={handlePickFile} isNeedChosen isAutoClick={bigScreen ? false : true} />

        </div>
        <div style={{ fontSize: '1.8rem'}}>
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

  return (
    <div style={{ fontSize: '1.8rem' }}>
      {screenSize === sizeObj.current.BIG ? <BoxAddNew bigScreen /> : <Popup name="New">
        <BoxAddNew />
      </Popup>}


    </div>
  )
}

export default AddNew
