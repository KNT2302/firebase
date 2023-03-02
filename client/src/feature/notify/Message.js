import React from 'react'
import { FiUser } from "react-icons/fi"

const Message = ({ message, isLast, isNew, handleClick, handleClosePopup, type, getChildren, data }) => {

  const handleOnClick = isNew ? () => {


    handleClick(message, type)
    if (handleClosePopup) {
      handleClosePopup()
    }
  } : () => { }
  return (
    <div style={{ display: 'flex', gap: '.5em', borderBottom: `${isLast ? 'none' : '1px solid gray'}`, padding: '.5em', background: `${isNew ? "lightgreen" : "transparent"}`, width: '100%', cursor: `${!getChildren ? 'pointer' : 'default'}`, position: 'relative' }} onClick={() => { if (!getChildren) handleOnClick() }}>
      <div>
        {<FiUser />}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.25em' }}>
        <h1>{message.title}</h1>
        <p>{message.content}</p>
      </div>
      <div style={{ position: 'absolute', bottom: '.5em', right: '.5em' }}>
        {getChildren ? getChildren(handleOnClick) : <div></div>}
      </div>
    </div>
  )
}

export default Message
