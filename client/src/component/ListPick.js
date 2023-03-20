import React, { useEffect, useState } from 'react'
import axiosProvider from '../ulti/axios'
import Button from './Button'

const ListPick = ({ urlData, itemHandle, handleList }) => {

  const [data, setData] = useState([])
  const [itemsPicked, setItemsPicked] = useState([])

  console.log(itemsPicked)

  useEffect(() => {
    const fetchList = async () => {
      const res = await axiosProvider.get(urlData)
      setData(res.data)
    }
    fetchList()
  }, [])

  const handleOnClick = (item) => {
    const picked = itemsPicked.indexOf(item) > -1
    if (picked) {
      console.log(picked)
      const newPickList = itemsPicked.filter((_, index) => index !== itemsPicked.indexOf(item))
      console.log(newPickList)
      setItemsPicked(newPickList)
    } else {
      setItemsPicked([...itemsPicked, item])
    }
  }
  return (
    <div>
      <div>{
        data.map((item, index) => {
          const picked = itemsPicked.indexOf(item) > -1
          return itemHandle(item, index, picked, handleOnClick)
        })
      }</div>
      <Button name="Excute" onClick={() => { handleList(itemsPicked) }} />
    </div>
  )
}

export default ListPick
