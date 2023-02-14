import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './component/Layout'
import Album from './page/Album'
import Home from './page/Home'
import Todo from './page/Todo'

function App() {

  

  return (
    <Layout>

      <Routes>

          <Route element={<Home />} path="/" />
          <Route element={<Todo />} path="/todo" />
          <Route element={<Album />} path="/album" />

      </Routes>
    </Layout>
  )
}

export default App
