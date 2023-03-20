import React, { forwardRef, useEffect, useRef, useState } from 'react'
import Popup from '../../component/Popup'
import UserList from '../../component/user/UserList'
import axiosProvider from '../../ulti/axios'
import useResponsive from '../../ulti/hooks/reponsive'
import notifyStore from "../../store/notify"
import useGetUserId from '../../ulti/hooks/getUserId'

const User = () => {

  const BigSize = {
    BIG: 'big',
    FROM: 800
  }

  const userPanRef = useRef(null)
  const [data, setData] = useState([])

  const getSizeScreen = (size) => {
    if (size > BigSize.FROM) {
      return BigSize.BIG
    }
    else {
      return ""
    }
  }

  const userIdClient = useGetUserId()

  const {screenSize} = useResponsive(getSizeScreen)

  useEffect(() => {
    const getUser = async () => {
      const response = await axiosProvider.get("/api/user")
      const { success } = response
      if (success) {
        const users = response.data.filter(user => user.userId !== userIdClient)
        setData(users)
      } else {
        setData([])
      }
    }
    getUser()
  }, [userIdClient])


  return (
    <div>
      {screenSize ? <UserPan ref={userPanRef}
        data={data} /> : <UserPopup getChildren={() => {
          return (
            <UserPan ref={userPanRef}
              data={data} />
          )
        }} />}

    </div>
  )
}

const UserPan = forwardRef((props, ref) => {
  return (
    <div ref={ref} style={{ width: '100%' }}>
      <h2>User</h2>
      <UserList list={props.data} />
    </div>
  )
})


export default User


const UserPopup = ({ getChildren }) => {

  const { isFriendNotify, closePopup } = notifyStore(state => state)

  console.log(isFriendNotify)
  return (

    <Popup openPopupByClick isLinkNotify={isFriendNotify} name={<div style={{}}>User</div>} getChildren={getChildren} position={{ top: '1em' }} whenClose={() => {
      console.log("run")
      closePopup()
    }} />

  )
}
