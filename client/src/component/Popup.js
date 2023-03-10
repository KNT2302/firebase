import React, { useEffect, useState } from 'react'
import Button from './Button'
import messageStore from "../store/message"

const Content = ({ handleTogglePopup, getChildren, resetState, maxWidth, whenClose, isLinkNotify }) => {
  const [isFadedIn, setIsFadedIn] = useState(false)
  const { toggleClickLink } = messageStore(state => state)


  let timer = null

  const handleToggleFadedIn = () => { setIsFadedIn(!isFadedIn) }

  const handleClosePopup = () => {
    handleToggleFadedIn()
    timer = setTimeout(() => {

      handleTogglePopup()

      if (resetState) {
        resetState()
      }
    }, 150)
  }

  useEffect(() => {
    setIsFadedIn(!isFadedIn)
    return () => {
      console.log('run timer')
      clearTimeout(timer)
    }
  }, [])

  const maxWidthProp = maxWidth ? maxWidth : "375px"
  return (


    <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.5)', padding: '0 20px', zIndex:'2' }}>
      <div style={{ opacity: `${isFadedIn ? "1" : '.5'}`, borderRadius: '3px', transition: '0.15s', backgroundColor: 'lightpink', width: '100%', maxWidth: maxWidthProp, position: 'relative' }}>
        {getChildren(handleClosePopup)}
        <div style={{ position: 'absolute', top: '0% ', right: '0%', transform: 'translateY(-100%)', background: 'lightpink', borderRadius: ".1em" }}>
          <Button type="button" name="X" onClick={handleClosePopup} />
        </div>

      </div>
    </div>

  )
}


const Popup = ({ name, getChildren, resetState, maxWidth, whenClick, whenClose, openPopupByClick, isLinkNotify, commonClose, icon }) => {

  const [isOpen, setIsOpen] = useState(false)

  const clickOpen = () => {
    setIsOpen(true)
    if (whenClick) {
      whenClick()
    }
  }

  const clickClose = () => {
    if (commonClose) {

      commonClose()
    }
    if (isLinkNotify) {
      whenClose()
    } else {
      setIsOpen(false)
    }
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: "flex-start" }}>

        <Button icon={icon} type="button" onClick={clickOpen} name={name} />
      </div>
      {(isOpen || (openPopupByClick && isLinkNotify)) &&
        <Content openPopupByClick getChildren={getChildren} handleTogglePopup={clickClose} isLinkNotify={isLinkNotify} resetState={resetState} maxWidth={maxWidth} whenClose={whenClose ? whenClose : () => { }} />
      }
    </>
  )
}

export default Popup
