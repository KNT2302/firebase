import React, { useEffect, useRef, useState } from 'react'
import Button from '../component/Button'
import Layout from '../component/Layout'
import { HiPlusCircle, HiChevronDown, HiOutlinePencil, HiOutlineArchiveBoxXMark } from "react-icons/hi2"
import Input from '../component/Input'

const Work = ({ name, edit }) => {

  const stateValue = useRef({
    READ: "read",
    EDIT: 'edit',
  })



  const [state, setState] = useState(() => !edit ? stateValue.current.READ : stateValue.current.EDIT)

  const handleToggleState = () => {
    if (state === stateValue.current.READ) {
      setState(stateValue.current.EDIT)
    }
    else {
      setState(stateValue.current.READ)
    }
  }

  return (
    <>
      {state === stateValue.current.READ ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p>{name}</p>
        <div style={{ display: 'flex', gap: '3px' }}>
          <Button type="button" name={<HiChevronDown />} />
          <Button type="button" name={<HiOutlinePencil />} onClick={handleToggleState} />
          <Button type="button" name={<HiOutlineArchiveBoxXMark />} />
        </div>
      </div> : <><WorkEdit name={name} handleToggleState={handleToggleState} /></>}

    </>

  )
}

const WorkEdit = ({ name, handleToggleState }) => {
  const workRef = useRef(null)

  const handleSave = () => {

  }
  useEffect(() => {
    workRef.current.value = name
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: "space-between" }}>
      <Input ref={workRef} type="text" name="To do" />
      <div style={{ display: 'flex', gap: '3px' }}>
        <Button name="Save" />
        <Button name="Cancle" onClick={handleToggleState} />
      </div>
    </div>
  )
}

const Todo = () => {

  const [list, setList] = useState([{ name: 'Have to do', id: '1' }])
  const handleNewWork = () => {
    return new Promise((resolve) => {
      setList([{ name: "", id: list.length + 1 }, ...list])
      resolve(handleSave())
    })
  }

  const handleSave = (id, value) => {
    return new Promise((resolve) => {
      const newList = [...list]
      newList[id].name = value
      resolve(setList(newList))
    })
  }
  return (
    <Layout>
      <h1>sdvdv</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '600px', width: '100%', margin: '0 auto', position: 'relative' }}>
        {
          list.map((todo) => {
            return (
              (todo.name ? <Work name={todo.name} key={todo.id} /> : <Work edit name={todo.name} key={todo.id} />)

            )
          })
        }

        <div style={{ position: 'absolute', bottom: 'calc(0% - 10px)', right: '0%', transform: 'translateY(calc(100%)' }}>
          <Button type="button" name={<HiPlusCircle />} onClick={handleNewWork} />
        </div>
      </div>

    </Layout>
  )
}

export default Todo
