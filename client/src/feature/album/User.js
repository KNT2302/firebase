import React, { forwardRef, useEffect, useRef, useState } from 'react'
import Popup from '../../component/Popup'
import UserList from '../../component/UserList'
import axiosProvider from '../../ulti/axios'
import useResponsive from '../../ulti/hooks/reponsive'

const User = () => {


  const BigSize = {
    BIG: 'big',
    FROM: 1200
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

  const screenSize = useResponsive(getSizeScreen)

  useEffect(() => {
    const getUser = async () => {
      const response = await axiosProvider.get("/api/user")
      const { success } = response
      if (success) {
        setData(response.data)
      } else {
        setData([])
      }
    }
    getUser()
  }, [])


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
  return (

    <Popup name={<div style={{}}>User</div>} getChildren={getChildren} position={{ top: '1em' }} />

  )
}
