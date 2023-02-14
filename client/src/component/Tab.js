import React from 'react'
import Button from './Button'



const ItemTab = ({ name, setTab, query }) => {

  return (
    <div style={{ padding: ".5em", paddingLeft: '0', color: 'gray', cursor: 'pointer' }}>
      <Button name={name} type="button" onClick={() => setTab(query)} />
    </div>
  )
}
const Tab = ({ listTab, setTab, children }) => {
  return (
    <div style={{ display: 'flex', fontSize: '1.8rem' }}>
      {listTab.map((tab, index) => {
        return (
          <ItemTab key={index} name={tab.name} setTab={setTab} query={tab.query} />
        )
      })}
      <div style={{ width: '100%' }}>
        {children}
      </div>
    </div>
  )
}

export default Tab

