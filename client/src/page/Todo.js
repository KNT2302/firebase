import React, { useEffect, useRef, useState } from 'react'
import Container from '../component/Container'
import Page from '../component/Page'
import AddWork from '../feature/todo/AddWork'
import TodoList from '../feature/todo/List'
import Mission from '../feature/todo/mission/Mission'

const Todo = () => {

  const [list, setList] = useState([{ name: 'Go to supermarket at 9 moring', id: '1' }])

  const listComp = useRef(null)


  const handleSetList = (value) => {
    setList(value)
  }


  return (
    <Container>
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>

        <div style={{ flex: '1' }}>
          <h1 style={{ textAlign: 'center' }}>Daily plan</h1>
          <div ref={listComp} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '600px', width: '100%', margin: '0 auto', position: 'relative', transition: '.15s' }}>
            <AddWork todoList={list} setTodoList={handleSetList} />
            <TodoList list={list} handleSetList={handleSetList} />
          </div>
        </div>

        <div style={{ fontSize: '1.8rem', paddingBlock: '1rem', margin: '0 auto', width: '100%', flex: '1' }}>
          <Mission />
        </div>

      </div>



    </Container>
  )
}

export default Todo
