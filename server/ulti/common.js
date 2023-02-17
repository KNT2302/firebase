import { collection, getDocs } from "firebase/firestore"
import { db } from "../app.js"

export const getAllUsers = async (res) => {

  const devices=[]
  try{
    const querySnapshot = await getDocs(collection(db, "users"))
    
    querySnapshot.forEach((doc) => {
      devices.push(doc.data())
    })

    return devices

  }catch(err){
    res.status(200).json({success:false, err})
  }
}
