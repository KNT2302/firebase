import { useEffect, useRef, useState } from "react"

const Page = ({ children }) => {

  const [fadeIn, setFadein] = useState(false)
  const todoPage = useRef(null)


  useEffect(() => {
    setFadein(true)
  }, [])

  return (
    <div ref={todoPage} style={{ opacity: `${fadeIn ? "1" : '0'}`, transition: '0.15s' }}>{children}</div>
  )
}

export default Page
