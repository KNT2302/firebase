import { useRef, useState } from "react"
import Button from "../../../component/Button"
import Input from "../../../component/Input"
import axiosProvider from "../../../ulti/axios"
import useGetUserId from "../../../ulti/hooks/getUserId"
import { TbSend } from "react-icons/tb"
import { socket } from "../../../ulti/socketIO"
import PhotoPicker from "./PhotoPicker"
import Picture from "../../../component/Picture"

const Sender = ({ updateChat, room, userToken }) => {
  const inputRef = useRef(null)
  const userId = useGetUserId()
  const [picture, setPicture] = useState([])

  const handlePickPhoto = (src) => {
    setPicture([...picture, src])
  }

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
      }, 250)
    })
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', fontSize: '1em', padding: '1em 0 .5em 0', width: '375px' }}>
      <div style={{ borderRadius: '1em', overflow: 'hidden', flex: '1', transition: '.3s', width: '100%', display: 'flex', alignItems: 'flex-end', background: 'rgba(225,225,225,1)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          {picture.map((item, index) => {
            return (
              <div key={index} style={{ height: '150px', width: '100%', padding: '.5em' }}>
                <Picture getSrc={() => { return item }} />
              </div>
            )
          })}
          <Input textarea ref={inputRef} type="text" />
        </div>
        <PhotoPicker handlePickPhoto={handlePickPhoto} />
      </div>
      <div style={{ padding: '0 .5em' }}>

        <Button name={<TbSend />} onClick={sendMessage} />
      </div>
    </div>
  )
}

export default Sender
