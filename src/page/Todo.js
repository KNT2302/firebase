import React, { useEffect, useRef, useState } from 'react'
import Page from '../component/Page'
import AddWork from '../feature/todo/AddWork'
import TodoList from '../feature/todo/List'

const Todo = () => {

  const [list, setList] = useState([{ name: 'Go to supermarket at 9 moring', id: '1' }])

  const listComp = useRef(null)


  const handleSetList = (value) => {
    setList(value)
  }


  return (
    <Page>
      <h1 style={{ textAlign: 'center' }}>Daily plan</h1>

      <div ref={listComp} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '600px', width: '100%', margin: '0 auto', position: 'relative', transition: '.15s' }}>
        <AddWork todoList={list} setTodoList={handleSetList} />
        <TodoList list={list} handleSetList={handleSetList} />
      </div>

    </Page>
  )
}

export default Todo
