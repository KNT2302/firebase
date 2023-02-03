import React, { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import SignIn from '../feature/auth/SignIn'
import Nav from './nav/Nav'

const Layout = ({ children }) => {
  const isLogined = localStorage.getItem("isLogined")


  return (
    <div style={{ width: '100%', padding: '0 20px' }}>
      <Nav />
      {isLogined ?
        <div style={{ maxWidth: '1563px', margin: '0 auto' }}>
          {children}
        </div>
        : <SignIn />}<Outlet /></div>
  )
}

export default Layout
