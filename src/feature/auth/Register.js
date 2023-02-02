import React from 'react'
import Button from '../../component/Button'
import Input from '../../component/Input'
import Popup from '../../component/Popup'

const Register = () => {

  const handleOnClick = (e) => {
    e.preventDefault()
  }
  return (
    <Popup name="Register">
      <form>
      <legend style={{fontSize: '1.8rem'}}>Register</legend>
      <Input name="email" />
      <Input name="Password" />
      <Button name="Register" onClick={handleOnClick} />
      </form>
    </Popup>
  )
}

export default Register
