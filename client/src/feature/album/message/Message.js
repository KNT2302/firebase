import React, { useEffect, useState } from 'react'
import Popup from '../../../component/Popup'
import Tab from '../../../component/Tab'

import { socket } from '../../../ulti/socketIO'
import ChatSession from './ChatSession'
import axiosProvider from '../../../ulti/axios'
import useGetUserId from '../../../ulti/hooks/getUserId'







const Message = () => {


  const [query, setQuery] = useState("")

  const [roomData, setRoomData] = useState([])

  const userId = useGetUserId()

  useEffect(() => {
    const getRoomList = async () => {
      if (userId) {
        const res = await axiosProvider.get(`/api/chat/room?userId=${userId}`, {})
        setRoomData(res.data)
      }
    }
    getRoomList()
  }, [userId])


  const handleUser = (query) => {

    setQuery(query)
    socket.emit("join_room", query)

  }

  const ItemTab = (query, setTab, key) => {
    return (
      <div key={key} style={{ display: 'flex', alignItems: 'flex-start', padding: '.5em', gap: '.5em', width: '100px', overflow: 'hidden' }} onClick={() => { setTab(query) }}>
        <div style={{ width: '2em', height: '2em', background: 'white', borderRadius: '50%', flexShrink: '0' }}></div>
        <div>
          <h1 style={{ fontSize: '1.2em' }}>{query}</h1>
          <p>message</p>
        </div>
      </div>
    )
  }

  const getChildren = () => {

    return (
      <div style={{ width: '100%' }}>
        <Tab listTab={roomData} row setTab={handleUser} itemTab={ItemTab}>
          <ChatSession query={query} />
        </Tab>
      </div>
    )

  }
  return (
    <>
      <Popup name="Message" getChildren={getChildren} position={{ bottom: '0%', left: '0' }} />
    </>
  )
}

export default Message
