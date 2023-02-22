import React from 'react'
import Message from '../../feature/album/Message'

const SecondNav = () => {
  return (
    <div style={{position:'fixed', bottom:'0', left:'0', padding:'1em 20px', width:'100%', fontSize:'1.8rem'}}>
      <div style={{}}>
        <Message  />
      </div>
    </div>
  )
}

export default SecondNav
