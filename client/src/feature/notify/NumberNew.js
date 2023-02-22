import React, { useEffect, useRef, useState } from 'react'

const NumberNew = ({ numberNew }) => {

  const [doAnimate, setDoAnimate] = useState(false)
  const [turn ,setTurn] = useState(1)

  const timer = useRef()

  useEffect(()=>{
    setTurn(1)
    setDoAnimate(false)
  },[numberNew])

  useEffect(()=>{
    timer.current = setTimeout(()=>{
      if(turn % 4 !== 0 ){
        setDoAnimate(!doAnimate)
        setTurn((prev)=>prev + 1)
      }
    },300)
    return () => {
      clearTimeout(timer.current)
    }
  })

  return (
    <div style={{
      background: 'red',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      borderRadius: '50%',
      fontWeight: '700',
      fontSize:'1em',
      position: 'absolute',
      top: '0%',
      right: '0%',
      width:'100%',
      height:'100%',
      zIndex:"-1",
      opacity:`${doAnimate? "1":'0.5'}`,
      transition:'.3s',
    }}><span>{numberNew}</span></div>
  )
}

export default NumberNew
