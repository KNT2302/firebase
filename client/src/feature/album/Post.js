import { getDownloadURL, ref } from 'firebase/storage'
import React from 'react'
import Picture from '../../component/Picture'
import { storage } from '../../firebaseConfig'
import Comment from './Comment'
import Like from './Like'
import Share from './Share'

const Post = ({ path, comment, postId }) => {


  const getSrc = async () => {
    try {
      const downloadURL = await getDownloadURL(ref(storage, path))
      return downloadURL

    } catch (e) {
      console.log(e)
    }

  }

  return (
    <figure style={{ width: '100%' }}>
      <div style={{ width: '100%', height: '250px', fontSize: '3rem' }}>
        <Picture getSrc={getSrc} />

      </div>
      <footer style={{ fontSize: '2rem' }}>
        <div style={{ height: '2em', display: 'flex', gap: '.5em' }}>

          <Like />

          <Comment comment={comment} postId={postId}/>

          <Share />

        </div>
      </footer>
    </figure>


  )
}

export default Post
