import React, { useEffect, useState } from 'react'
import { db, storage } from '../firebaseConfig'
import Page from '../component/Page'
import { listAll, ref } from 'firebase/storage'
import Photo from '../feature/album/Photo'
import Container from '../component/Container'
import AddNew from '../feature/album/AddNew'
import { collection, getDocs } from "firebase/firestore"; 

const Album = () => {

  const [list, setList] = useState([])


  const getList = async () => {
    const list = []
    const querySnapshot = await getDocs(collection(db, "photo"));
  querySnapshot.forEach((doc) => {
    list.push(doc.data().path);
  });
  setList(list)
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
      <div style={{ display: 'flex', flexWrap:'wrap', justifyContent:'center', gap:"1rem"}}>
        <div></div>
        <div style={{width:'100%', maxWidth:'375px'}}>
          <AddNew />
        </div>
        <div style={{width:"100%", maxWidth:'375px'}}>
          <div style={{height:'30px'}}>
          <h1>My pictures</h1>
          </div>
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
