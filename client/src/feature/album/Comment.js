import React, { useRef, useState } from 'react'
import Popup from '../../component/Popup'
import { VscComment } from "react-icons/vsc"
import Input from '../../component/Input'
import Button from '../../component/Button'

const data = [
  {
    id: 'qwe',
    text: 'sd sdv',
    reply: [
      {
        id: 'rty',
        text: 'cv bhn',
        reply: [{
          id: 'vdf',
          text: 'gh nhm',
          reply: []
        }]
      },
      {
        id: 'svb',
        text: 'cv bhn',
        reply: [{
          id: 'njy',
          text: 'gh nhm',
          reply: []
        }]
      }
    ]
  },
  {
    id: 'jkn',
    text: 'vf bgt',
    reply: [
      {
        id: 'dfb',
        text: 'cd vbn',
        reply: [{
          id: 'rty',
          text: 'ty uik',
          reply: []
        }]
      }
    ]
  },
  {
    id: 'xcz',
    text: 'nb nbv',
    reply: [
      {
        id: 'gfn',
        text: 'qw vfd',
        reply: [{
          id: 'efg',
          text: 'cd zsd',
          reply: []
        }]
      }
    ]
  },
  {
    id: 'cvf',
    text: 'bn hyu',
    reply: [
      {
        id: 'ujm',
        text: 'po lkm',
        reply: []
      }
    ]
  },
  {
    id: 'fdb',
    text: 'hn qef',
    reply: [
      {
        id: 'mjk',
        text: 'lk tmj',
        reply: []
      }
    ]
  },
]

const AddComment = ({ addComment }) => {

  const textRef = useRef(null)
  const doAdd = async () => {
    const data = {
      id: "rov",
      text: textRef.current.value,
      reply: []
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

const ReplyComment = ({ updateComment, idComment }) => {
  const replyRef = useRef(null)
  const getChildren = (handleClosePopup) => {

    const sendReply = () => {
      const reply = {
        id: 'vmn',
        text: replyRef.current.value,
        reply: []
      }
      updateComment(reply)
      handleClosePopup()
    }
    return (
      <div style={{ background: 'lightgreen' }}>

        <Input ref={replyRef} type="text" name="Reply" />
        <Button type='button' name="Send" onClick={sendReply} />
      </div>
    )
  }
  return (
    <div>
      <Popup name="Reply" getChildren={getChildren} />

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
    <div style={{ position: 'relative' }}>
      <p>{data.text}</p>
      <ReplyComment updateComment={updateComment} idComment={data.id} />

      {data.reply.length > 0 && !readMore && <Button type="button" name="Read more" onClick={() => { setReadMore(true) }} />}
      {readMore && <>
        <div style={{ marginLeft: "1em", borderLeft: '1px solid gray', paddingLeft: '.5em' }}>
          {data.reply.length > 0 &&
            data.reply.map((reply) => {
              return (
                <ItemComment key={reply.id} comment={reply} />
              )
            })
          }

        </div>
      </>}

    </div>
  )
}

const Comment = () => {
  const [list, setList] = useState(() => data)

  const addComment = (comment) => {
    return new Promise(async (resolve) => {
      setTimeout(() => {
        setList([...list, comment])
        resolve("added")
      }, 1000)


    })
  }
  const getChildren = (handleClosePopup) => {
    return (
      <div>
        <div style={{ width: '400px', maxHeight: '500px', position: 'relative', padding: '0 1em', overflowY: 'auto' }}>
          {list.map((comment) => {
            return (
              <ItemComment key={comment.id} comment={comment} />
            )
          })}

        </div>
        <AddComment addComment={addComment} />
      </div>

    )

  }
  return (
    <Popup name={<VscComment />} getChildren={getChildren} />
  )
}

export default Comment
