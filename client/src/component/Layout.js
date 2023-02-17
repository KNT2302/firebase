import React, { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import SignIn from '../feature/auth/SignIn'
import Nav from './nav/Nav'
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, } from "firebase/auth"
import axiosProvider from '../ulti/axios'

const Layout = ({ children }) => {
  const [isLogined, setIsLogined] = useState(() => localStorage.getItem("isLogined"))

  const user = localStorage.getItem("user")

  const promiseGetToken = useRef(null)

  const getUserInfo = useRef(null)

  const setUser = (user) => {
    const { displayName, photoURL, userId, currentToken, lastSignIn } = user
    localStorage.setItem('user', JSON.stringify({
      displayName,
      photoURL,
      userId,
      currentToken,
      lastSignIn
    }))
  }
  const handleSignIned = () => {
    setIsLogined(true)
  }



  useEffect(() => {


    const postDevice = async () => {

      const tokenNofity = promiseGetToken.current
      const currentToken = await tokenNofity()
      console.log(currentToken)
      const { photoURL, displayName, uid } = getUserInfo.current
      const user = {
        userId: uid,
        currentToken: currentToken,
        photoURL: photoURL,
        displayName: displayName,
        lastSignIn: new Date(),
      }
      const res = await axiosProvider.post("/api/user", {}, user)
      setUser(user)

      console.log(res)
    }

    if (isLogined) {
      if (!user) {

        postDevice()
      }
    }

  }, [isLogined])

  return (
    <div style={{ width: '100%', padding: '0 20px' }}>
      <Nav handleSignOut={() => { setIsLogined(false) }} isLogined={isLogined} promiseGetToken={promiseGetToken} />
      {isLogined ?
        <div style={{ maxWidth: '1563px', margin: '0 auto' }}>
          {children}
        </div>
        : <SignIn setSignined={handleSignIned} getUserInfo={getUserInfo} />}
      <Outlet />
    </div>
  )
}

export default Layout
