import React, { useCallback, useEffect, useRef, useState } from 'react'
import Input from '../Input'
import Loading from '../Loading'
import { FiUser } from "react-icons/fi"
import Button from '../Button'
import axiosProvider from '../../ulti/axios'
import { async } from '@firebase/util'
import useGetUserId from '../../ulti/hooks/getUserId'
import Picture from '../Picture'




const User = ({ user, isPick, handlePick }) => {

  const pickFriendRef = useRef(null)
  const [isChoosen, setIsChoosen] = useState(false)

  const getSrc = useCallback(() => {
    return user.photoURL
  }, [user])

  console.log(user)


  useEffect(() => {
    if (isPick) {
      console.log(pickFriendRef)
      pickFriendRef.current.style.opacity = "1"
    }
  }, [])
  return (
    <div style={{ width: '100%' }}>
      {isPick ?
        <div style={{ display: 'flex', fontSize: '1.8rem', paddingBlock: '.5em', alignItems: 'center', gap: '.5em' }}>
          <div style={{ display: 'none' }}>
            <Input ref={pickFriendRef} type='checkbox' name={user.displayName} />
          </div>
          <Button name={
            <>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden' }}>
                <Picture specSrc={[user.photoURL]} />
              </div>

              <span style={{ paddingLeft: '.25em' }}>{user.displayName}</span>
            </>
          } onClick={() => {
            return new Promise((resolve) => {
              setIsChoosen(!isChoosen)
              handlePick(user)
              resolve("done")
            })

          }} />
        </div>
        :
        <div style={{ display: 'flex', gap: '.5em' }}>
          <div style={{ width: '60px', height: '60px' }}>
            <Picture getSrc={() => user.photoURL} />
          </div>
          <div>

            <h3 style={{ fontSize: '2rem' }}>{user.displayName}</h3>
            <MakeFriend currentToken={user.currentToken} />
          </div>
        </div>}
    </div>
  )
}
const UserList = ({ list, isPick }) => {



  return (
    <div style={{ maxWidth: '375px', width: '100%' }}>
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
