import React, { useRef } from 'react'
import { GoogleAuthProvider, sendSignInLinkToEmail, signInWithPopup } from "firebase/auth"
import Button from '../../component/Button'
import Input from '../../component/Input'
import Popup from '../../component/Popup'
import actionCodeSettings from './setting'
import { auth } from '../../firebaseConfig'
import Container from '../../component/Container'
import { async } from '@firebase/util'

const SignIn = ({setSignined,setUser}) => {



  const getForm = (handleClosePopup) => {



    return (
      <div style={{ padding: '.5em' }}>
        <SignByEmail handleClosePopup={handleClosePopup} />
        <div style={{ textAlign: 'center', fontSize: '1.6rem', marginTop: '10px' }}>Or</div>
        <SignByGoogle setSignined={setSignined} setUser={setUser} />
      </div>
    )
  }
  return (
    <Container>
      <div style={{ fontSize: '1.8rem' }}>
        <Popup name="Sign In" getChildren={getForm}>

        </Popup>

      </div>

    </Container>
  )
}

export default SignIn

const SignByEmail = ({ handleClosePopup }) => {

  const email = useRef(null)

  const handleSubmit = () => {
    return new Promise((resolve) => {
      sendSignInLinkToEmail(auth, email.current.value, actionCodeSettings)
        .then(() => {
          // The link was successfully sent. Inform the user.
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          window.localStorage.setItem('emailForSignIn', email.current.value)
          window.localStorage.setItem('isForSignIn', true)
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
    <form style={{ width: '375px' }}>
      <legend style={{ fontSize: '1.8rem' }}>Sign in</legend>
      <Input type="text" ref={email} name="email" />
      <div style={{ marginTop: '10px', fontSize: '1em' }}>
        <Button type="submit" name="Sign In" onClick={handleSubmit} />
      </div>
    </form>
  )
}

const SignByGoogle = ({setSignined, setUser}) => {

  const onClick = async () => {
    return new Promise((resolve)=>{

      const provider = new GoogleAuthProvider()

      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential.accessToken
          // The signed-in user info.
          const user = result.user
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          window.localStorage.setItem("isLogined", true)
          setSignined()
          setUser(result.user)
          console.log(result)
          resolve("authed")
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code
          const errorMessage = error.message
          // The email of the user's account used.
          const email = error.customData.email
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error)
          // ...
        })
  

    })
   
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button name="Sign in by google" onClick={onClick} />
    </div>
  )
}
