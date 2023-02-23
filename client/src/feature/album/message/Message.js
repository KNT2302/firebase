import React, { useEffect, useRef, useState } from 'react'
import Popup from '../../../component/Popup'
import Tab from '../../../component/Tab'
import Input from '../../../component/Input'
import Button from '../../../component/Button'
import { socket } from '../../../ulti/socketIO'
import ChatSession from './ChatSession'

const tabMesList = [
  {
    name: 'Terami',
    query: "123"
  },
  {
    name: 'Ronaldo',
    query: "124"
  },
  {
    name: 'Messi',
    query: "125"
  },
  {
    name: 'Neymar',
    query: "126"
  },
  {
    name: 'Son',
    query: "127"
  }
]






const Message = () => {

  const [query, setQuery] = useState("")

  const handleUser = (query) => {

    setQuery(query)
    socket.emit("join_room", query)

  }

  const itemTab = (query, setTab, key) => {
    return (
      <div key={key} style={{ display: 'flex', alignItems: 'flex-start', padding: '.5em', gap: '.5em' }} onClick={() => { setTab(query) }}>
        <div style={{ width: '2em', height: '2em', background: 'white', borderRadius: '50%' }}></div>
        <div>
          <h1 style={{ fontSize: '1.2em' }}>{query}</h1>
          <p>message</p>
        </div>
      </div>
    )
  }

  const getChildren = () => {

    return (
      <div style={{ width: '100%' }}>
        <Tab listTab={tabMesList} row setTab={handleUser} itemTab={itemTab}>
          <ChatSession query={query} />
        </Tab>
      </div>
    )

  }
  return (
    <>
      <Popup name="Message" getChildren={getChildren} position={{ bottom: '0%', left: '0' }} />
    </>
  )
}

export default Message
