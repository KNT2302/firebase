import { getDownloadURL, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { storage } from '../../firebaseConfig'

const Photo = ({path}) => {

  const [src, setSrc] = useState("")


  useEffect(()=>{
    getDownloadURL(ref(storage, path))
    .then((url) => {
      console.log(url)
      // `url` is the download URL for 'images/stars.jpg'
  
      // This can be downloaded directly:
      // const xhr = new XMLHttpRequest();
      // xhr.responseType = 'blob';
      // xhr.onload = (event) => {
      //   const blob = xhr.response;
      // };
      // xhr.open('GET', url);
      // xhr.send();
  
      // Or inserted into an <img> element
      // const img = document.getElementById('myimg');
      // img.setAttribute('src', url);
      setSrc(url)
    })
    .catch((error) => {
      console.log("error");
      // Handle any errors
    });

  },[])


  return (
    <div style={{width:'25%'}}>
      <img style={{width:'100%'}} src={src} alt={path} />
    </div>
  )
}

export default Photo
