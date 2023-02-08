import React, { useRef } from 'react'
import { sendSignInLinkToEmail } from "firebase/auth"
import Button from '../../component/Button'
import Input from '../../component/Input'
import Popup from '../../component/Popup'
import actionCodeSettings from './setting'
import { auth } from '../../firebaseConfig'

const SignIn = () => {

  const email = useRef(null)

 

  const getForm = (handleClosePopup) => {

    const handleSubmit = () => {
      return new Promise((resolve) => {
        sendSignInLinkToEmail(auth, email.current.value, actionCodeSettings)
          .then(() => {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            window.localStorage.setItem('emailForSignIn', email.current.value)
            handleClosePopup()
            resolve("sent")
            // ...
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            resolve("notSent")
            // ...
          })
      })
    }
    return (
      <>
        <form>
          <legend style={{ fontSize: '1.8rem' }}>Register</legend>
          <Input ref={email} name="email" />
          <div style={{ marginTop: '10px' }}>
            <Button type="submit" name="Sign In" onClick={handleSubmit} />
          </div>
        </form>
        <div style={{ textAlign: 'center', fontSize: '1.2rem', marginTop: '10px' }}>Or</div>
      </>
    )
  }
  return (
    <Popup name="Sign In" getChildren={getForm}>

    </Popup>
  )
}

export default SignIn
