import React from 'react'
import { FiUser } from "react-icons/fi"

const Message = ({ message, isLast, isNew, handleClick }) => {
  
  const handleOnClick = isNew? () => {
    handleClick(message)
  }: ()=>{}
  return (
    <div style={{ display: 'flex', gap: '.5em', borderBottom: `${isLast ? 'none' : '1px solid gray'}`, padding: '.5em', background:`${isNew?"lightgreen":"transparent"}`, width:'250px', cursor:"pointer" }} onClick={handleOnClick}>
      <div>
        {<FiUser />}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.25em' }}>
        <h1>{message.title}</h1>
        <p>{message.content}</p>
      </div>
    </div>
  )
}

export default Message
