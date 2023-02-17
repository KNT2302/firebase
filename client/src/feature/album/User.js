import React, { useEffect, useState } from 'react'
import UserList from '../../component/UserList'
import axiosProvider from '../../ulti/axios'

const User = () => {

  const [data, setData] = useState([])
  useEffect(()=>{
    const getUser = async () => {
      const response = await axiosProvider.get("/api/user")
      const {success} = response
      if(success){
        setData(response.data)
      }else{
        setData([])
      }
    }
    getUser()
  },[])
  return (
    <div style={{ fontSize: '1.6rem' }}>
      <h2>User</h2>
      <UserList list={data} />
    </div>

  )
}

export default User
