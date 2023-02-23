import { useRef } from "react"
import Button from "../../../component/Button"
import Input from "../../../component/Input"
import { socket } from "../../../ulti/socketIO"

const Sender = ({ updateChat, room }) => {
  const inputRef = useRef(null)

  const sendMessage = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        updateChat({
          message: inputRef.current.innerHTML,
          type: 'sent'
        })
        socket.emit('send_message', {
          room,
          message: inputRef.current.innerHTML,
          type: 'receive'
        })
        console.log('sent to ', room)
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
