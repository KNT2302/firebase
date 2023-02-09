import React, { useState } from 'react'
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
          id: 'rty',
          text: 'gh nhm',
          reply: []
        }]
      },
      {
        id: 'rty',
        text: 'cv bhn',
        reply: [{
          id: 'rty',
          text: 'gh nhm',
          reply: []
        }]
      }
    ]
  },
  {
    id: 'rty',
    text: 'vf bgt',
    reply: [
      {
        id: 'rty',
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
        id: 'rty',
        text: 'qw vfd',
        reply: [{
          id: 'rty',
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
        id: 'rty',
        text: 'po lkm',
        reply: []
      }
    ]
  },
]

const AddComment = () => {
  return (
    <div style={{ position: 'absolute', top: '100%', left: '0%', width: '100%', background: 'lightpink' }}>
      <Input type="text" name="comment" />
      <Button type="button" name="Add" />
    </div>
  )
}
const ItemComment = ({ comment, handleReply }) => {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex' }}>
        <p>{comment.text}</p>
        <Button type="button" name="reply" onClick={handleReply} />
      </div>
      {
        comment.reply.length > 0 &&
        <div style={{ padding: '.25em', position: 'absolute', borderLeft: '1px solid gray', borderBottom: '1px solid gray' }}>

        </div>
      }
      <div style={{ transform: 'translateX(calc(0% + 1em))' }}>
        {comment.reply.length > 0 &&
          comment.reply.map((reply) => {
            return (
              <ItemComment key={reply.id} comment={reply} />
            )
          })
        }

      </div>
    </div>
  )
}

const Comment = () => {

  const [reply, setReply] = useState(false)
  const handleReply = () => {
    setReply(true)
  }

  const getChildren = (handleClosePopup) => {
    return (
      <div style={{ width: '400px', maxHeight: '500px', position: 'relative' }}>
        {data.map((comment) => {
          return (
            <ItemComment key={comment.id} comment={comment} handleReply={handleReply} />
          )
        })}
        {
          reply && <AddComment />
        }

      </div>
    )

  }
  return (
    <Popup name={<VscComment />} getChildren={getChildren} />
  )
}

export default Comment
