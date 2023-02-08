import React from 'react'
import Button from '../../component/Button'


const ItemTab = ({ name, setTab, query }) => {

  return (
    <div style={{ padding: ".5em", paddingLeft: '0', color: 'gray', cursor: 'pointer' }}>
      <Button name={name} type="button" onClick={() => setTab(query)} />
    </div>
  )
}
const TabPhoto = ({ listTab, setTab }) => {
  return (
    <div style={{ display: 'flex', fontSize: '1.8rem' }}>
      {listTab.map((tab, index) => {
        return (
          <ItemTab key={index} name={tab.name} setTab={setTab} query={tab.query} />
        )
      })}
    </div>
  )
}

export default TabPhoto
