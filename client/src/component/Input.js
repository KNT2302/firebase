import React, { forwardRef, useEffect, useState } from 'react'

const Input = forwardRef((props, ref) => {

  useEffect(()=>{
    ref.current.focus()
  },[])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', width:'100%' }}>
      {props.name && <label style={{ fontSize: '1.6rem', color: "black", opacity: '.5' }}>{props.name[0].toUpperCase() + props.name.slice(1)}:</label>}
      {
        !props.textarea ?
          <input ref={ref} style={{ fontSize: '1em', padding: '.2em', border: 'none', outline: 'none', fontFamily: 'Times New Roman', width:'100%' }} type={props.type} placeholder={props.placeholder} id={props.name} /> :
          <div contentEditable ref={ref} style={{ fontSize: '1em', padding: '.5em', border: 'none', outline: 'none', fontFamily: 'Times New Roman', minHeight:'1em', width:'100%',background:'rgba(225,225,225,1)', transition:'.3s' }} type={props.type} placeholder={props.placeholder} id={props.name}  />
      }
    </div>
  )
})

export default Input
