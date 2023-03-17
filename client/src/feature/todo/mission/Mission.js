import React, { useEffect, useState } from 'react'
import Task from './Task'
import axiosProvider from '../../../ulti/axios'

const Mission = () => {

  const [data, setData] = useState(null)

  useEffect(()=>{
    const getMission = async () => {
      const response = await axiosProvider.get("/api/mission?userId=JeXkhyAzOrZXsJSiS9ExXZJ74Ph1")
      setData(response.data)
    }

    getMission()
  },[])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem' }}>Mission</h1>
      <div style={{ flex: '1', width: '100%' }}>
        {data && (Object.keys(data.mission).map(item => {
          return data.mission[item]
        })).map((missionObj) => {
          return missionObj.map((item) => {
            return (
              <Task key={item.id} task={{ mission: item.mission, total: item.total, completed: data.totalTask }} />
            )
          })
        })}
      </div>
    </div>
  )
}

export default Mission
