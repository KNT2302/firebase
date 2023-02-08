import { getDownloadURL, ref } from 'firebase/storage'
import React from 'react'
import Button from '../../component/Button'
import Picture from '../../component/Picture'
import { storage } from '../../firebaseConfig'
import Like from './Like'

const Photo = ({ path }) => {

  const getSrc = async () => {
    const downloadURL = await getDownloadURL(ref(storage, path))

    return downloadURL
  }

  return (
    <figure style={{ width: '100%' }}>
      <div style={{ width: '100%', height: '250px', fontSize: '3rem' }}>
        <Picture getSrc={getSrc} />

      </div>
      <footer style={{ fontSize: '2rem' }}>
        <div style={{ height: '2em', display: 'flex', justifyContent: 'space-between' }}>

          <Like />

          <Button type="button" name="Comment" />

          <Button type="button" name="Share" />

        </div>
      </footer>
    </figure>


  )
}

export default Photo