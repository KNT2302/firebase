import { getDownloadURL, ref } from 'firebase/storage'
import React from 'react'
import Picture from '../../component/Picture'
import { storage } from '../../firebaseConfig'

const Photo = ({ path }) => {

  const getSrc = async () => {
    const downloadURL = await getDownloadURL(ref(storage, path))

    return downloadURL
  }

  return (

<div style={{ width: '100%', height: '250px' }}>
      <Picture getSrc={getSrc} />
    </div>

    
  )
}

export default Photo
