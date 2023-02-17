import React, { useEffect, useState } from 'react'
import UserList from '../../component/UserList'

const User = () => {

  const [data, setData] = useState([])
  useEffect(()=>{
    
  },[])
  return (
    <div style={{ fontSize: '1.6rem' }}>
      <h2>User</h2>
      <UserList />
    </div>

  )
}

export default User
