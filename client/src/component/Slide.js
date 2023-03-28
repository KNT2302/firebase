import React, { useEffect, useRef, useState } from 'react'
import { GrNext } from "react-icons/gr"

const Slide = ({ images, slice }) => {

  const totalTimeTranslateX = useRef((images.length / slice) - 1)

  const timer = useRef()


  const [timeTranslateX, setTimeTranslateX] = useState(0)

  const next = () => {
    if (totalTimeTranslateX.current - timeTranslateX < 1) {
      setTimeTranslateX(totalTimeTranslateX.current)
    } else {
      setTimeTranslateX(prev => prev + 1)
    }
  }

  const back = () => {
    if (totalTimeTranslateX.current === timeTranslateX && Math.floor(totalTimeTranslateX.current) < timeTranslateX) {
      setTimeTranslateX(Math.floor(totalTimeTranslateX.current))
    } else {
      if (timeTranslateX < 1) {
        setTimeTranslateX(0)
      } else {
        setTimeTranslateX(prev => prev - 1)
      }
    }

  }

  useEffect(() => {
    timer.current = setTimeout(() => {
      next()
    }, 3000)
    return () => {
      clearTimeout(timer.current)
    }
  }, [timeTranslateX])

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', overflow: 'hidden', flexWrap: 'wrap' }}>
      <div style={{ width: '100%', display: 'flex', transform: `translateX(-${timeTranslateX * 100}%)`, transition: '.3s' }}>
        {images.map((image, index) => {
          return (
            <img key={index} style={{ width: `${100 / slice}%` }} src={image} alt={image} />
          )
        })}
      </div>
      {timeTranslateX < totalTimeTranslateX.current && <div style={{ position: 'absolute', fontSize: '18px', right: '0' }} onClick={next}>{<GrNext />}</div>}
      {timeTranslateX > 0 && <div style={{ position: 'absolute', fontSize: '18px', left: '0', transform: 'rotate(180deg)' }} onClick={back}>{<GrNext />}</div>}
    </div>
  )
}

export default Slide
