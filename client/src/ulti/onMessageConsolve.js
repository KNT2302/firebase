
export const onMessageConsolve = (message, notifyStore) => {

  const { receiveMessage } = notifyStore

  const { notification } = message


  const notifyDisplay = message
  const body = JSON.parse(notification.body)
  if (typeof body === 'object') {

    if (notification.title === "Message") {
      message.notification["body"] = body.content
      receiveMessage(body)
    }

  }

  return notifyDisplay

}
