import { useEffect, useState } from "react"

function useResponsive(getSizeScreen) {
  
  const [screenSize, setScreenSize] = useState(getSizeScreen(window.innerWidth))

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenSize(getSizeScreen(window.innerWidth))
    })
  }, [])

  return screenSize
}

export default useResponsive
