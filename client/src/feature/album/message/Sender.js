import { useRef } from "react"
import Button from "../../../component/Button"
import Input from "../../../component/Input"
import axiosProvider from "../../../ulti/axios"
import { socket } from "../../../ulti/socketIO"

const Sender = ({ updateChat, room }) => {
  const inputRef = useRef(null)
  const { userId } = JSON.parse(localStorage.getItem('user'))

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
        resolve("dv")
      }, 1000)
    })
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '.5em', alignItems: 'flex-end', fontSize: '1em' }}>
      <div style={{ borderRadius: '1em', overflow: 'hidden', flex: '1', transition: '.3s' }}>

        <Input textarea ref={inputRef} type="text" />
      </div>
      <div style={{ padding: '0 .5em' }}>

        <Button name="Send" onClick={sendMessage} />
      </div>
    </div>
  )
}

export default Sender
