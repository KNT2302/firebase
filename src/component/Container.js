import React, { useEffect, useRef, useState } from 'react'

const Container = ({children}) => {

  const [isFadeIn, setIsFadeIn] = useState(false)

  const conRef= useRef()

  useEffect(()=>{
    setIsFadeIn(true)
  },[])
  return (
    <div ref={conRef} style={{ opacity:`${isFadeIn?"1":"0.5"}` ,transition:'.15s', width:'100%', height:'100%',transform:`${isFadeIn?"translateY(0px)":"translateY(10px)"}`}}>{children}</div>
  )
}

export default Container
