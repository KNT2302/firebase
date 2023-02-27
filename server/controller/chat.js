import { db } from "../app.js"
import { getDoc, doc, updateDoc } from "firebase/firestore"

import { createOne, getUser } from "../ulti/common.js"
import { async } from "@firebase/util"

export const getChat = async (req, res, next) => {
  try {

    const chatSession = await getDoc(doc(db, 'chat', req.query.idChat))
    const getChatSellection = () => {
      const chatSellection = chatSession.data().messenger
      if (chatSellection) {
        const chatsObject = Promise.all(chatSellection.map(async (idChat) => {
          const chatObject = await getDoc(doc(db, 'messenger', idChat))
          return chatObject.data()
        }))
        return chatsObject
      } else {
        return []
      }
    }


    res.status(200).json({
      success: true, data: {
        idChat: chatSession.data().idChat,
        messenge: await getChatSellection()
      }
    })
  }

  catch (err) {
    res.status(200).json({ success: false, err })
  }
}

export const createMessenger = async (req, res, next) => {
  try {
    const docId = await createOne("messenger", {
      message: req.body.message,
      userId: req.body.userId
    }, res)



    const chatRef = doc(db, "chat", req.body.chatId)

    const getChatRef = await getDoc(chatRef)

    await updateDoc(chatRef, {
      messenger: [...getChatRef.data().messenger ? getChatRef.data().messenger : [], docId]
    })
    res.status(200).json({ success: true, message: 'created' })
  } catch (err) {
    console.log(err)
    res.status(200).json({ success: false, err })
  }
}
export const getRoom = async (req, res, next) => {

  try {
    const user = await getUser(res, req.query.userId)
    const chatRoom = Promise.all(user[0].chat.map(async (id, index) => {
      const chat = await getDoc(doc(db, 'chat', id))


      const friendId = chat.data().users.filter((userId) => userId !== req.query.userId)

      const friend = await getUser(res, friendId[0])

      const messenge = await getDoc(doc(db, 'messenger', chat.data().messenger[chat.data().messenger.length - 1]))

      return {
        query: id,
        name: friend[0] ? friend[0].displayName: "User",
        lastMessenge: messenge.data().message
      }
    }))
    res.status(200).json({ success: true, data: await chatRoom })


  } catch (err) {
    res.status(200).json({ success: false, err })
  }
}
