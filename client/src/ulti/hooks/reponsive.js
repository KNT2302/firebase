import { useEffect, useState } from "react"

function useResponsive(getSizeScreen) {

  const [screenSize, setScreenSize] = useState(getSizeScreen(window.innerWidth))
  const [screenChange, setScreenChange] = useState(0)

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenSize(getSizeScreen(window.innerWidth))
      setScreenChange(window.innerWidth)
    })
  }, [])
  return {screenSize,screenChange}
}

export default useResponsive
