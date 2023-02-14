import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const ListLink = ({ name, to }) => {
  const linkRef = useRef(null)

  return (
    <li ref={linkRef} style={{ fontSize: '1.8rem' }}>
      <Link style={{ textDecoration: 'none', color: 'black' }} to={to}>
        {name}
      </Link>
    </li>
  )
}

const BarLink = () => {
  return (
    <ul style={{ listStyle: 'none', display: 'flex', gap: '1em' }}>
      <ListLink name="Home" to='/' />
      <ListLink name="Todo" to='/todo' />
      <ListLink name="Album" to='/album' />
    </ul>
  )
}

export default BarLink
