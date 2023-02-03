import { useEffect, useRef } from "react"
import Button from "../../../component/Button"
import Input from "../../../component/Input"

const WorkEdit = ({ id, name, handleToggleState, stateDo, todoList, setTodoList }) => {
  const stateDoObj = {
    ADD: 'add',
    EDIT: "edit"
  }
  const workInputRef = useRef(null)
  const workRef = useRef(null)

  const handleSave = () => {
    if (workInputRef.current.value) {
      if (stateDo === stateDoObj.ADD) {

        const newTodo = {
          id: todoList.length + 1,
          name: workInputRef.current.value
        }
        setTodoList([newTodo, ...todoList])
      } else {
        const indexTodo = todoList.findIndex((todo) => todo.id === id)
        console.log(indexTodo)
        const newTodoList = todoList
        newTodoList[indexTodo].name = workInputRef.current.value
        setTodoList([...newTodoList])
      }
    }
    handleUnmount()
    handleToggleState()
    }
  
  useEffect(() => {
    workInputRef.current.value = name ? name : ""
    workInputRef.current.focus()
    workRef.current.style.opacity="1"
  }, [])

  const handleUnmount = () => {
    workRef.current.style.opacity = "0"
    setTimeout(()=>{},150)
  }

  return (
    <div ref={workRef} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: "space-between", flexWrap:'wrap', opacity:'0',transition:'.15s' }}>
      <Input ref={workInputRef} type="text"/>
      <div style={{ display: 'flex', gap: '2rem', fontSize:'1.8rem' }}>
        <Button name="Save" onClick={handleSave} />
        <Button name="Cancle" onClick={handleToggleState} />
      </div>
    </div>
  )
}

export default WorkEdit
