import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import Input from './Input'
import Loading from './Loading'
import Popup from '../component/Popup'
import popupStore from "../store/notify"
import { AiOutlinePlus } from "react-icons/ai"
import scroll from "../ulti/scroll"
import Slide from './Slide'


const PicPicker = ({ handleOnloadImage, isAutoClick, multiple }) => {
  const pickerImage = useRef(null)

  const handlePickFile = () => {
    pickerImage.current.click()
  }

  const addImage = async (e) => {

    const files = Array.from(e.target.files)
    const result = []

    const promise = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          resolve({ nameFile: file.name, data_url: e.target.result })
        }

      })
    })
    const filesRead = await Promise.all(promise)
    handleOnloadImage(filesRead)
  }

  useEffect(() => {
    pickerImage.current.multiple = multiple ? true : false
    pickerImage.current.onchange = addImage
    if (isAutoClick) {
      pickerImage.current.click()
    }
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: 'dashed 1px ', gap: '.5em' }}>
      <p style={{ fontSize: '2rem' }}>Chose a picture</p>
      <div style={{ display: 'none' }}>
        <Input ref={pickerImage} type="file" />
      </div>
      <div>
        <Button icon={<AiOutlinePlus />} type="button" onClick={handlePickFile} name="Choose" />
      </div>

    </div>
  )
}



export const BoxPictures = ({ pictures }) => {
  const [isOpen, setIsOpen] = useState(false)

  const { isBoxImage, openBoxImage, closePopup } = popupStore(state => state)


  const toggleBoxShow = () => {
    setIsOpen(!isOpen)
  }

  const getChildren = () => {
    return (
      <Slide images={pictures} slice={1} />
    )
  }


  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap', position: 'relative' }}>
      {
        pictures.map((item, index) => {
          return (
            index < 4 && (
              <div key={index} style={{ flexBasis: '50%', flexGrow: '1', height: `${pictures.length <= 2 ? '100%' : '50%'}`, backgroundImage: `url(${item.data_url ? item.data_url : item})`, backgroundPosition: "center", backgroundSize: 'cover' }} />
            )
          )
        })
      }
      {

        pictures.length > 4 && (
          <>
            <div style={{ position: 'absolute', bottom: '0', right: '0', width: '50%', height: '50%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }} onClick={toggleBoxShow}>
              {pictures.length - 4} +
            </div>
            <Popup getChildren={getChildren} openPopupByClick={isOpen} isLinkOpen commonClose={toggleBoxShow} />
          </>
        )
      }
    </div>
  )
}

const Picture = ({ getSrc, isNeedChosen, handlePickFile, isAutoClick, multiple, specSrc }) => {

  const [src, setSrc] = useState([])



  const picRef = useRef(null)

  const handleOnloadImage = (newSrc) => {
    setSrc([...src, ...newSrc])
    handlePickFile(newSrc)
  }

  useEffect(() => {
    if (isNeedChosen) {
      if (isNeedChosen.haveDone) {
        setSrc([])
      }
    }
  }, [isNeedChosen])

  useEffect(() => {
    const updateSrc = () => {
      setTimeout(async () => {
        if (!isNeedChosen) {
          const url = await getSrc()
          if (typeof url === 'object') {
            setSrc([...src, ...url])
          } else {
            setSrc([...src, url])
          }
        }

      }, 250)
    }
    if (!specSrc) {
      updateSrc()


    } else {
      setSrc([...src, specSrc])
    }
  }, [])

  console.log(src)

  console.log(multiple)

  return (
    <>
      {
        src.length > 0 && (<>
          {multiple ? <BoxPictures pictures={src} /> : <div style={{ width: '100%', height: '100%', backgroundImage: `url(${src[0]})`, backgroundPosition: "center", backgroundSize: 'cover' }} />}
        </>)
      }
      {
        !src.length && isNeedChosen && (
          <PicPicker handleOnloadImage={handleOnloadImage} isAutoClick={isAutoClick ? true : false} multiple />
        )
      }
      {
        !src.length && !isNeedChosen && (<Loading />)
      }

    </>

  )
}

export default Picture
