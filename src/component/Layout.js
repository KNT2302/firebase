import React, { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import SignIn from '../feature/auth/SignIn'
import Nav from './nav/Nav'
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth"
import { message } from '../firebaseConfig'
import { getToken, onMessage } from 'firebase/messaging'
import { onBackgroundMessage } from 'firebase/messaging/sw'

const Layout = ({ children }) => {
  const [isLogined, setIsLogined] = useState(() => localStorage.getItem("isLogined"))
  const [isForSign, setIsForSign] = useState(() => localStorage.getItem("isForSignIn"))

  useEffect(() => {
    if (isForSign) {
      const auth = getAuth()
      if (isSignInWithEmailLink(auth, window.location.href)) {
        // Additional state parameters can also be passed via URL.
        // This can be used to continue the user's intended action before triggering
        // the sign-in operation.
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        let email = window.localStorage.getItem('emailForSignIn')
        if (!email) {
          // User opened the link on a different device. To prevent session fixation
          // attacks, ask the user to provide the associated email again. For example:
          email = window.prompt('Please provide your email for confirmation')
        }
        // The client SDK will parse the code from the link for you.
        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            // Clear email from storage.
            window.localStorage.removeItem('emailForSignIn')
            window.localStorage.removeItem('isForSignIn')
            console.log(result)
            window.localStorage.setItem("isLogined", true)
            setIsLogined(true)
            // You can access the new user via result.user
            // Additional user info profile not available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
          })
          .catch((error) => {
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
          })
      }

    }
    // Confirm the link is a sign-in with email link.

  }, [])

  return (
    <div style={{ width: '100%', padding: '0 20px' }}>
      <Nav handleSignOut={() => { setIsLogined(false) }} isLogined={isLogined} />
      {isLogined ?
        <div style={{ maxWidth: '1563px', margin: '0 auto' }}>
          {children}
        </div>
        : <SignIn />}<Outlet /></div>
  )
}

export default Layout
