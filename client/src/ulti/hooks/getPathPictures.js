import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../firebaseConfig'

const useGetPathPictures =(paths) => {


  const getPathPic = (path) => {
    return new Promise(async (resolve) => {
      try {
        const downloadURL = await getDownloadURL(ref(storage, path))
        resolve(downloadURL)
      } catch (e) {
        console.log(e)
      }
    })
  }

  const getPathPics = async () => {
    const pathUrls = await Promise.all(paths.map((path) => {
      return getPathPic(path)
    }))
    return pathUrls
  }



  return {
    getPathPics
  }

}

export default useGetPathPictures
