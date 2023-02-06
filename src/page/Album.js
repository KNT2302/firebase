import React, { useEffect, useState } from 'react'
import { storage } from '../firebaseConfig'
import Page from '../component/Page'
import { listAll, ref } from 'firebase/storage'
import Photo from '../feature/album/Photo'
import Container from '../component/Container'
import AddNew from '../feature/album/AddNew'

const Album = () => {

  const [list, setList] = useState([])

  useEffect(() => {
    const listRef = ref(storage, 'images')

    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {

        const list = []
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        })
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          list.push(itemRef._location.path_)
          setList(list)
        })
      }).catch((error) => {
        // Uh-oh, an error occurred!
      })
  }, [])
  return (
    <Container>
      <div style={{ display: 'flex', flexWrap:'wrap', justifyContent:'center'}}>
        <div></div>
        <div style={{width:'100%', maxWidth:'375px'}}>
          <AddNew/>
        </div>
        <div style={{width:"100%", maxWidth:'375px'}}>
          <h1>My pictures</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap'}}>
            {list.map((path, index) => {
              return (
                <Photo key={index} path={path} />
              )

            })}

          </div>
        </div>

      </div>

    </Container>
  )
}

export default Album
