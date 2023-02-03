import React, { useEffect, useState } from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../../firebaseConfig'
import Button from '../Button'
import { Link } from 'react-router-dom'
import BarLink from './BarLink'

const Nav = () => {


  const handleSignOut = (e) => {
    e.preventDefault()
    signOut(auth).then(() => {
      localStorage.removeItem("isLogined")
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    })
  }

  return (
    <nav style={{ padding: '1rem 0' }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: '1536px', margin: '0 auto', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
         <BarLink />
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>Tot</div>
        <div style={{fontSize:'1.8rem'}}>
          <Button type="button" name="Sign out" onClick={handleSignOut} />
        </div>
      </div>
    </nav>
  )
}

export default Nav
