
import { db } from "../app.js"
import { collection, addDoc } from "firebase/firestore";
import { getAllUsers } from "../ulti/common.js"


export const create = async (req,res,next) => {
  try{
    const {userId, currentToken, urlPhoto, displayName} = req.body

    const docRef = await addDoc(collection(db,"users"),{
      userId:  req.body.userId,
      currentToken:  req.body.currentToken, 
      urlPhoto:  req.body.photoURL,
      displayName:  req.body.displayName,
      lastSignIn:  req.body.lastSignIn,
    })

    res.status(200).json({success: true, data:"dvd"})
  }catch(error){
    res.status(200).json({success:false, error})
  }
}

export const get = async (req,res,next) => {
  try{
   const users = await getAllUsers(res)

   res.status(200).json({success:true,data:users})
  }catch(error){

    res.status(200).json({success:false, error})
  }
}






