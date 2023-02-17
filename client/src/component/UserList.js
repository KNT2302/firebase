import React, { useEffect, useRef, useState } from 'react'
import Input from './Input'
import Loading from './Loading'
import { FiUser } from "react-icons/fi"
import Button from './Button'

const friends = [
  {
    id: '2',
    avatar: "",
    name: "Martinez"
  },
  {
    id: '1',
    avatar: "",
    name: "Terami"
  },
]

const User = ({ friend, isPick }) => {

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
        <Input ref={pickFriendRef} type='checkbox' name={friend.name} />
        <Button name={
          <>
            <FiUser />
            <span style={{ paddingLeft: '.25em' }}>{friend.name}</span>
          </>
        } onClick={() => { pickFriendRef.current.checked = !pickFriendRef.current.checked }} />

      </div> :
        <div>

          <FiUser />
          <h3>{friend.name}</h3>
          <MakeFriend name={friend.name} />
        </div>}
    </div>
  )
}
const UserList = ({ list, isPick }) => {

  const [data, setData] = useState([])

  useEffect(() => {

    setTimeout(() => {
      if (list) {
        setData(list)
      } else {
        setData(friends)

      }
    }, 1000)
  }, [])
  return (
    <div>
      {data.length <= 0 ? <div style={{ fontSize: '2rem' }}>
        <Loading />
      </div> : <>
        {data.map(friend => {
          return (
            <User key={friend.id} friend={friend} isPick={isPick} />
          )
        })}
      </>}
    </div>
  )
}

const MakeFriend = ({ currentToken }) => {
  const makeFriend = () => {
    console.log("made")
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '.5em' }}>

      <Button name="friend" onClick={makeFriend} />
    </div>
  )
}

export default UserList
