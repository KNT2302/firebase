import React, { useState } from 'react'
import Button from './Button'



const ItemTab = ({ name, setTab, query, isSelect }) => {

  return (
    <div style={{padding: ".5em", paddingLeft: '0', color: 'gray', cursor: 'pointer', background:`${isSelect?'lightpink':'white'}`, borderRadius:'1em' }}>
      <Button name={name} type="button" onClick={() => setTab(query)} />
    </div>
  )
}
const Tab = ({ listTab, setTab, row, itemTab, children }) => {
  const [tabValue, setTabValue] = useState(()=>listTab[0].query)

  const handleSetTab = (tabName) => {
    setTab(tabName)
    setTabValue(tabName)
  }

  return (
    <div style={{ display: 'flex', fontSize: '1.8rem', flexDirection: `${row ? "row" : 'column'}`, height: '100%' }}>
      <div style={{ display: 'flex', fontSize: '1.8rem', flexDirection: `${row ? "column" : 'row'}` }}>

        {listTab.map((tab, index) => {
          return (
            itemTab ? itemTab(tab.query, setTab,index) :
              <ItemTab key={index} name={tab.name} setTab={handleSetTab} query={tab.query} isSelect={tabValue === tab.query} />
          )
        })}
      </div>
      <div style={{ flex:'1' }}>
        {children}
      </div>
    </div>
  )
}

export default Tab

