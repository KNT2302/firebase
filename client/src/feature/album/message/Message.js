import React, { useEffect, useState } from 'react'
import Popup from '../../../component/Popup'
import Tab from '../../../component/Tab'
import ChatSession from './ChatSession'
import axiosProvider from '../../../ulti/axios'
import useGetUserId from '../../../ulti/hooks/getUserId'
import { onMessage } from 'firebase/messaging'
import { message } from '../../../firebaseConfig'
import { socket } from '../../../ulti/socketIO'

const Message = () => {


  const [query, setQuery] = useState("")
  const [queryHaveGot, setQueryHaveGot] = useState([])

  const [messageData, setMessageData] = useState(null)

  const [roomData, setRoomData] = useState([])

  const userId = useGetUserId()

  useEffect(() => {
    const getMessengers = async () => {

      const response = await axiosProvider.get(`/api/chat?idChat=${query}`, {})
      if (response.success) {
        setMessageData({ ...messageData, [query]: [...response.data.messenge] })
      } else {
        setMessageData()
      }
    }

    if (!queryHaveGot.includes(query)) {
      getMessengers()
      setQueryHaveGot([...queryHaveGot, query])
    }
  }, [query])

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
    socket.emit("join_room", query)
    setQuery(query)
  }

  const updateChat = (inbox) => {
    const newMessageData = messageData
    newMessageData[query] = [...newMessageData[query], inbox]
    setMessageData({ ...newMessageData })
  }

  const ItemTab = (tab, setTab, key) => {

    return (
      <div key={key} style={{ display: 'flex', alignItems: 'flex-start', padding: '.5em', gap: '.5em', width: '150px', overflow: 'hidden', cursor: 'pointer', flexShrink: '0' }} onClick={() => { setTab(tab.query) }}>
        <div style={{ width: '2em', height: '2em', background: 'white', borderRadius: '50%', flexShrink: '0' }}></div>
        <div>
          <h1 style={{ fontSize: '1.2em', textOverflow: "ellipsis", overflow: 'hidden', whiteSpace: 'nowrap' }}>{tab.name}</h1>
          <p style={{ textOverflow: "ellipsis", overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {messageData && messageData[tab.query] ? (messageData[tab.query] && messageData[tab.query][messageData[tab.query].length - 1].message) : tab.lastMessenge}
          </p>
        </div>
      </div>
    )
  }

  const getChildrens = () => {
    return (
      <ChatSession query={query} messengeData={messageData} updateChat={updateChat} />
    )
  }

  const getChildren = () => {

    return (
      <div style={{ width: '100%', position: 'relative' }}>
        <Tab listTab={roomData} row setTab={handleUser} itemTab={ItemTab} getChildrens={getChildrens} />
      </div>
    )

  }
  return (
    <>
      <Popup name="Message" getChildren={getChildren} position={{ bottom: '0%', left: '0' }} maxWidth="375px" />
    </>
  )
}

export default Message
