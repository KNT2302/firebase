import { arrayRemove } from 'firebase/firestore'
import React from 'react'
import Button from '../../component/Button'
import axiosProvider from '../../ulti/axios'
import useGetUserId from '../../ulti/hooks/getUserId'

const AgreeButton = ({handleOnClick, data}) => {

  const userId = useGetUserId()

  const agreeFriend = async () => {
    const response = await axiosProvider.post("/api/user/makefriend",{},{
      userId,
      friendId: data.friendId
    })
    if(response)
    console.log(data)
  }
  return (
    <Button 
    onClick={() => {
      handleOnClick()
      agreeFriend()
    }} 
    name="Agree" type="button" />
  )
}

export default AgreeButton
