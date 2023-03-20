import React, { useEffect, useState } from 'react'
import { RiShareForwardLine } from "react-icons/ri"
import Button from '../../component/Button'
import ListPick from '../../component/ListPick'
import Picture from '../../component/Picture'
import Popup from '../../component/Popup'
import useGetUserId from '../../ulti/hooks/getUserId'

const FriendList = ({ handleClosePopup }) => {



  const userId = useGetUserId()

  const handleList = (pickedList) => {
    console.log(pickedList)
  }


  const itemHandle = (user, index, picked, onClick) => {
    return (
      <div style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center' }} key={index} onClick={() => { onClick(user) }} >
        <div style={{ width: '50px', height: '50px' }}>

          <Picture specSrc={[user.photoURL]} />
        </div>
        <p style={{ fontSize: '1em' }}>
          {user.displayName}
        </p>
        {picked && "Picked"}
      </div>
    )
  }

  return (
    <div style={{ width: '100%', fontSize: '1.5rem' }}>
      <h1>Share</h1>
      <div style={{ fontSize: '1.8rem' }}>
        <Button name="Publish" type="button" onClick={() => { }} />
      </div>

      <span>Or</span>
      <div>
        <h2>Friends</h2>
        <ListPick urlData={`/api/user/friend?userId=${userId}`} itemHandle={itemHandle} handleList={handleList} />
      </div>
    </div>

  )
}

const Share = () => {

  const getChildren = (handleClosePopup) => {
    return (
      <FriendList handleClosePopup={handleClosePopup} />
    )
  }
  return (
    <>
      <Popup name={<RiShareForwardLine />} getChildren={getChildren} />
    </>
  )
}

export default Share
