import React, { useEffect, useRef, useState } from 'react'
import useResponsive from '../ulti/hooks/reponsive'
import scroll from '../ulti/scroll'
import Button from './Button'
import { MdNavigateNext } from "react-icons/md"
import Search from './Search'
import Loading from './Loading'
import SearchTab from './SearchTab'
import notifyStore from "../store/notify"

const ItemTab = ({ name, setTab, query, isSelect }) => {

  return (
    <div style={{ padding: ".5em", color: 'gray', cursor: 'pointer', background: `${isSelect ? 'lightpink' : 'transparent'}`, borderRadius: '1em', transform: 'translateX(-.5em)' }}>
      <Button name={name} type="button" onClick={() => setTab(query)} />
    </div>
  )
}

const Tab = ({ listTab, setTab, row, itemTab, getChildrens, children, canScroll, handleSetDataSearch, urlApi, over }) => {
  const sizeObj = {
    BIG: 'big',
    SMALL: 'small'
  }

  const notifyStoreObj = notifyStore(state => state)
  const getSizeScreen = (size) => {
    if (size >= 700) {
      return sizeObj.BIG
    }
    return sizeObj.SMALL
  }

  const barTabRef = useRef(null)

  const [isOvered, setIsOvered] = useState(false)

  const [tabValue, setTabValue] = useState(() => listTab ? (listTab.length ? listTab[0].query : 0) : 0)
  const { screenSize, screenChange } = useResponsive(getSizeScreen)

  const handleSetTab = (tabName) => {
    setTab(tabName)
    setTabValue(tabName)
  }

  const handleSetIsOvered = () => {
    setIsOvered(!isOvered)
  }
  useEffect(() => {
    if (notifyStoreObj.isMessageNotify) {
      setTabValue('messenge')
    }
  }, [notifyStoreObj])



  //   const scrollNext = useRef()
  //   useEffect(() => {
  //     if (barTabRef.current) {
  // 
  //       let tabBarWidth = barTabRef.current.clientWidth
  //       let tabWidth = barTabRef.current.firstElementChild ? barTabRef.current.firstElementChild.clientWidth : 0
  //       let tabMount = barTabRef.current.childElementCount
  //       scrollNext.current = scroll(tabBarWidth, tabMount, tabWidth)
  //     }
  //   }, [barTabRef.current, screenChange, handleSetDataSearch])

  const handleBack = () => {
    setTab()
    handleSetIsOvered()
  }

  useEffect(() => {
    if (screenSize === sizeObj.BIG) {
      barTabRef.current.style.transform = `translateX(0%)`
    }
  }, [screenSize])

  useEffect(() => {
    barTabRef.current.style.transform = `translateX(0%)`
  }, [handleSetDataSearch])

  return (
    <div style={{ display: 'flex', fontSize: '1.8rem', flexDirection: `${row ? "row" : 'column'}`, width: `${screenSize === sizeObj.BIG ? 'auto' : '100%'}`, height: '100%', position: 'relative' }}>


      <div style={{ overflow: `${canScroll ? 'hidden' : 'visible'}`, position: `relative`, width: `${over ? "100%" : "auto"}`, height: `${over ? "100%" : "auto"}` }}>

        {itemTab &&
          <SearchTab handleSetDataSearch={async (data) => {
            await handleSetDataSearch(data)
          }} urlApi={urlApi} />
        }
        {
          canScroll && screenSize === sizeObj.SMALL &&
          <>
            {/* <div style={{ position: 'absolute', zIndex: '1', top: 'calc(50% + 2.5rem)', right: '.5em', transform: 'translateY(-50%)', borderRadius: '50%', overflow: 'hidden', boxShadow: '1px 1px 10px', width: '2em', height: '2em', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white' }}>
              <Button type='button' name={<MdNavigateNext />} onClick={() => {
                console.log('run')
                const next = (scrollNext.current)
                barTabRef.current.style.transform = `translateX(-${next() * 100}%)`
              }} />
            </div> */}
          </>
        }
        <div ref={barTabRef} style={{ display: 'flex', fontSize: '1.8rem', flexDirection: `${row ? "column" : 'row'}`, transition: '.3s', height: "100%" }}>

          {listTab ? (listTab.length ? (listTab.map((tab, index) => {
            return (
              itemTab ? itemTab(tab, setTab, index, { handleSetIsOvered }) :
                <ItemTab key={index} name={tab.name} setTab={handleSetTab} query={tab.query} isSelect={tabValue === tab.query} />
            )
          })) :
            <Loading />) :
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
      <div style={{ flex: '1', position: `${over ? 'absolute' : 'relative'}`, top: '0', left: '0', height: '100%', width: '100%', background: 'white', zIndex: `${over ? (isOvered ? "1" : '-1') : "auto"}`, opacity: `${over ? (isOvered ? "1" : "0") : "1"}`, display: `${over?'flex':'block'}`, flexDirection: 'column' }}>
        {
          over && isOvered && (
            <Button type='button' onClick={handleBack} name="Back" />
          )
        }
        {getChildrens ? getChildrens() : children}
      </div>
    </div>
  )
}

export default Tab

