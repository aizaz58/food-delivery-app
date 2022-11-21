//saving foodItems in firestore

import { addDoc, collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore"
import { fireStore } from "../firebaseConfig"


export const saveItem=async(data)=>{
    //for adding id yourself
//await setDoc(doc(fireStore,"foodItems",`${Date.now()}`),data,{merge:true})

//for adding id from firebase
await addDoc(collection(fireStore,"foodItems"),data,{merge:true})
}

export const getAllFoddItems=async()=>{
    const items=await getDocs(query(collection(fireStore,"foodItems"),orderBy("id","desc")))
    return (items.docs.map(doc=>(doc.data())))
}