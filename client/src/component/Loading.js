import React, { useEffect, useRef, useState } from 'react'
import { BiLoaderAlt } from "react-icons/bi"

const Loading = () => {

  const timer = useRef(null)
  const loadRef = useRef(null)
  const [doRotate, setDoRotate] = useState(0)
  useEffect(() => {
    timer.current = setInterval(() => {
      setDoRotate((prev) => prev + 10)
    }, 50)
    return () => {
      clearInterval(timer.current)
    }
  })
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', trasition: '.3s', backgroundImage: 'linear-gradient(to bottom, white 50%, rgba(225,225,225,0.5))' }}>
      <BiLoaderAlt style={{ fontSize:'1em', transform: `rotate(${doRotate}deg)`, transition: '.05s' }} />
    </div>
  )
}

export default Loading
