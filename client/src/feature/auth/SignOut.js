import React from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../../firebaseConfig'
import Button from '../../component/Button'

const SignOut = ({handleSignOut}) => {

  const doSignOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("isLogined")
      // Sign-out successful.
      handleSignOut()
    }).catch((error) => {
      // An error happened.
      console.log(error)
    })
  }
  return (
    <>
      <Button type="button" name="Sign out" onClick={doSignOut} />
    </>
  )
}

export default SignOut
