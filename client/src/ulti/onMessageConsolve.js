
export const onMessageConsolve = (message, notifyStore) => {

  const { receiveMessage, isUseChat } = notifyStore

  const { notification } = message


  const notifyDisplay = message
  
  const body = JSON.parse(notification.body)
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

  return {...notifyDisplay, type: notification.title}

}
