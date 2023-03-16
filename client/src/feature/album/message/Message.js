import React, { useCallback, useEffect, useState } from 'react'
import Tab from '../../../component/Tab'
import ChatSession from './ChatSession'
import axiosProvider from '../../../ulti/axios'
import useGetUserId from '../../../ulti/hooks/getUserId'
import { socket } from '../../../ulti/socketIO'
import TabChat from './TabChat'
import messageStore from "../../../store/message"
import useResponsive from '../../../ulti/hooks/reponsive'
import notifyStore from "../../../store/notify"


const Message = () => {

  const [query, setQuery] = useState("")
  const [messageData, setMessageData] = useState(null)

  const [roomData, setRoomData] = useState([])

  const [userToken, setUserToken] = useState("")

  const userId = useGetUserId()

  const [searchedRoom, setSearchedRoom] = useState([])

  const { setChatRoomCurrent, messageReceive, roomCurrent, roomReceive } = messageStore(state => state)

  const { closePopup } = notifyStore(state => state)

  const friendInfo = () => {

    let info = null
    const roomJoined = roomData.filter((room) => room.query === roomCurrent)

    info = roomJoined[0]


    return info

  }

  useEffect(() => {
    const getMessengers = async () => {

      const response = await axiosProvider.get(`/api/chat?idChat=${roomCurrent}`, {})
      setMessageData({ ...messageData, [roomCurrent]: [...response.data.messenge] })
    }
    if (roomCurrent) {

      getMessengers()

    }

    return () => {
      socket.emit('leave_room', roomCurrent)
    }


  }, [roomCurrent])


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

  const handleSetDataSearch = useCallback((data) => {
    return new Promise(async (resolve) => {
      setSearchedRoom(data)
      resolve("done")
    })
  }, [searchedRoom])

  useEffect(() => {
    return () => {
      closePopup()
    }
  }, [])

  const GetChildrens = () => {
    return (
      <ChatSession query={roomCurrent} messengeData={messageData} updateChat={updateChat} userToken={userToken} friendInfo={friendInfo} />
    )
  }



  const sizeObj = {
    BIG: 'big',
    SMALL: 'small'
  }

  const getSizeScreen = (size) => {
    if (size >= 700) {
      return sizeObj.BIG
    }
    return sizeObj.SMALL
  }

  const { screenSize } = useResponsive(getSizeScreen)

  const getItemTab = (tab, setTab, index,func) => {
    return <TabChat tab={tab} setTab={setTab} index={index} handleSetIsOvered={func.handleSetIsOvered} />
  }
  const getChildren = () => {

    const urlApi = `/api/chat/search?userId=${userId}&name=`

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Tab listTab={searchedRoom.length ? searchedRoom : roomData} row={true} setTab={handleUser} itemTab={getItemTab} getChildrens={GetChildrens} canScroll handleSetDataSearch={handleSetDataSearch} urlApi={urlApi} over={screenSize === sizeObj.SMALL}/>
      </div>
    )

  }

  return (
    <div style={{ height: '100%' }}>
      {getChildren()}
    </div>
  )
}
export default Message



