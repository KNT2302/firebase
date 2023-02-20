import React from 'react'
import { RiShareForwardLine } from "react-icons/ri"
import Button from '../../component/Button'
import Popup from '../../component/Popup'
import UserList from '../../component/UserList'

const friends = [
  {
    userId: '2',
    avatar: "",
    displayName: "Martinez"
  },
  {
    userId: '1',
    avatar: "",
    displayName: "Terami"
  },
]

const Share = () => {

  const getChildren = (handleClosePopup) => {

    return (
      <div style={{ width: '400px', fontSize: '1.5rem' }}>
        <h1>Share</h1>
        <div style={{ fontSize: '1.8rem' }}>
          <Button name="Publish" type="button" onClick={() => { }} />
        </div>

        <span>Or</span>
        <div>
          <h2>Friends</h2>
          <UserList list={friends} isPick />
        </div>
      </div>
    )
  }
  return (
    <>
      <Popup name={<RiShareForwardLine />} getChildren={getChildren} />

    </>
  )
}

export default Share
