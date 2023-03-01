
export const onMessageConsolve = (message, messageStore) => {

  const { receiveMessage, isUseChat } = messageStore

  const { notification } = message


  const notifyDisplay = message



  const body = notification.body.includes("{") ? JSON.parse(notification.body) : notification.body
  if (typeof body === 'object') {

    if (notification.title === "Message") {
      notifyDisplay.notification["body"] = body.content
      body.message = body.message + ":new"
      if (isUseChat) {
        receiveMessage(body)
        return
      }
    }

  }

  return { ...notifyDisplay, type: notification.title }

}
