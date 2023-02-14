import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './component/Layout'
import Profile from './feature/profile/Profile'
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
          <Route element={<Profile />} path="profile" />

      </Routes>
    </Layout>
  )
}

export default App
