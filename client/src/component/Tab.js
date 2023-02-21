import { query } from 'firebase/firestore'
import React from 'react'
import Button from './Button'



const ItemTab = ({ name, setTab, query }) => {

  return (
    <div style={{ padding: ".5em", paddingLeft: '0', color: 'gray', cursor: 'pointer' }}>
      <Button name={name} type="button" onClick={() => setTab(query)} />
    </div>
  )
}
const Tab = ({ listTab, setTab, row, itemTab, children }) => {
  return (
    <div style={{ display: 'flex', fontSize: '1.8rem', flexDirection: `${row ? "row" : 'column'}`, height: '100%' }}>
      <div style={{ display: 'flex', fontSize: '1.8rem', flexDirection: `${row ? "column" : 'row'}` }}>

        {listTab.map((tab, index) => {
          return (
            itemTab ? itemTab(tab.query, setTab,index) :
              <ItemTab key={index} name={tab.name} setTab={setTab} query={tab.query} />
          )
        })}
      </div>
      <div style={{ width: '100%', height: '100%' }}>
        {children}
      </div>
    </div>
  )
}

export default Tab

