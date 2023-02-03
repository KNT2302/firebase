import { async } from '@firebase/util'
import React, { useState } from 'react'

const Button = ({ name, onClick, type }) => {
  const [isHover, setIsHover] = useState(false)
  const [isDisabled, setIsDisabled ] =useState(false)
  const handleOnMouseEnter = () => {
    setIsHover(true)
  }

  const handleOnMouseLeave = () => {
    setIsHover(false)
  }

  const handleOnClick = async (e) => {
    setIsDisabled(true)
    await onClick(e)

    setIsDisabled(false)

  }
  return (
    <button disabled={isDisabled} style={{ fontSize: '1em', borderRadius: '3px', border: 'none', background: `transparent`, color: `${isHover? "black":"gray"}`, cursor: "pointer", transition: '.15s' }} type={type} onClick={handleOnClick} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>{name}</button>
  )
}

export default Button
