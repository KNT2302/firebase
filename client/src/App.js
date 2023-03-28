import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './component/Layout'
import Slide from './component/Slide'
import TabClick from './component/tabClick/TabClick'
import Profile from './feature/profile/Profile'
import Album from './page/Album'
import Dashboard, { TabInner } from './page/Dashboard'
import Home from './page/Home'
import Todo from './page/Todo'


function App() {

  return (

    <Layout>

      <Routes>
        <Route exact element={<Home />} path="/" />
        <Route element={<Todo />} path="/todo" />
        <Route element={<Album />} path="/album" />
        <Route element={<Profile />} path="profile" />
        <Route element={<Slide />} path="slide" />
        <Route element={<Dashboard />} path="/dashboard/:tab">

        </Route>

      </Routes>
    </Layout>
  )
}

export default App
