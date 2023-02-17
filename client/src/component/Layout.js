import React, { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import SignIn from '../feature/auth/SignIn'
import Nav from './nav/Nav'
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, } from "firebase/auth"
import axiosProvider from '../ulti/axios'

const Layout = ({ children }) => {
  const [isLogined, setIsLogined] = useState(() => localStorage.getItem("isLogined"))
  const [isForSign, setIsForSign] = useState(() => localStorage.getItem("isForSignIn"))

  const setUser = (user) => {
    const { accessToken, displayName, photoURL } = user

    console.log(accessToken, displayName, photoURL)
    localStorage.setItem('user', JSON.stringify({
      accessToken,
      displayName,
      photoURL
    }))
  }
  const handleSignIned = () => {
    setIsLogined(true)
  }
  

  useEffect(() => {

    const postDevice = async () => {
      const data = {
        userToken: 'svsd',
        currentToken: 'dfv',
        urlPhoto: 'vdev',
        displayName: 'svsdv',
        lastSignIn: new Date()
      }
      const res = await axiosProvider.post("/api/user", {}, data)
    }

    if (isLogined) {
      postDevice()
    }

  }, [isLogined])

  return (
    <div style={{ width: '100%', padding: '0 20px' }}>
      <Nav handleSignOut={() => { setIsLogined(false) }} isLogined={isLogined} />
      {isLogined ?
        <div style={{ maxWidth: '1563px', margin: '0 auto' }}>
          {children}
        </div>
        : <SignIn setSignined={handleSignIned} setUser={setUser} />}<Outlet /></div>
  )
}

export default Layout
