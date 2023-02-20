import { async } from '@firebase/util'
import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import Input from './Input'
import Loading from './Loading'





const Inline = ({ keyName = "Display name", value = "My name", canEdit }) => {

  return (
    <div style={{ fontSize: '1em', width: '100%', display: 'flex', gap: '.5em' }}>
      <div style={{ color: 'gray', lineHeight: '1em' }}>
        {keyName}
      </div>
      <div style={{ fontSize: '2rem' }}>
        {canEdit ? <EditField value={value} /> : <div style={{ lineHeight: '1em' }}>{value}</div>}
      </div>

    </div>
  )
}
export default Inline

const EditField = ({ value }) => {

  const [isUpdating, setIsUpdating] = useState(false)
  const [isExpand, setIsExpand] = useState(false)

  const refEdit = useRef(null)



  const upDateField = () => {
    setIsUpdating(true)
    setTimeout(() => {
      setIsUpdating(false)
      expandField()
    }, 1500)


  }

  const expandField = () => {
    setIsExpand(!isExpand)
  }


  return (
    <div >

      <div style={{ wordBreak: 'break-all', lineHeight: '1em', height: `${isExpand ? isUpdating ? "calc(100% - 1em)" : '100%' : '1em'}`, overflow: 'hidden', transition: '.3s' }} ref={refEdit} onFocus={expandField} onBlur={upDateField} contentEditable={!isUpdating} suppressContentEditableWarning={true}>
        {value}
        <div style={{display:'inline-block'}}>
          {isUpdating && <Loading />}
        </div>
      </div>


    </div>
  )
}
