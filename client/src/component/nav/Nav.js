import React, { useEffect, useState } from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../../firebaseConfig'
import Button from '../Button'
import { Link } from 'react-router-dom'
import BarLink from './BarLink'
import SignOut from '../../feature/auth/SignOut'
import Notify from '../../feature/notify/Notify'
import Profile from '../../feature/profile/Profile'


const Nav = ({ handleSignOut, isLogined, promiseGetToken }) => {

  return (
    <nav style={{ padding: '1rem 20px', position: 'fixed', width: '100%', top: '0', left: "0", background: 'linear-gradient(to bottom,white 50% , rgba(225,225,225,0.5))', zIndex:'1' }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: '1536px', margin: '0 auto', justifyContent: 'space-between', alignItems: 'center', }}>
        {isLogined &&

          <BarLink />

        }

        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>Tot</div>

        <div style={{ fontSize: '1.8rem', display: 'flex', gap: '1em', alignItems: 'center' }}>
          {isLogined &&
            <>
              <div style={{ zIndex: '1' }}>

                <SignOut handleSignOut={handleSignOut} />
              </div>


              <div style={{ width: "2em" }}>
                <Notify promiseGetToken={promiseGetToken} />
              </div>
            </>
          }
        </div>
      </div>
    </nav>
  )
}

export default Nav


