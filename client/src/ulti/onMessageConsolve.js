
export const onMessageConsolve = (message, messageStore) => {

  const { receiveMessage, isUseChat } = messageStore

  const { notification } = message

  const notifyDisplay = message
  let data = null

  const body = notification.body.includes("{") ? JSON.parse(notification.body) : notification.body
  notifyDisplay.notification.body = body.content
  if (typeof body === 'object') {

    if (notification.title === "Message") {
      notifyDisplay.notification["body"] = body.content
      body.message = body.message + ":new"
      if (isUseChat) {
        receiveMessage(body)
        return
      }
    }
    if (notification.title === "Friend") {
      const { friendId, currentToken } = body
      data = {
        friendId,
        currentToken
      }
    }
  }

  return { ...notifyDisplay, type: notification.title, data }

}
