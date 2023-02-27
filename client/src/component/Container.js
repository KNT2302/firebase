import React, { useEffect, useRef, useState } from 'react'

const Container = ({children}) => {

  const [isFadeIn, setIsFadeIn] = useState(false)

  const conRef= useRef()

  useEffect(()=>{
    setIsFadeIn(true)
  },[])
  return (
    <div ref={conRef} style={{ opacity:`${isFadeIn?"1":"0.5"}` ,transition:'.15s', width:'100%',minHeight:'100vh', maxWidth:'1536px', margin:'0 auto', paddingBottom:'50vh'}}>{children}</div>
  )
}

export default Container
