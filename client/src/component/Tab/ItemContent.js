import React from 'react'

const ItemContent = ({ data,item,getItemContent,setData }) => {
  return (
    <div>{getItemContent(data,item,setData)}</div>
  )
}

export default ItemContent
