import { useRef, useState } from "react"
import { HiChevronDown, HiOutlineArchiveBoxXMark, HiOutlinePencil } from "react-icons/hi2"
import Button from "../../../component/Button"
import WorkEdit from "./WorkEdit"


const Work = ({ id, name, edit, handleSave, todoList, setTodoList }) => {

  const stateValue = useRef({
    READ: "read",
    EDIT: 'edit',
    COMPLETE: 'complete'
  })

  const [state, setState] = useState(() => !edit ? stateValue.current.READ : stateValue.current.EDIT)

  const [isHover, setIsHover] = useState(false)
  const handleToggleState = () => {
    if (state === stateValue.current.READ) {
      setState(stateValue.current.EDIT)
    }
    else {
      setState(stateValue.current.READ)
    }
  }

  const handleDeleteWork = (id) => {
    const newList = todoList.filter((todo) => todo.id !== id)
    setTodoList([...newList])
  }

  const handleToggleComplete = () => {
    console.log(state)
    if (state === stateValue.current.COMPLETE) {
      setState(stateValue.current.READ)
    } else {
      setState(stateValue.current.COMPLETE)
    }
  }

  return (
    <>
      {state === stateValue.current.READ || state === stateValue.current.COMPLETE ? <div onMouseEnter={() => { setIsHover(true) }} onMouseLeave={() => { setIsHover(false) }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', flexWrap: 'wrap' }}>
        <p style={{ fontSize: '1.8rem', textDecoration: `${state === stateValue.current.COMPLETE ? "line-through" : "none"}` }}>{name}</p>
        <div style={{ display: 'flex', gap: '2rem', opacity: `${isHover ? '1' : '0'}`, transition: '.15s', fontSize:'2rem' }}>
          <Button type="button" name={<HiChevronDown />} onClick={handleToggleComplete} />
          <div style={{ gap: '2rem', display: `${state === stateValue.current.READ ? 'flex' : 'none'}` }}>
            <Button type="button" name={<HiOutlinePencil />} onClick={handleToggleState} />
            <Button type="button" name={<HiOutlineArchiveBoxXMark />} onClick={() => handleDeleteWork(id)} />
          </div>

        </div>

      </div> : <><WorkEdit id={id} name={name} todoList={todoList} setTodoList={setTodoList} handleToggleState={handleToggleState} handleSave={handleSave} /></>}

    </>

  )
}

export default Work
