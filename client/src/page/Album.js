import React, { useEffect, useState } from 'react'
import Container from '../component/Container'

import Tab from '../component/Tab'

import Home from '../feature/album/Home'
import Message from "../feature/album/message/Message"
import messageStore from "../store/message"
import notifyStore from "../store/notify"

const Album = () => {

  const tab = {
    home: 'home',
    messenge: "messenge"
  }
  const [nameTab, setTab] = useState('home')
  const { toggleClickChat } = messageStore(state => state)
  const { isMessageNotify } = notifyStore(state => state)


  const handleSetTab = (query) => {
    console.log(query)
    if (query === tab.messenge) {
      toggleClickChat(true)
    } else {
      toggleClickChat(false)
    }
    setTab(query)
  }

  const getChildrens = () => {

    if (nameTab === tab.home) {
      return (
        <Home />
      )
    } else {
      return (
        <Message />
      )
    }
  }

  useEffect(() => {
    if (isMessageNotify) {
      handleSetTab(tab.messenge)
    }
  }, [isMessageNotify])

  return (
    <Container>
      <Tab listTab={[{ name: 'Home', query: 'home' }, { name: 'Messenge', query: 'messenge' }]} setTab={handleSetTab} getChildrens={getChildrens} />
    </Container>
  )
}

export default Album
