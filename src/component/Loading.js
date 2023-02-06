import React, { useEffect, useRef, useState } from 'react'

const Loading = () => {

  const timer = useRef(null)
  const loadRef = useRef(null)
  const [doRotate, setDoRotate] = useState(0)
  useEffect(()=>{
    timer.current = setInterval(()=>{
      setDoRotate((prev)=>prev + 10)
    },50)
    return ()=>{
      clearInterval(timer.current)
    }
  })
  return (
    <div style={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center', trasition:'.3s', backgroundImage: 'linear-gradient(to bottom, white 50%, rgba(225,225,225,0.5))'}}>
      <div style={{padding:'.5em', background:'white', borderRadius:'50%', border:'2px solid', borderColor:'gray', borderLeftColor:'white', transform:`rotate(${doRotate}deg)`, transition:'.05s'}}></div>
    </div>
  )
}

export default Loading
