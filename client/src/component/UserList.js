import React, { useEffect, useRef, useState } from 'react'
import Input from './Input'
import Loading from './Loading'
import { FiUser } from "react-icons/fi"
import Button from './Button'
import axiosProvider from '../ulti/axios'
import { async } from '@firebase/util'
import useGetUserId from '../ulti/hooks/getUserId'



const User = ({ user, isPick }) => {

  const pickFriendRef = useRef(null)


  useEffect(() => {
    if (isPick) {
      console.log(pickFriendRef)
      pickFriendRef.current.style.opacity = "1"
    }
  }, [])
  return (
    <div>

      {isPick ? <div style={{ display: 'flex', fontSize: '1.8rem' }}>
        <Input ref={pickFriendRef} type='checkbox' name={user.displayName} />
        <Button name={
          <>
            <FiUser />
            <span style={{ paddingLeft: '.25em' }}>{user.displayName}</span>
          </>
        } onClick={() => { pickFriendRef.current.checked = !pickFriendRef.current.checked }} />

      </div> :
        <div style={{ display: 'flex', gap: '.5em' }}>
          <div>
            <FiUser />
          </div>
          <div>

            <h3>{user.displayName}</h3>
            <MakeFriend currentToken={user.currentToken} />
          </div>
        </div>}
    </div>
  )
}
const UserList = ({ list, isPick }) => {



  return (
    <div style={{ width: '375px' }}>
      {list.length <= 0 ? <div style={{ fontSize: '2rem' }}>
        <Loading />
      </div> : <>
        {list.map(user => {
          return (
            <User key={user.userId} user={user} isPick={isPick} />
          )
        })}
      </>}
    </div>
  )
}

const MakeFriend = ({ currentToken }) => {

  const isUser = true
  const user = useGetUserId(isUser)

  const makeFriend = () => {
    return new Promise(async (resolve) => {
      const notificationContent = {
        title: "Friend",
        body: {
          friendId: user.userId,
          content: "has given making friend",
          currentToken: user.currentToken
        }
      }
      const response = await axiosProvider.post("api/pushNotification", {}, {
        ...notificationContent,
        currentToken
      })
      resolve("done")
    })

  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '.5em' }}>

      <Button name="friend" onClick={makeFriend} />
    </div>
  )
}

export default UserList
