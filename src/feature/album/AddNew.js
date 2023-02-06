import { ref, uploadString } from 'firebase/storage'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Button from '../../component/Button'
import Input from '../../component/Input'
import Picture from '../../component/Picture'
import Popup from '../../component/Popup'
import { storage } from '../../firebaseConfig'

const BoxAddNew = ({  bigScreen }) => {

  const [selectedPic, setSelectedPic] = useState("")

  const handlePickFile = (src) => {
    setSelectedPic(src)
  }

  const postNewImage = async () => {
    if (selectedPic) {
      try {

        const imageRef = ref(storage, 'images/')
        const uploaded = await uploadString(imageRef, selectedPic, "data_url")
      }
      catch (e) {
        console.log(e)
      }
    }
  }
  return (
    <div>

      <form>
        <legend style={{ textAlign: 'center' }}>New picture</legend>
        <div style={{ width: '100%', height: '250px' }}>
          <Picture handlePickFile={handlePickFile} isNeedChosen isAutoClick={bigScreen ? false : true} />

        </div>
        {selectedPic && <Button type="submit" name="Add" onClick={postNewImage} />}
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
    window.addEventListener("resize", (e) => {
      setScreenSize(getSizeScreen(e.target.screen.width))
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
