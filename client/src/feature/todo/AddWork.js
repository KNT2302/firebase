import { useState } from "react"
import { HiPlusCircle } from "react-icons/hi2"
import Button from "../../component/Button"
import WorkEdit from "./work/WorkEdit"

const AddWork = ({ todoList, setTodoList }) => {
  const stateDoObj = {
    ADD: 'add',
    EDIT: "edit"
  }
  const [addWork, setAddWork] = useState(false)


  const handleToggleAddWork = () => {
    setAddWork(!addWork)
  }
  return (
    <div style={{fontSize:'1.8rem'}}>
      {addWork && <WorkEdit handleToggleState={handleToggleAddWork} stateDo={stateDoObj.ADD} todoList={todoList} setTodoList={setTodoList} />}
      {!addWork &&
        <div style={{ position: 'absolute', top: 'calc(100% + 1rem)', right: '0%', fontSize:'2.5rem' }}>
          <Button type="button" name={<HiPlusCircle />} onClick={handleToggleAddWork} />
        </div>}

    </div>
  )
}

export default AddWork
