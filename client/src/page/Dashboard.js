import React from 'react'
import Pagition from '../component/Pagition/Pagition'
import Tab from '../component/Tab/Tab'


const DashboardTab1 = ({ setData, data }) => {
  console.log(data)

  const setDashboardTab1 = (fetchedData, query) => {
    setData(fetchedData, "monthly", query)
  }

  const fetchData = (item) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = { data: [item] }
        resolve(response)
      }, 1000)
    })

  }
  return (
    <div>
      <Pagition setData={setDashboardTab1} data={data} fetchData={fetchData} firstPage="from=0&to=4" />
    </div>
  )
}

const Dashboard = () => {

  const fetchData = (item) => {
    return new Promise((resolve) => {
      setTimeout(() => {

        const response = { data: [item] }
        resolve(response)
      }, 1000)
    })
  }
  const Item = ({ item, setItems, name, isCurrentItem }) => {
    return (
      <div style={{ display: 'flex', gap: '.25em', color: `${isCurrentItem ? 'red' : 'black'}`, cursor: 'pointer' }} onClick={() => { setItems(item) }}>
        {name}
        <div style={{ background: 'gray', width: '2px', height: '100%' }}></div>
      </div>
    )
  }

  const getItems = (setItems, currentItem) => {

    const itemQueries = [{ name: 'Monthly', query: 'monthly' }, { name: 'Activities', query: 'activities' }, { name: 'Achivements', query: 'achivements' }]

    return (
      <>
        {
          itemQueries.map((query) => {
            return (
              <Item isCurrentItem={currentItem === query.query} key={query.query} item={query.query} name={query.name} setItems={setItems} />
            )
          })
        }
      </>
    )
  }

  const getItemContent = (data, item, setData) => {

    const setDataDashboard = (newData, item, query) => {
      setData(
        {
          ...data,
          [item]: { ...data[item], [query]: [...newData] }
        }
      )
    }

    switch (item) {
      case 'monthly':
        return <DashboardTab1 data={data[item]} setData={setDataDashboard} />
      case 'activities':
        return <div>{data[item] && JSON.stringify(Object.values(data[item])[0])}</div>
      default:
        return <div>{data[item] && JSON.stringify(Object.values(data[item])[0])}</div>

    }

  }
  return (
    <div><Tab fetchData={fetchData} getItems={getItems} getItemContent={getItemContent} firstItem={'monthly'} /></div>
  )
}

export default Dashboard
