import { getDownloadURL, ref } from 'firebase/storage'
import React from 'react'
import Picture from '../../component/Picture'
import { storage } from '../../firebaseConfig'
import useGetPathPictures from '../../ulti/hooks/getPathPictures'
import Comment from './Comment'
import Like from './Like'
import Share from './Share'

const Post = ({ path, comment, postId }) => {

  console.log(path)

  const { getPathPics } = useGetPathPictures(path)

  return (
    <figure style={{ width: '100%' }}>
      <div style={{ width: '100%', height: '250px', fontSize: '3rem' }}>
        <Picture getSrc={getPathPics} multiple={path.length > 0} />

      </div>
      <footer style={{ fontSize: '2rem' }}>
        <div style={{ height: '2em', display: 'flex', gap: '.5em' }}>

          <Like />

          <Comment comment={comment} postId={postId} />

          <Share />

        </div>
      </footer>
    </figure>


  )
}

export default Post
