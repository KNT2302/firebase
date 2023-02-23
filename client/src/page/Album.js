import React, { useEffect, useState } from 'react'
import { db } from '../firebaseConfig'
import Container from '../component/Container'
import AddNew from '../feature/album/AddNew'
import { collection, getDocs } from "firebase/firestore"
import Loading from '../component/Loading'
import Tab from '../component/Tab'
import User from '../feature/album/User'
import Post from '../feature/album/Post'
import Message from '../feature/album/message/Message'
import useResponsive from '../ulti/hooks/reponsive'

const Album = () => {

  const nameTab = {
    "mine": "My photos",
    "publish": "Published photos"
  }

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


  const [list, setList] = useState([])
  const [tab, setTab] = useState("mine")
  const screenSize = useResponsive(getSizeScreen)

  const handleTab = (query) => {
    // console.log(query)
    // setTab(query)
  }

  const getList = async () => {
    const list = []
    const querySnapshot = await getDocs(collection(db, "posts"))
    querySnapshot.forEach((doc) => {
      list.push(doc.data())
    })
    setList(list)
  }

  const updateList = (photo) => {
    setList([...list, photo])
  }
  useEffect(() => {
    //     const listRef = ref(storage, 'images')
    // 
    //     // Find all the prefixes and items.
    //     listAll(listRef)
    //       .then((res) => {
    // 
    //         const list = []
    //         res.prefixes.forEach((folderRef) => {
    //           // All the prefixes under listRef.
    //           // You may call listAll() recursively on them.
    //         })
    //         res.items.forEach((itemRef) => {
    //           // All the items under listRef.
    //           list.push(itemRef._location.path_)
    //           setList(list)
    //         })
    //       }).catch((error) => {
    //         // Uh-oh, an error occurred!
    //       })
    getList()
  }, [])



  return (
    <Container>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: "1rem" }}>
        <div style={{ fontSize: '1.8rem', width: '100%', maxWidth: '375px', display:`${screenSize===sizeObj.BIG?'block':'flex'}`, gap:'.5em' }}>
          <AddNew updateList={updateList} />
          <User />
        </div>
        <div style={{ width: "100%", maxWidth: '375px' }}>
          <Tab listTab={[{ name: 'Mine', query: 'mine' }, { name: 'Publish', query: 'publish' }]} setTab={handleTab}>
            <div style={{ height: '30px' }}>
              <h1>{nameTab[tab]}</h1>
            </div>
            {list.length === 0 && <div style={{ fontSize: '1.8rem' }}>Getting photo list <span style={{ display: 'inline-block' }}><Loading /></span></div>}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {list.reverse().map((post) => {
                return (
                  <Post key={post.urlPhoto} path={post.urlPhoto} comment={post.comment} postId={post.postId} />
                )
              })}

            </div>

          </Tab>
        </div>
     

      


      </div>

    </Container>
  )
}

export default Album
