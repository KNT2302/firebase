import React, { useState } from 'react'
import useResponsive from '../ulti/hooks/reponsive'
import Button from './Button'



const ItemTab = ({ name, setTab, query, isSelect }) => {

  return (
    <div style={{ padding: ".5em", color: 'gray', cursor: 'pointer', background: `${isSelect ? 'lightpink' : 'transparent'}`, borderRadius: '1em', transform: 'translateX(-.5em)' }}>
      <Button name={name} type="button" onClick={() => setTab(query)} />
    </div>
  )
}


const Tab = ({ listTab, setTab, row, itemTab, getChildrens, children }) => {
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
  const [tabValue, setTabValue] = useState(() => listTab ? (listTab.length ? listTab[0].query : 0) : 0)
  const screenSize = useResponsive(getSizeScreen)

  const handleSetTab = (tabName) => {
    setTab(tabName)
    setTabValue(tabName)
  }

  return (
    <div style={{ display: 'flex', fontSize: '1.8rem', flexDirection: `${row ? "row" : 'column'}`, height: '100%', width: `${screenSize === sizeObj.BIG ? 'auto' : '100%'}` }}>
      <div style={{ display: 'flex', fontSize: '1.8rem', flexDirection: `${row ? "column" : 'row'}` }}>

        {listTab ? listTab.map((tab, index) => {
          return (
            itemTab ? itemTab(tab.query, setTab, index) :
              <ItemTab key={index} name={tab.name} setTab={handleSetTab} query={tab.query} isSelect={tabValue === tab.query} />
          )
        }) :
          <div style={{ padding: ".5em", cursor: 'pointer', borderRadius: '1em', transform: 'translateX(-.5em)', color: 'transparent' }}>
            NaN
          </div>}
      </div>
      <div style={{ flex: '1' }}>
        {getChildrens ? getChildrens() : children}
      </div>
    </div>
  )
}

export default Tab

