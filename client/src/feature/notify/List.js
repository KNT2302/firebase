import React, { useState } from 'react'
import Button from '../../component/Button'
import Message from './Message'

export const List = ({ oldList, newList, setHaveRead, handleClosePopup }) => {
  return (
    <div>

      <NewList data={newList} setHaveRead={setHaveRead} handleClosePopup={handleClosePopup} />

      <OldList data={oldList} />
    </div>
  )
}

const OldList = ({ data }) => {


  const [rankRead, setRankRead] = useState(2)

  const inCreaseRank = () => {
    setRankRead((prev) => prev + 2)
  }
  return (
    <div>
      <h2>Oldly</h2>
      {data.slice(0, rankRead).map((message) => {
        return (
          <Message key={message.id} message={message} isLast={message.id == data.length} type={message.type} />
        )
      })}
      <Button name="Read more" onClick={inCreaseRank} />
    </div>
  )
}

const NewList = ({ data, setHaveRead, handleClosePopup }) => {

  return (
    <div>
      <h2>Recently</h2>
      {data.map((message) => {
        return (
          <Message key={message.id} message={message} isLast={message.id == data.length} isNew handleClick={setHaveRead} handleClosePopup={handleClosePopup} type={message.type} />
        )
      })}

    </div>
  )
}

