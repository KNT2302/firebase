import React, { useEffect, useState } from 'react'
import Popup from '../../../component/Popup'
import Tab from '../../../component/Tab'
import ChatSession from './ChatSession'
import axiosProvider from '../../../ulti/axios'
import useGetUserId from '../../../ulti/hooks/getUserId'
import { socket } from '../../../ulti/socketIO'
import TabChat from './TabChat'
import messageStore from "../../../store/message"
import notifyStore from "../../../store/notify"
import {TiMessages} from "react-icons/ti"


const Message = () => {

  const [query, setQuery] = useState("")

  const [messageData, setMessageData] = useState(null)

  const [roomData, setRoomData] = useState([])

  const [userToken, setUserToken] = useState("")

  const userId = useGetUserId()

  const { setChatRoomCurrent, messageReceive, roomCurrent, roomReceive, toggleClickChat } = messageStore(state => state)
  const { isMessageNotify, closePopup } = notifyStore(state => state)

  console.log(isMessageNotify)
  useEffect(() => {
    const getMessengers = async () => {

      const response = await axiosProvider.get(`/api/chat?idChat=${query}`, {})
      setMessageData({ ...messageData, [query]: [...response.data.messenge] })
    }
    if (query) {

      getMessengers()

    }

    return () => {
      socket.emit('leave_room', query)
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

  const handleUser = (query, userToken) => {
    socket.emit("join_room", query)
    setQuery(query)
    setUserToken(userToken)
    setChatRoomCurrent(query)
  }

  const updateChat = (inbox) => {
    const newMessageData = messageData
    newMessageData[query] = [...newMessageData[query], inbox]
    setMessageData({ ...newMessageData })
  }

  const updateChatFromTab = (inbox, query) => {
    const newMessageData = messageData
    newMessageData[query] = [...newMessageData[query], inbox]
    setMessageData({ ...newMessageData })
  }

  useEffect(() => {

    if (roomData.length > 0 && messageData) {

      const newRoomData = roomData.map((room) => {
        if (messageData[room.query] && messageData[room.query].length) {
          return {
            ...room,
            lastMessenge: messageData[room.query][messageData[room.query].length - 1].message
          }
        } else {
          return {
            ...room
          }
        }

      })
      setRoomData([...newRoomData])
    }
  }, [messageData])

  useEffect(() => {
    if (messageReceive) {
      const newDataRoom = roomData.map((roomItem) => {
        if (roomCurrent !== roomReceive && roomItem.query === roomReceive) {
          return {
            ...roomItem,
            lastMessenge: messageReceive
          }
        } else {
          return {
            ...roomItem
          }
        }
      })
      setRoomData([...newDataRoom])
    }



  }, [messageReceive])

  const GetChildrens = () => {

    return (
      <ChatSession query={query} messengeData={messageData} updateChat={updateChat} userToken={userToken} />
    )
  }

  const getChildren = () => {

    return (
      <div style={{ width: '100%', position: 'relative' }}>
        <Tab listTab={roomData} row setTab={handleUser} itemTab={TabChat} getChildrens={GetChildrens} />
      </div>
    )

  }

  const toggleChat = () => {
    toggleClickChat()
  }
  return (
    <div>
  
      <Popup openPopupByClick={true} isLinkNotify={isMessageNotify} name="Message" getChildren={getChildren} position={{ bottom: '0%', left: '0' }} maxWidth="375px" whenClick={toggleChat} whenClose={() => {
        closePopup()
      }} commonClose={toggleChat} icon={<TiMessages/>} />
    </div>
  )
}

export default Message



