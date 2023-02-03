import React, { useEffect, useState } from 'react'
import { storage } from '../firebaseConfig'
import Page from '../component/Page'
import { listAll, ref } from 'firebase/storage'
import Photo from '../feature/album/Photo'

const Album = () => {

  const [list, setList] = useState([])

  useEffect(()=>{
    const listRef = ref(storage, 'images');

// Find all the prefixes and items.
listAll(listRef)
  .then((res) => {
    console.log(res)
    const list=[]
    res.prefixes.forEach((folderRef) => {
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
    });
    res.items.forEach((itemRef) => {
      // All the items under listRef.
      list.push(itemRef._location.path_)
      setList(list)
      console.log(list)
    });
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });
  },[])
  return (
    <Page>
      <h1>My photos</h1>
      <div style={{display:'flex'}}>
      {list.map((path,index)=>{
        return (
          <Photo key={index} path={path} />
        )

      })}

      </div>
    </Page>
  )
}

export default Album
