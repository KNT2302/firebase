import React, { forwardRef } from 'react'

const Input = forwardRef((props, ref) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', marginTop: '1rem' }}>
      {props.name && <label style={{ fontSize: '1.6rem', color: "black", opacity: '.5' }}>{props.name[0].toUpperCase() + props.name.slice(1)}:</label>}

      <input ref={ref} style={{ fontSize: '1.8rem', padding: '.2em', border:'none', outline:'none' }} type={props.type} placeholder={props.placeholder} id={props.name}/>
    </div>
  )
})

export default Input
