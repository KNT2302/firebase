import { useEffect, useRef, useState } from "react"
import { socket } from "../../../ulti/socketIO"
import BoxChat from "./BoxChat"
import Sender from "./Sender"

const ChatSession = ({ query }) => {
  const [data, setData] = useState([
    {
      message: "csasc",
      type: 'receive'
    }
  ])

  const chatRef = useRef()

  const updateChat = (inbox) => {
    setData([...data, inbox])
  }

  socket.on('receive_message', (data) => {
    console.log(data)
    updateChat(data)
  })

  useEffect(() => {
    setData([])
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

  }, [data, query])


  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', height: '50vh', paddingBottom: '.5em' }}>
      <h1>{query}</h1>


      {query ?
        <>

          <div ref={chatRef} className={"chat"} style={{ overflow: 'auto', padding: '0 1em 0 0', flex: '1', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: '1' }}></div>
            {data.map(inbox => {
              return (
                <BoxChat sent={inbox.type === "sent"} inbox={inbox} />
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
