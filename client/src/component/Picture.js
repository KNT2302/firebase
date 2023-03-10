
import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import Input from './Input'
import Loading from './Loading'


const PicPicker = ({ handleOnloadImage, isAutoClick }) => {
  const pickerImage = useRef(null)

  const handlePickFile = () => {
    pickerImage.current.click()
  }

  const addImage = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      handleOnloadImage(readerEvent.target.result, pickerImage.current.files[0].name)
    }
    return
  }

  useEffect(() => {
    pickerImage.current.onchange = addImage
    if (isAutoClick) {
      pickerImage.current.click()
    }
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'dashed 1px ' }}>
      <p>Chose a picture</p>
      <div style={{ display: 'none' }}>
        <Input ref={pickerImage} type="file" />
      </div>
      <Button type="button" onClick={handlePickFile} name="Choose" />
    </div>
  )
}

const Picture = ({ getSrc, isNeedChosen, handlePickFile, isAutoClick }) => {

  const [src, setSrc] = useState("")

  const picRef = useRef(null)

  const handleOnloadImage = (src, nameFile) => {

    setSrc(src)
    handlePickFile(src, nameFile)
  }

  useEffect(() => {

    if (isNeedChosen) {
      if (isNeedChosen.haveDone) {
        setSrc("")
      }
    }
  }, [isNeedChosen])

  useEffect(() => {
    const updateSrc = () => {
      setTimeout(async () => {
        if (!isNeedChosen) {
          const url = await getSrc()
          setSrc(url)

        }
      }, 250)

    }
    updateSrc()
  }, [])

  return (
    <>
      {src ? <div ref={picRef} style={{ width: '100%', height: '100%', backgroundImage: `url(${src})`, backgroundPosition: "center", backgroundSize: 'cover' }}>
        {isNeedChosen &&
          <div style={{ fontSize: '1.8rem', padding: '.5em', background: 'rgba(0,0,0,.25)', display: 'inline-block' }}>
            <Button type="button" name="X" onClick={() => {
              setSrc("")
              handlePickFile("")
            }} />

          </div>
        }

      </div> : <>
        {isNeedChosen ? <PicPicker handleOnloadImage={handleOnloadImage} isAutoClick={isAutoClick ? true : false} /> : <Loading />}
      </>
      }
    </>

  )
}

export default Picture
