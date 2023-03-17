import { useEffect } from "react"
import notifyStore from "../../../store/notify"
import messageStore from "../../../store/message"

const TabChat = ({ tab, setTab, key, handleSetIsOvered }) => {
  const messageDisplay = tab.lastMessenge
  const isNew = messageDisplay.split(":")[1]

  const { isMessageNotify } = notifyStore(state => state)
  const { roomCurrent, setChatRoomCurrent } = messageStore(state => state)

  useEffect(() => {
    if (isMessageNotify && roomCurrent === tab.query) {
      const userToken = tab.userToken
      setTab(tab.query, {userToken})
    }
  }, [isMessageNotify])

  useEffect(() => {
    if (roomCurrent) {
      const userToken = tab.userToken
      setTab(roomCurrent, {userToken})
      handleSetIsOvered()
    }

  }, [roomCurrent])
  return (
    <div key={key} style={{ padding: '.5em .5em .5em 0', width: '100%', flexShrink: '0' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '.5em', gap: '.5em', cursor: 'pointer', background: 'rgba(225,225,225,1)', borderRadius: '.5em', width: '100%', textOverflow: 'ellipsis', overflow: 'hidden' }} onClick={() => {
        setChatRoomCurrent(tab.query)
      }}>
        <div style={{ width: '2em', height: '2em', borderRadius: '50%', flexShrink: '0', backgroundImage: `url(${tab.photoURL})`, backgroundPosition: "center", backgroundSize: 'cover' }}></div>
        <div>
          <h1 style={{ fontSize: '1.2em', textOverflow: "ellipsis", overflow: 'hidden', whiteSpace: 'nowrap' }}>{tab.name}</h1>
          <p style={{ textOverflow: "ellipsis", overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: `${isNew ? "700" : '500'}` }}>
            {messageDisplay.split(":")[0]}
          </p>
        </div>
      </div>
    </div>



  )
}

export default TabChat


