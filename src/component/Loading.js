import React, { useEffect, useRef, useState } from 'react'

const Loading = () => {

  const timer = useRef(null)
  const loadRef = useRef(null)
  const [doAnimate, setDoAnimate] = useState(true)
  useEffect(()=>{
    timer.current = setInterval(()=>{
      setDoAnimate(!doAnimate)
    },300)
    return ()=>{
      clearInterval(timer.current)
    }
  })
  return (
    <div style={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center', trasition:'.3s', backgroundImage: 'linear-gradient(to bottom, white 50%, rgba(225,225,225,0.5))'}}>
      <p style={{opacity:`${doAnimate?"0.5":'1'}`}}>Loading...</p>
    </div>
  )
}

export default Loading
