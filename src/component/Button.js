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

  const handleOnClick = async () => {
    setIsDisabled(true)
    await onClick()

    setIsDisabled(false)

  }
  return (
    <button disabled={isDisabled} style={{ fontSize: '1.6rem', padding: '.5em 1em', borderRadius: '3px', border: '1px solid black', background: `${isHover? "white":"black"}`, color: `${isHover? "black":"white"}`, cursor: "pointer" }} type={type} onClick={handleOnClick} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>{name}</button>
  )
}

export default Button
