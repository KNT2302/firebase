import React, { useEffect, useRef, useState } from 'react'
import { useFetcher } from 'react-router-dom'
import useResponsive from '../ulti/hooks/reponsive'
import scroll from '../ulti/scroll'
import Button from './Button'




const ItemTab = ({ name, setTab, query, isSelect }) => {

  return (
    <div style={{ padding: ".5em", color: 'gray', cursor: 'pointer', background: `${isSelect ? 'lightpink' : 'transparent'}`, borderRadius: '1em', transform: 'translateX(-.5em)' }}>
      <Button name={name} type="button" onClick={() => setTab(query)} />
    </div>
  )
}


const Tab = ({ listTab, setTab, row, itemTab, getChildrens, children, canScroll }) => {
  const sizeObj = {
    BIG: 'big',
    SMALL: 'small'
  }

  const getSizeScreen = (size) => {
    if (size >= 800) {
      return sizeObj.BIG
    }
    return sizeObj.SMALL
  }

  const barTabRef = useRef(null)

  const [tabValue, setTabValue] = useState(() => listTab ? (listTab.length ? listTab[0].query : 0) : 0)
  const {screenSize, screenChange} = useResponsive(getSizeScreen)

  const handleSetTab = (tabName) => {
    setTab(tabName)
    setTabValue(tabName)
  }

  const next = () => {
    barTabRef.current.style.transform = 'translateX(-100%)'
    console.log(barTabRef)
  }

  const back = () => {
    barTabRef.current.style.transform = 'translateX(0)'
    console.log(barTabRef)
  }

  const scrollNext = useRef()
  useEffect(() => {
    if (barTabRef.current) {
      console.log(barTabRef)
      let tabBarWidth = barTabRef.current.clientWidth
      let tabWidth = barTabRef.current.firstElementChild ? barTabRef.current.firstElementChild.clientWidth : 0
      let tabMount = barTabRef.current.childElementCount
      scrollNext.current = scroll(tabBarWidth, tabMount, tabWidth)
    }
  }, [barTabRef.current,screenChange])

  return (
    <div style={{ display: 'flex', fontSize: '1.8rem', flexDirection: `${row ? "row" : 'column'}`, width: `${screenSize === sizeObj.BIG ? 'auto' : '100%'}`, height: '100%' }}>



      <div style={{ overflowX: `${canScroll ? 'hidden' : 'visible'}`, position: 'relative' }}>
        {
          canScroll && screenSize === sizeObj.SMALL &&
          <>
            <div style={{ position: 'absolute', right: '0', zIndex: '1', top: '50%', transform: 'translateY(-50%)' }}>
              <Button type='button' name="next" onClick={() => {
                console.log('run')
                const next = (scrollNext.current)
                barTabRef.current.style.transform = `translateX(-${next() * 100}%)`
              }} />
            </div>
          </>
        }
        <div ref={barTabRef} style={{ display: 'flex', fontSize: '1.8rem', flexDirection: `${row ? "column" : 'row'}`, transition: '.3s' }}>

          {listTab ? (listTab.map((tab, index) => {
            return (
              itemTab ? itemTab(tab, setTab, index) :
                <ItemTab key={index} name={tab.name} setTab={handleSetTab} query={tab.query} isSelect={tabValue === tab.query} />
            )
          })) :
            <>
              {
                screenSize === sizeObj.BIG && <div style={{ padding: ".5em", cursor: 'pointer', borderRadius: '1em', transform: 'translateX(-.5em)', color: 'transparent' }}>
                  NaN
                </div>
              }
            </>
          }
        </div>

      </div>

      <div style={{ flex: '1' }}>
        {getChildrens ? getChildrens() : children}
      </div>
    </div>
  )
}

export default Tab

