import React, { useEffect, useState } from 'react'
import Button from './Button'

const Content = ({ children, handleTogglePopup }) => {
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

    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '100%', maxWidth: '400px', opacity: `${isFadedIn ? "1" : '.5'}`, background: 'white', padding: '20px', borderRadius: '3px', transition: '0.15s', border: '1px solid gray'}}>
      {children}
      <div style={{ position: 'absolute', top: '0% ', right: '0%', transform: "translateY(calc(-100% - 10px))" }}>
        <Button type="button" name="X" onClick={handleClosePopup} />

      </div>
    </div>
  )
}


const Popup = ({ children, name }) => {

  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <Button type="button" onClick={handleToggle} name={name} />
      {isOpen && <Content children={children} handleTogglePopup={handleToggle} />}
    </div>
  )
}

export default Popup
