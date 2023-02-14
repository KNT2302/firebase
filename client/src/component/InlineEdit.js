import { async } from '@firebase/util'
import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import Input from './Input'
import Loading from './Loading'





const InlineEdit = ({ key = "Display name", value = "My name" }) => {

  return (
    <div style={{ fontSize: '1em', width: '100%', display: 'flex', alignItems: 'center' }}>
      <div style={{color:'gray'}}>
        {key}
      </div>
      <EditField value={value} />

    </div>
  )
}
export default InlineEdit

const EditField = ({ value }) => {

  const [isUpdating, setIsUpdating] = useState(false)

  const refEdit = useRef(null)

  const upDateField = () => {

    setIsUpdating(true)
    setTimeout(() => {
      console.log("fi")
      setIsUpdating(false)
    }, 1500)


  }


  useEffect(() => {
    refEdit.current.value = value
    refEdit.current.addEventListener("blur", () => {
      upDateField()
    })
  }, [])
  return (
    <div style={{ fontSize: '1em', display: 'flex', alignItems: 'center' }}>

      <Input ref={refEdit} />
      {isUpdating && <Loading />}
      
    </div>
  )
}
