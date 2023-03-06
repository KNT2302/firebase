import { useRef } from "react"
import Button from "../../../component/Button"
import Input from "../../../component/Input"
import axiosProvider from "../../../ulti/axios"
import useGetUserId from "../../../ulti/hooks/getUserId"
import { socket } from "../../../ulti/socketIO"

const Sender = ({ updateChat, room, userToken }) => {
  const inputRef = useRef(null)
  const userId = useGetUserId()

  const sendMessage = () => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        await socket.emit('send_message', {
          room,
          message: inputRef.current.innerHTML,
          userId
        })
        await axiosProvider.post("/api/chat", {}, {
          message: inputRef.current.innerHTML,
          userId,
          chatId: room
        })
        console.log('sent to ', room)
        updateChat({
          message: inputRef.current.innerHTML,
          userId
        })
        await axiosProvider.post("/api/pushNotification", {}, {
          currentToken: userToken,
          title: "Message",
          body: {
            content: `Have received a message: ${inputRef.current.innerHTML}`,
            room,
            message: inputRef.current.innerHTML
          }
        })
        inputRef.current.innerHTML = ""
        resolve("dv")
      }, 1000)
    })
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '.5em', alignItems: 'flex-end', fontSize: '1em', padding: '.5em', width:'375px' }}>
      <div style={{ borderRadius: '1em', overflow: 'hidden', flex: '1', transition: '.3s', width:'100%' }}>

        <Input textarea ref={inputRef} type="text" />
      </div>
      <div style={{ padding: '0 .5em' }}>

        <Button name="Send" onClick={sendMessage} />
      </div>
    </div>
  )
}

export default Sender
