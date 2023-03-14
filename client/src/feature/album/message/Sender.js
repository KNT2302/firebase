import { useRef, useState } from "react"
import Button from "../../../component/Button"
import Input from "../../../component/Input"
import axiosProvider from "../../../ulti/axios"
import useGetUserId from "../../../ulti/hooks/getUserId"
import { TbSend } from "react-icons/tb"
import { socket } from "../../../ulti/socketIO"
import PhotoPicker from "./PhotoPicker"
import Picture, { BoxPictures } from "../../../component/Picture"
import { useUploadPicture } from "../../../ulti/hooks/uploadPicture"




const Sender = ({ updateChat, room, userToken }) => {
  const inputRef = useRef(null)
  const userId = useGetUserId()
  const { selectedPic, handlePickFile, upLoadImagesPicked } = useUploadPicture()

  const handlePickPhoto = (src) => {
    handlePickFile(src)
  }

  const sendMessage = () => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        await socket.emit('send_message', {
          room,
          message: inputRef.current.innerHTML,
          pictures: selectedPic,
          userId,
          isSocket: true
        })

        const picturesPath = await upLoadImagesPicked()

        await axiosProvider.post("/api/chat", {}, {
          message: inputRef.current.innerHTML,
          userId,
          chatId: room,
          pictures: picturesPath
        })
        console.log('sent to ', room)
        updateChat({
          message: inputRef.current.innerHTML,
          pictures: selectedPic,
          userId,
          isSocket:true
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
        handlePickFile([])
        resolve("dv")
      }, 250)
    })
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', fontSize: '1em', padding: '1em 0 .5em 0', width: '375px' }}>
      <div style={{ borderRadius: '1em', overflow: 'hidden', flex: '1', transition: '.3s', width: '100%', display: 'flex', alignItems: 'flex-end', background: 'rgba(225,225,225,1)', paddingRight: '.5em' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          {selectedPic.length > 0 && (
            <div style={{ width: '100%', height: "200px", margin: '.5em', borderRadius: '.2em', overflow: 'hidden' }}>
              <BoxPictures pictures={selectedPic} />
            </div>
          )}
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
