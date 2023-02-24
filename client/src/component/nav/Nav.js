import React from 'react'
import BarLink from './BarLink'
import SignOut from '../../feature/auth/SignOut'
import Notify from '../../feature/notify/Notify'


const Nav = ({ handleSignOut, isLogined, promiseGetToken }) => {

  return (
    <nav style={{ padding: '1rem 20px', width: '100%'}}>
      <div style={{ display: 'flex', width: '100%', maxWidth: '1536px', margin: '0 auto', justifyContent: 'space-between', alignItems: 'center', }}>
        {isLogined &&

          <BarLink />

        }

        <div style={{ fontSize: '2rem', fontWeight: 'bold', flex:'1', textAlign:'center' }}>Tot</div>

        <div style={{ fontSize: '1.8rem', display: 'flex', gap: '1em', alignItems: 'center' }}>
          {isLogined &&
            <>
              <div style={{ }}>

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


