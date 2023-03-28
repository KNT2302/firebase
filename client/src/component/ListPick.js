import React, { useEffect, useState } from 'react'
import axiosProvider from '../ulti/axios'
import Button from './Button'
import Loading from './Loading'


const ListPick = ({ urlData, itemHandle, handleList, excuteName }) => {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [itemsPicked, setItemsPicked] = useState([])

  console.log(itemsPicked)

  useEffect(() => {
    const fetchList = async () => {
      const res = await axiosProvider.get(urlData)
      setData(res.data)
      setIsLoading(false)
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

  const chooseAll = () => {
    if (data.length === itemsPicked.length) {
      setItemsPicked([])
    } else {
      setItemsPicked(data)
    }
  }

  const handleOnClickExcute = () => {
    return new Promise(async (resolve) => {
      const list = await handleList(itemsPicked)
      resolve("finish")
    })
  }

  return (
    <div>
      {!isLoading ?
        <>
          <div style={{ height: '2em' }}>
            <Button name="Choose all" onClick={chooseAll} />
          </div>
          <div>{
            data.map((item, index) => {
              const picked = itemsPicked.indexOf(item) > -1
              return itemHandle(item, index, picked, handleOnClick)
            })
          }</div>
          <Button name={excuteName} onClick={handleOnClickExcute} />
        </> :
        <Loading />}
    </div>
  )
}

export default ListPick
