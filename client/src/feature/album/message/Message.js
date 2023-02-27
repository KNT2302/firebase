import React, { useEffect, useState } from 'react'
import Popup from '../../../component/Popup'
import Tab from '../../../component/Tab'
import ChatSession from './ChatSession'
import axiosProvider from '../../../ulti/axios'
import useGetUserId from '../../../ulti/hooks/getUserId'

const Message = () => {


  const [query, setQuery] = useState("")
  const [queryHaveGot, setQueryHaveGot] = useState([])

  const [messageData, setMessageData] = useState(null)

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

  const handleUser = (query) => {
    setQuery(query)
  }

  const updateChat = (inbox) => {
    const newMessageData = messageData
    newMessageData[query] = [...newMessageData[query], inbox]
    setMessageData({...newMessageData})
  }

  const ItemTab = (query, setTab, key) => {
    return (
      <div key={key} style={{ display: 'flex', alignItems: 'flex-start', padding: '.5em', gap: '.5em', width: '100px', overflow: 'hidden', cursor: 'pointer' }} onClick={() => { setTab(query) }}>
        <div style={{ width: '2em', height: '2em', background: 'white', borderRadius: '50%', flexShrink: '0' }}></div>
        <div>
          <h1 style={{ fontSize: '1.2em' }}>{query}</h1>
          <p>message</p>
        </div>
      </div>
    )
  }

  const getChildrens = () => {
    return (
      <ChatSession query={query} messengeData={messageData} updateChat={updateChat}/>
    )
  }

  const getChildren = () => {

    return (
      <div style={{ width: '100%' }}>
        <Tab listTab={roomData} row setTab={handleUser} itemTab={ItemTab} getChildrens={getChildrens} />
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
