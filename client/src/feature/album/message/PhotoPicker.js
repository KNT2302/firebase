import { async } from '@firebase/util'
import React, { useRef } from 'react'
import Button from '../../../component/Button'
import Picture from '../../../component/Picture'
import Popup from '../../../component/Popup'

const PhotoPicker = ({ handlePickPhoto }) => {
  const srcPhoto = useRef()
  const handlePick = async () => {

    await handlePickPhoto(srcPhoto.current)
  }

  const handlePickFile = (src) => {
    srcPhoto.current = src
  }
  const getChildren = (handleClosePopup) => {
    return (
      <div style={{ height: '250px' }}>
        <Picture isAutoClick isNeedChosen handlePickFile={handlePickFile} />
        <Button name={'Choose'} onClick={() => {
          handlePick()
          handleClosePopup()
        }
        }
        />
      </div>
    )
  }
  return (
    <Popup name="photo" getChildren={getChildren} />
  )
}

export default PhotoPicker
