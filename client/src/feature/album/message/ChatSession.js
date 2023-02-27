import { useEffect, useRef, useState } from "react"
import axiosProvider from "../../../ulti/axios"
import { socket } from "../../../ulti/socketIO"
import BoxChat from "./BoxChat"
import Sender from "./Sender"

const ChatSession = ({ query, messengeData, updateChat }) => {

  const { userId } = JSON.parse(localStorage.getItem('user')).data





  const chatRef = useRef()


  socket.on('receive_message', (data) => {
    console.log(data)
    updateChat(data)
  })

  useEffect(() => {
    return () => {
      if (query) {

        socket.emit('leave_room', query)
      }
    }
  }, [query])

  useEffect(() => {

    if (document.querySelector(".chat")) {

      document.querySelector(".chat").scrollTo(0, document.querySelector(".chat").scrollHeight)


    }

  }, [messengeData, query])


  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '50vh', paddingBottom: '.5em' }}>
      {/* <h1>{query}</h1> */}
      {query ?
        <>

          <div ref={chatRef} className={"chat"} style={{ overflow: 'auto', padding: '0 1em 0 0', flex: '1', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: '1' }}></div>
            {messengeData && messengeData[query] && messengeData[query].map((inbox, index) => {
              return (
                <BoxChat key={index} sent={inbox.userId === userId} inbox={inbox} />
              )
            })}
          </div>
          <Sender updateChat={updateChat} room={query} />

        </> :
        <>Chat</>
      }
    </div>
  )
}

export default ChatSession
