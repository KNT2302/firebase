import { useEffect, useRef } from "react"
import Loading from "../../../component/Loading"
import { socket } from "../../../ulti/socketIO"
import BoxChat from "./BoxChat"
import NoteChat from "./NoteChat"
import Sender from "./Sender"

const ChatSession = ({ query, messengeData, updateChat, userToken, friendInfo }) => {


  const { userId } = JSON.parse(localStorage.getItem('user')).data

  const chatRef = useRef()

  const friend = friendInfo()

  useEffect(() => {
    socket.on('receive_message', (data) => {

      console.log(data)
      updateChat({ message: data.message, userId: data.userId })
    })
    return () => {
      socket.off("receive_message")
    }
  }, [updateChat])


  useEffect(() => {

    if (document.querySelector(".chat")) {

      document.querySelector(".chat").scrollTo(0, document.querySelector(".chat").scrollHeight)


    }

  }, [messengeData, query])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h1 style={{ fontSize: '1.5em' }}>{friend && friend.name}</h1>
      {query ?
        <>
          <div ref={chatRef} className={"chat"} style={{ overflow: 'auto', padding: '0 1em 0 0', flex: '1', flexBasis: '1px', marginRight: '-20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '700px', margin: '0 auto', height: '100%' }} >
              <div style={{ flex: '1' }}></div>
              {(!messengeData || !messengeData[query]) && <Loading />}
              {messengeData && messengeData[query] && messengeData[query].map((inbox, index) => {
                return (
                  <BoxChat key={index} sent={inbox.userId === userId} inbox={inbox} friendInfo={friend} isLastSent={index === messengeData[query].length - 1 || inbox.userId !== messengeData[query][index].userId} />
                )
              })}
            </div>

          </div>

          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Sender updateChat={updateChat} room={query} userToken={userToken} />

          </div>

        </> :
        <NoteChat />
      }
    </div>
  )
}

export default ChatSession
