import React from 'react'
import Message from '../../feature/album/message/Message'

const SecondNav = () => {
  return (
    <div style={{position:'fixed', bottom:'0', left:'0', padding:'1em 20px', width:'100%', fontSize:'1.8rem',background:'linear-gradient(to bottom, rgba(225,225,225,0.5),white 50%)', zIndex:'1'}}>
      <div style={{margin:'0 auto',maxWidth: '1536px'}}>
        <Message  />
      </div>
    </div>
  )
}

export default SecondNav
