import { getToken, onMessage } from 'firebase/messaging'
import React, { useEffect, useState } from 'react'
import Popup from '../../component/Popup'
import { message } from '../../firebaseConfig'
import { MdOutlineNotificationsNone } from "react-icons/md"
import Message from './Message'
import NumberNew from './NumberNew'
import Button from '../../component/Button'
import { List } from './List'

const Notify = ({ promiseGetToken }) => {

  const [data, setData] = useState([
    {
      id: '1',
      title: 'Service System',
      content: "Updated avatar",
      image: 'url(1)'
    },
    {
      id: '2',
      title: 'Service System',
      content: "Updated photo",
      image: 'url(1)'
    }
  ])

  const [newData, setNewData] = useState([])

  useEffect(() => {

    promiseGetToken.current = () => {
      return new Promise((resolve, reject) => {

        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            console.log("Notification permission granted.")

            getToken(message, {
              vapidKey:
                "BCrLmZCKr730uizu0keRxgSVCPQyXr0qlhVZZ5r5qPLUGrgJb9qP9NdHulaRETzABlS0JZi0OARryYR4BRZ8oGI",
            }).then((currentToken) => {
              if (currentToken) {
                resolve(currentToken)
                console.log("currentToken: ", currentToken)
              } else {
                console.log("Can not get token")
                resolve("Error internal")
              }
            }).catch((err) => {
              console.log(err)
              resolve("Error internal")
            })
          } else {
            console.log("Do not have permission!")
            resolve("do not have permission")
          }
        })
      })
    }

  }, [])

  useEffect(() => {
    onMessage(message, (message) => {
      console.log(message)
      const { notification, messageId } = message
      setNewData([...newData, {
        id: messageId,
        title: notification.title,
        content: notification.body,
        image: 'url(1)'
      }])
    })
  }, [newData])

  const setHaveRead = (message) => {
    const haveNotRead = newData
    haveNotRead[haveNotRead.indexOf(message)] = {}

    haveNotRead.filter((message) => Object.keys(message).length > 0)
    setNewData(haveNotRead.filter((message) => Object.keys(message).length > 0))
    setData([...data, message])
  }

  const getChildren = (handleClosePopup) => {
    return (
      <List oldList={data} newList={newData} handleClosePopup={handleClosePopup} setHaveRead={setHaveRead} />
    )
  }
  return (
    <div style={{display:'flex'}}>
      <Popup name={<MdOutlineNotificationsNone />} getChildren={getChildren} position={{ top: '1em' }} />
      {newData.length > 0 &&
        <div style={{ width: '1em', height: '1em', position: 'relative' }}>
          <NumberNew numberNew={newData.length} />
        </div>
      }

    </div>
  )
}

export default Notify
