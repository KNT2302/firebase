import React, { useState } from 'react'
import Loading from './Loading'

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
    e.preventDefault()
    setIsDisabled(true)
    await onClick()

    setIsDisabled(false)

  }
  return (
    <button disabled={isDisabled} style={{ fontSize: '1em', borderRadius: '3px', border: 'none', background: `transparent`, color: `${isHover? "black":"gray"}`, cursor: "pointer", transition: '.15s', display:'flex', justifyContent:'center', alignItems:'center' }} type={type} onClick={(e)=>handleOnClick(e)} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
      {!isDisabled? name:  <Loading />}
      </button>
  )
}

export default Button
