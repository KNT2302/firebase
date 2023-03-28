import React from 'react'

const Items = ({ setItems, getItems, currentItem }) => {
  return (
    <div style={{ display: 'flex', gap: '.25em' }}>
      {getItems(setItems, currentItem)}
    </div>
  )
}

export default Items
