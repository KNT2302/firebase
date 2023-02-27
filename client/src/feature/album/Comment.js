import React, { useEffect, useRef, useState } from 'react'
import Popup from '../../component/Popup'
import { VscComment } from "react-icons/vsc"
import Input from '../../component/Input'
import Button from '../../component/Button'
import axiosProvider from '../../ulti/axios'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebaseConfig'

const AddComment = ({ addComment, comment, postId }) => {

  const textRef = useRef(null)
  const doAdd = async () => {


    const response = await axiosProvider.post("/api/comment", {}, { text: textRef.current.value, postId, comment: comment ? comment : [] })

    const data = {
      text: textRef.current.value,
      reply: [],
      commentId: response.data.commentId
    }

    await addComment(data)

    textRef.current.value = ""
  }
  return (
    <div style={{ width: '100%', background: 'lightpink', padding: '0 1em' }}>
      <Input ref={textRef} type="text" name="comment" />
      <Button type="button" name="Add" onClick={doAdd} />
    </div>
  )
}

const ReplyComment = ({ updateComment, commentId, reply }) => {
  const replyRef = useRef(null)
  const [isOpenRep, setIsOpenRep] = useState(false)
  const getChildren = () => {

    const sendReply = async () => {


      const replies = reply.map((item) => item.commentId)

      const response = await axiosProvider.post("/api/comment", {}, { commentId, reply: replies, text: replyRef.current.value })
      const newReply = {
        text: replyRef.current.value,
        reply: [],
        commentId: response.data.commentId
      }
      updateComment(newReply)
      setIsOpenRep(!isOpenRep)

    }
    return (
      <div>
        <Button name="Reply" onClick={()=>{setIsOpenRep(!isOpenRep)}} />
        {isOpenRep && <>

          <Input ref={replyRef} type="text" />
          <Button type='button' name="Send" onClick={sendReply} />
        </>}
      </div>
    )
  }
  return (
    <div>
      {/* <Popup name="Reply" getChildren={getChildren} /> */}
      {getChildren()}
    </div>
  )
}
const ItemComment = ({ comment }) => {
  const [data, setData] = useState(() => comment)
  const [readMore, setReadMore] = useState(false)

  const updateComment = (reply) => {
    data.reply.push(reply)
    setData({ ...data })
    setReadMore(true)
  }

  return (
    <div style={{paddingBottom:'.5em'}}>
      <p>{data.text}</p>
      <ReplyComment updateComment={updateComment} reply={data.reply} commentId={data.commentId} />

      {data.reply.length > 0 && !readMore && <Button type="button" name="Read more" onClick={() => { setReadMore(true) }} />}
      {readMore && <>
        <div style={{ marginLeft: "1em", borderLeft: '1px solid gray', paddingLeft: '.5em', }}>
          {data.reply.length > 0 &&
            data.reply.map((reply) => {
              return (
                <ItemComment key={reply.commentId} comment={reply} />
              )
            })
          }

        </div>
      </>}

    </div>
  )
}

const Comment = ({ comment, postId }) => {
  const [list, setList] = useState([])

  useEffect(() => {

    const fetchData = async () => {
      const response = await axiosProvider.get(`/api/comment?reply=${comment ? JSON.stringify(comment) : JSON.stringify([])}`, {})

      if (response.success) {
        setList([...list, ...response.data])
      } else {
        setList([])
      }
    }
    fetchData()

  }, [])

  const addComment = (newComment) => {
    return new Promise(async (resolve) => {
      setTimeout(() => {
        setList([...list, newComment])
        resolve("added")
      }, 1000)


    })
  }


  const GetChildren = (handleClosePopup) => {

    return (
      <div style={{ height: '100%'}}>
        <div style={{ width: '100%', height: '50vh', padding: '0 1em', overflowY: 'auto' }}>
          {list.map((comment) => {
            return (
              <ItemComment key={comment.commentId} comment={comment} />
            )
          })}

        </div>
        <AddComment addComment={addComment} comment={comment} postId={postId} />
      </div>

    )

  }
  return (
    <Popup name={<VscComment />} getChildren={GetChildren} position={{ top: '0' }} />
  )
}

export default Comment
