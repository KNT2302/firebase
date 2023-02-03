import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const ListLink = ({name}) => {
  const linkRef = useRef(null)

  return (
    <li ref={linkRef} style={{ fontSize: '1.8rem' }}>
      <Link style={{ textDecoration: 'none', color: 'black' }} to="/todo">
       {name}
      </Link>
    </li>
  )
}

const BarLink = () => {
  return (
    <ul style={{ listStyle: 'none' }}>
      <ListLink name="Todo"/>
    </ul>
  )
}

export default BarLink
