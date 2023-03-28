import React, { useEffect, useState } from 'react'
import ItemContent from './ItemContent'
import Items from './Items'


const Tab = ({ fetchData, getItems, getItemContent, firstItem }) => {

  const [data, setData] = useState({})

  const [item, setItems] = useState(() => firstItem)

  useEffect(() => {
    const fetchDataTab = async () => {
      const response = await fetchData(item)

      setData({
        ...data,
        [item]: { 'from=0&to=4': [...response.data] }
      })
    }

    if (!data[item]) {
      fetchDataTab()
    }
  }, [item])

  console.log(data)

  return (
    <div style={{ fontSize: '1.8rem' }}>
      <Items currentItem={item} setItems={setItems} getItems={getItems} />
      <ItemContent data={data} item={item} getItemContent={getItemContent} setData={setData} />
    </div>
  )
}

export default Tab
