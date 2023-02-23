import React, { useEffect, useState } from 'react'
import Button from './Button'

const Content = ({ handleTogglePopup, getChildren, resetState, position }) => {
  const [isFadedIn, setIsFadedIn] = useState(false)

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
      clearTimeout(timer)
    }
  }, [])

  const positionStyle = position ? position : {
    left: '50%', transform: 'translate(-50%, 0%)'
  }
  return (


    <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.5)'}}>
      <div style={{ opacity: `${isFadedIn ? "1" : '.5'}`, borderRadius: '3px', transition: '0.15s', backgroundColor: 'lightpink', width: '100%', maxWidth: '375px', position: 'relative' }}>
        {getChildren(handleClosePopup)}
        <div style={{ position: 'absolute', top: '0% ', right: '0%', transform: 'translateY(-100%)', background: 'lightpink', borderRadius: ".1em" }}>
          <Button type="button" name="X" onClick={handleClosePopup} />
        </div>

      </div>
    </div>

  )
}


const Popup = ({ name, getChildren, resetState, position }) => {

  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: "flex-start" }}>

        <Button type="button" onClick={handleToggle} name={name} />
      </div>
      {isOpen &&
        <Content getChildren={getChildren} handleTogglePopup={handleToggle} resetState={resetState} position={position} />
      }
    </>
  )
}

export default Popup
