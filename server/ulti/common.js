import { collection, getDocs } from "firebase/firestore"
import { db } from "../app.js"

export const getAllDevice = async (res) => {

  const devices=[]
  try{
    const querySnapshot = await getDocs(collection(db, "devices"))
    
    querySnapshot.forEach((doc) => {
      devices.push(doc.data().currentToken)
    })

    return devices

  }catch(err){
    res.status(200).json({success:false, err})
  }
}
