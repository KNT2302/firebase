import Work from "./work/Work"

const TodoList = ({list, handleSetList}) => {
  return (
    list.map((todo) => {
      return (
        <Work id={todo.id} todoList={list} setTodoList={handleSetList} name={todo.name} key={todo.id} />
      )
    })
  )
}

export default TodoList
