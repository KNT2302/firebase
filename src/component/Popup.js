import React, { useEffect, useState } from 'react'
import Button from './Button'

const Content = ({ handleTogglePopup, getChildren }) => {
  const [isFadedIn, setIsFadedIn] = useState(false)

  let timer = null

  const handleToggleFadedIn = () => { setIsFadedIn(!isFadedIn) }

  const handleClosePopup = () => {
    handleToggleFadedIn()
    timer = setTimeout(() => { handleTogglePopup() }, 150)
  }
  useEffect(() => {
    setIsFadedIn(!isFadedIn)
    return () => {
      clearTimeout(timer)
    }
  }, [])
  return (

    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '100%', maxWidth: '400px', opacity: `${isFadedIn ? "1" : '.5'}`, background: 'white', borderRadius: '3px', transition: '0.15s', backgroundColor:'lightpink', paddingBlock:'.5em' }}>
      {getChildren(handleClosePopup)}
      <div style={{ position: 'absolute', top: '0% ', right: '0%', padding: '.5em' }}>
        <Button type="button" name="X" onClick={handleClosePopup} />
      </div>
    </div>
  )
}


const Popup = ({ name, getChildren }) => {

  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <Button type="button" onClick={handleToggle} name={name} />
      {isOpen &&

        <Content getChildren={getChildren} handleTogglePopup={handleToggle} />

      }
    </div>
  )
}

export default Popup
