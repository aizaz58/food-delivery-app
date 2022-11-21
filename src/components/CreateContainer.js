import React, { useState } from 'react'
import {motion } from "framer-motion"
import {MdAttachMoney, MdCloudUpload, MdDelete, MdFastfood, MdFoodBank} from "react-icons/md"
import { categories } from '../utils/data';
import Loader from './Loader';
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"
import { storage } from '../firebaseConfig';
import { getAllFoddItems, saveItem } from '../utils/FireBaseFunctions';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const CreateContainer = () => {
  
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progressBar, setprogressBar] = useState(0);
const [formData, setformData] = useState({
title:"",
calories:"",
Price:"",
category:null,
ImageAsset:null,
})
const [{foodItems},dispatch]=useStateValue()
  const uplaodImage=(e)=>{
    setIsLoading(true)
    const imageFile=e.target.files[0]
  const storageRef=ref(storage,`images/${Date.now()}-${imageFile.name}`)
  const uplaodTask=uploadBytesResumable(storageRef,imageFile)

  uplaodTask.on(
    "state_changed",(snapShot)=>{
      const bytesTransferred=(snapShot.bytesTransferred/snapShot.totalBytes)*100
      
      setprogressBar(bytesTransferred)
      console.log(progressBar)
    },(error)=>{
      setFields(true)
      setMsg(error)
      setAlertStatus("danger")
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 4000);
    },()=>{
      getDownloadURL(uplaodTask.snapshot.ref).then(downloadURL=>{
        setformData({...formData,ImageAsset:downloadURL})
        
        
        setIsLoading(false)
        setFields(true)
        setMsg("image uploaded successfully")
        setAlertStatus("success")
        setTimeout(() => {
          setFields(false)
        }, 4000);
        
      })
    }
  )
  }
const deleteImage=async()=>{
  setIsLoading(true)
  const deleteRef=ref(storage,formData.ImageAsset)
  await deleteObject(deleteRef)
setformData({...formData,ImageAsset:null})
 // setImageAsset(null)
  setformData(state=>({...state,ImageAsset:null}))
  setIsLoading(false)
  setFields(true)
  setMsg("image deleted Successfully")
  setAlertStatus("success")
  setTimeout(() => {
    setFields(false)
  }, 4000);
  
}

const saveDetails=(e)=>{
  e.preventDefault()
  setIsLoading(true)
  try {
    if(!formData.title|| !formData.Price||!formData.category||!formData.ImageAsset||!formData.calories){
      setFields(true)
    setMsg("Error:required fields must be filled.")
    setAlertStatus("danger")
    setTimeout(() => {
      setFields(false)
      setIsLoading(false)
    }, 4000);
    }else{
      const data={
        id:Date.now(),
        qty:1,
        ...formData
      }
      saveItem(data)
      setIsLoading(false)
      setFields(true)
      setMsg("Success:data uploaded successfully.")
      clearFormData()
      setAlertStatus("success")
      setTimeout(() => {
        setFields(false)
      }, 4000);
      
    }
  } catch (error) {
    setFields(true)
    setMsg(error)
    setAlertStatus("danger")
    setTimeout(() => {
      setFields(false)
      setIsLoading(false)
    }, 4000);
  }

  fetchData()

}
const clearFormData=()=>{

  setformData({
    title:"",
    calories:"",
    Price:"",
    category:null,
    ImageAsset:null,
  })
}

const fetchData=async()=>{
  await getAllFoddItems().then(data=>{
dispatch({
 type:actionType.SET_FOOD_ITEMS,
 foodItems:data
})
  })
  
}
  return (
    <section className='w-full h-auto flex items-center min-h-screen justify-center'>
    <form className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center gap-4 justify-center'>
{fields&&(
  <motion.p initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className={`w-full rounded-lg text-center text-lg font-semibold ${alertStatus==="danger"?"bg-red-400 text-red-800":"bg-emerald-400 text-emerald-800"}`}>{msg}</motion.p>
)}
<div className='flex items-center border-b w-full py-2 border-gray-300 gap-2'>
  <MdFastfood className='text-xl text-gray-700'/>
  <input type="text" required value={formData.title} onChange={(e)=>setformData({...formData,title:e.target.value})} placeholder="give me a title" className='w-full h-full bg-transparent placeholder:text-gray-400 outline-none border-none text-textColor' />
</div>
<div className='w-full'>
  <select className='w-full outline-none text-base border-b-2 border-r-gray-200 rounded-md cursor-pointer p-2' name="category" id="category" onChange={(e)=>setformData({...formData,category:e.target.value})}>
  <option value="" className='bg-white'>select a category</option>
  {categories && categories.map(category=>(
    <option className='text-base capitalize outline-none border-0 text-headingColor bg-white' key={category.id} value={category.urlParamName}>{category.name}</option>
  ))}
   </select>
</div>
<div className='flex flex-col items-center justify-center group border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg'>

{isLoading?<Loader/>:<div>

  {!formData.ImageAsset?(
    <label className='w-full flex flex-col items-center justify-center cursor-pointer'>
    <div className='w-full flex flex-col items-center justify-center gap-2'>
      <MdCloudUpload className='text-3xl text-gray-500 hover:text-gray-700'/>
      <p className='text-gray-500 hover:text-gray-700'>Click here to upload</p>
    </div>
    <input type="file" accept='image/*' onChange={uplaodImage} className="w-0 h-0" />

    </label>
  ):<div className='relative h-full'>
  <img src={formData.ImageAsset} alt="uploaded assest" className='w-full  h-225 md:h-420 object-cover' />
<button className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out' type='button' onClick={deleteImage}>
  <MdDelete className='text-white'/>
</button>
  </div>}
</div>}
</div>
<div className='flex flex-col md:flex-row w-full gap-3'>
<div className='flex items-center border-b w-full py-2 border-gray-300 gap-2'>
  <MdFoodBank className='text-xl text-gray-700'/>
  <input type="text" required value={formData.calories} onChange={(e)=>setformData({...formData,calories:e.target.value})} placeholder="calories" className='w-full h-full bg-transparent  placeholder:text-gray-400 outline-none border-none text-textColor' />
</div>

<div className='flex items-center border-b w-full py-2 border-gray-300 gap-2'>
  <MdAttachMoney className='text-xl text-gray-700'/>
  <input type="text" required value={formData.Price} onChange={(e)=>setformData({...formData,Price:e.target.value})
  } placeholder="price" className='w-full h-full bg-transparent  placeholder:text-gray-400 outline-none border-none text-textColor' />
</div>
</div>
<button className='text-white bg-emerald-500 rounded-lg w-full py-2 md:w-auto px-12 font-semibold text-lg border-none outline-none' onClick={saveDetails}>Save</button>
<div>

</div>
    </form>
    </section>
  )
}

export default CreateContainer