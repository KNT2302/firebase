import Work from "./work/Work"

const TodoList = ({ list, handleSetList }) => {
  return (
    <div style={{flex:'1'}}>
      {
        list.map((todo) => {
          return (
            <Work id={todo.id} todoList={list} setTodoList={handleSetList} name={todo.name} key={todo.id} />
          )
        })
      }
    </div>
  )
}

export default TodoList
