import React, { useEffect, useRef, useState } from 'react'
import Input from '../../component/Input'
import Loading from '../../component/Loading'
import { FiUser } from "react-icons/fi"
import Button from '../../component/Button'

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

const Friend = ({ friend, isPick }) => {

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
        } onClick={() => { pickFriendRef.current.checked=!pickFriendRef.current.checked}} />

      </div> : <span>{friend.name}</span>}
    </div>
  )
}
const FriendList = ({ isPick }) => {

  const [data, setData] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setData(friends)
    }, 1000)
  }, [])
  return (
    <div>
      {data.length <= 0 ? <div style={{ fontSize: '2rem' }}>
        <Loading />
      </div> : <>
        {data.map(friend => {
          return (
            <Friend key={friend.id} friend={friend} isPick={isPick} />
          )
        })}
      </>}
    </div>
  )
}

export default FriendList
