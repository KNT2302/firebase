import React, { useState } from 'react'
import Loading from './Loading'

const Button = ({ name, onClick, type, icon, style = {} }) => {
  const [isHover, setIsHover] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

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
    <div style={{ margin: '-.25em -.5em', height:'100%' }}>

      <button disabled={isDisabled} style={{
        ...style,
        fontSize: '1em', borderRadius: '3px', border: 'none', background: `${isHover ? 'rgba(225,225,225,.8' : 'transparent'}`,  cursor: "pointer", transition: '.15s', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '.25em .5em', gap: `${icon ? '.5em' : '0'}`, height:'100%'
      }} type={type} onClick={(e) => handleOnClick(e)} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
        <div>{icon && icon}</div>
        {!isDisabled ? name : <Loading />}
      </button >
    </div >
  )
}

export default Button
