import { useEffect, useRef, useState } from "react"
import axiosProvider from "../../../ulti/axios"
import { socket } from "../../../ulti/socketIO"
import BoxChat from "./BoxChat"
import Sender from "./Sender"

const ChatSession = ({ query }) => {

  const {userId} = JSON.parse(localStorage.getItem('user')).data


  const [data, setData] = useState([])


  const chatRef = useRef()

  const updateChat = (inbox) => {
    setData([...data, inbox])
  }

  socket.on('receive_message', (data) => {
    console.log(data)
    updateChat(data)
  })

  useEffect(() => {
    const getMessengers = async () => {
      const response = await axiosProvider.get(`/api/chat?idChat=${query}`, {})
      if(response.success){
        setData(response.data.messenge)
      }else{
        setData([])
      }
    }
    getMessengers()

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
    <div style={{ display: 'flex', flexDirection: 'column', height: '50vh', paddingBottom: '.5em' }}>
      {/* <h1>{query}</h1> */}


      {query ?
        <>

          <div ref={chatRef} className={"chat"} style={{ overflow: 'auto', padding: '0 1em 0 0', flex: '1', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: '1' }}></div>
            {data.map((inbox,index) => {
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
