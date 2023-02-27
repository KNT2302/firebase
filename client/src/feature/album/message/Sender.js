import { useRef } from "react"
import Button from "../../../component/Button"
import Input from "../../../component/Input"
import axiosProvider from "../../../ulti/axios"
import useGetUserId from "../../../ulti/hooks/getUserId"
import { socket } from "../../../ulti/socketIO"

const Sender = ({ updateChat, room }) => {
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
        inputRef.current.innerHTML = ""
        resolve("dv")
      }, 1000)
    })
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '.5em', alignItems: 'flex-end', fontSize: '1em', position: 'absolute', width: '100%', bottom: '0', left: '0', padding: '.5em' }}>
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
