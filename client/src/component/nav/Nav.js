import React from 'react'
import BarLink from './BarLink'
import SignOut from '../../feature/auth/SignOut'
import Notify from '../../feature/notify/Notify'


const Nav = ({ handleSignOut, isLogined, promiseGetToken }) => {

  return (
    <nav style={{ width: '100%'}}>
      <div style={{ display: 'flex', width: '100%', margin: '0 auto', justifyContent: 'space-between', alignItems: 'center', paddingBlock:'.5em', paddingBottom:'1em'}}>
        {!isLogined &&

          <BarLink />

        }

        <div style={{ fontSize: '2rem', fontWeight: 'bold', textAlign:'center'}}>Tot</div>

        <div style={{ fontSize: '1.8rem', display: 'flex', gap: '1em', alignItems: 'center', flex:'1', justifyContent:'flex-end' }}>
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


