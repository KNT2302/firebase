import { Route, Routes } from 'react-router-dom'
import Nav from './component/nav/Nav'
import Home from './page/Home'
import Todo from './page/Todo'

function App() {

  return (
    <>

      <Routes>

          <Route element={<Home />} path="/" />
          <Route element={<Todo />} path="/todo" />

      </Routes>
    </>
  )
}

export default App
