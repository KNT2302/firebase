import React, { useEffect, useState } from 'react'
import Loading from '../../component/Loading'
import Tab from '../../component/Tab'
import axiosProvider from '../../ulti/axios'
import useGetUserId from '../../ulti/hooks/getUserId'
import useResponsive from '../../ulti/hooks/reponsive'
import AddNew from './AddNew'
import Post from './Post'
import User from './User'

const Home = () => {

  const sizeObj = {
    BIG: 'big',
    SMALL: 'small'
  }

  const getSizeScreen = (size) => {
    if (size >= 800) {
      return sizeObj.BIG
    }
    return sizeObj.SMALL
  }

  const nameTab = {
    "mine": "My photos",
    "publish": "Published photos"
  }




  const userId = useGetUserId()

  const { screenSize } = useResponsive(getSizeScreen)

  const [listMine, setListMine] = useState([])
  const [listPublish, setListPublish] = useState([])
  const [tab, setTab] = useState("mine")
  const [isLoading, setIsLoading] = useState(true)

  const handleTab = (query) => {
    console.log(query)
    setTab(query)
  }

  const getDataList = () => {
    if (tab === "mine") {
      return listMine
    } else {
      return listPublish
    }
  }

  const getList = async (query) => {
    setIsLoading(true)
    if (query === "mine") {
      const posts = await axiosProvider.get(`/api/post?userId=${userId}`)
      setListMine([...posts.data])
    } else {
      const posts = await axiosProvider.get(`/api/post`)
      const newData = posts.data.filter(post => !post.userId || post.userId !== userId)
      console.log(newData)
      setListPublish([...newData])
    }
    setIsLoading(false)
  }

  const updateList = (photo) => {
    setListMine([...listMine, photo])
  }
  useEffect(() => {
    if (!listMine.length || !listPublish.length) {
      getList(tab)
    }
  }, [tab])


  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: "1rem" }}>
      <div style={{ width: "100%", maxWidth: '375px' }}>

        <Tab>
          <div style={{ fontSize: '1.8rem', display: `${screenSize === sizeObj.BIG ? 'block' : 'flex'}`, gap: '.5em', paddingTop: `${screenSize === sizeObj.BIG ? "0" : '.5em'}` }}>
            <AddNew updateList={updateList} />
            <User />
          </div>
        </Tab>
      </div>

      <div style={{ width: "100%", maxWidth: '375px' }}>
        <Tab listTab={[{ name: 'Mine', query: 'mine' }, { name: 'Publish', query: 'publish' }]} setTab={handleTab}>
          <div style={{ fontSize: '1.5rem' }}>
            <h1>{nameTab[tab]}</h1>
          </div>
          {isLoading ? <div style={{ fontSize: '1.8rem' }}>Getting photo list <span style={{ display: 'inline-block' }}><Loading /></span></div> :
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {getDataList().reverse().map((post) => {
                return (
                  <Post key={post.urlPhoto} path={post.urlPhoto} comment={post.comment} postId={post.postId} />
                )
              })}
            </div>}
        </Tab>
      </div>
    </div>
  )
}

export default Home
