import React, { useState } from "react";
import Logo from "../img/logo.png";
import {motion} from "framer-motion"
import avatar from "../img/avatar.png";
import { MdAdd, MdLogout, MdShoppingBasket } from "react-icons/md";
import {Link} from 'react-router-dom'

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from "../firebaseConfig"
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useScrollValue } from "../context/valueProvider";
const Header = () => {
const [isMenu, setisMenu] = useState(false)
  const fireBaseAuth=getAuth(app)
  const provider=new GoogleAuthProvider()
const[{user,cartItems},dispatch]=useStateValue()
const {showCart,basketref} = useScrollValue()



const logIn=async()=>{
  
    if(!user){
    const {user:{refreshToken,providerData}}=await signInWithPopup(fireBaseAuth,provider)
    dispatch({
      type:actionType.SET_USER,
      user:providerData[0]
    })
    localStorage.setItem("user",JSON.stringify(providerData[0]))
  }else{
    setisMenu(!isMenu)
  }
  
}  
  const logOut=()=>{
    setisMenu(!isMenu)
    localStorage.clear()
    dispatch({
      type:actionType.SET_USER,
      user:null
    })
  }
  return (
    <header className="w-screen z-50 fixed md:p-6 md:px-16 p-3 px-4 bg-primary">
      {/* for tablet */}
      <nav className="hidden md:flex w-full h-full items-center justify-between ">
        <Link to ={"/"} className="flex item-center gap-2">
          <img src={Logo} alt="logo" className="object-contain w-8"></img>
          <p className="text-headingColor font-bold text-xl">City</p>
        </Link>
        <div className="flex  gap-8 ">
         
          <motion.ul initial={{x:200,opacity:0}} animate={{x:0,opacity:1}} exit={{x:200,opacity:0}} className="flex items-center gap-8 ">
            <li className="text-base text-textColor cursor-pointer transition-all duration-100 ease-in-out hover:bg-slate-100">
              Home
            </li>
            <li className="text-base text-textColor cursor-pointer transition-all duration-100 ease-in-out hover:bg-slate-100">
              Menu
            </li>
            <li className="text-base text-textColor cursor-pointer transition-all duration-100 ease-in-out hover:bg-slate-100">
              About Us
            </li>
            <li className="text-base text-textColor cursor-pointer transition-all duration-100 ease-in-out hover:bg-slate-100">
              Service
            </li>
          </motion.ul>
          <div className="relative flex items-center justify-center cursor-pointer" ref={basketref} onClick={showCart}>
            <MdShoppingBasket className="text-textColor text-2xl " />
            {cartItems && cartItems.length >0 &&(

            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs font-semibold text-white">{cartItems.length}</p>
            </div>
            )}
          </div>
          <div className="relative">
          <motion.img whileTap={{scale:0.6}} onClick={logIn} src={user? user.photoURL?user.photoURL:avatar:avatar} className="cursor-pointer w-10 h-10 min-h-[2.5rem] min-w-[2.5rem] drop-shadow-xl rounded-full" alt="avatar"/>
{isMenu&&
          <motion.div initial={{opacity:0 ,scale:0.6}}animate={{opacity:1 ,scale:1}} exit={{opacity:0 ,scale:0.6}} className="w-40 bg-gray-50  flex flex-col shadow-lg rounded-lg absolute top-12 right-0">
          {user&&user.email==="hafizaizaz58@gmail.com" &&
          <Link to={"/createItem"}>
            <p onClick={()=>setisMenu(false)}  className="flex gap-3 items-center px-4 py-2 cursor-pointer transition-all ease-in-out duration-100 hover:bg-slate-100 text-textColor text-base">New Item <MdAdd/></p>

          </Link>
          }
            <p className="flex gap-3 items-center px-4 py-2 cursor-pointer transition-all ease-in-out duration-100 hover:bg-slate-100 text-textColor text-base" onClick={logOut}>logOut <MdLogout/></p>
          </motion.div>



}

          </div>
        </div>
      
      </nav>
      {/* for mobile */}
      <nav className="flex items-center justify-between md:hidden w-full h-full">
      <div className="relative flex items-center justify-center  " onClick={showCart} >
            <MdShoppingBasket className="text-textColor text-2xl " />
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs font-semibold text-white">{cartItems.length}</p>
            </div>
          </div>

      <Link to ={"/"} className="flex item-center gap-2">
          <img src={Logo} alt="logo" className="object-contain w-8"></img>
          <p className="text-headingColor font-bold text-xl">City</p>
        </Link>


        <div className="relative">
          <motion.img whileTap={{scale:0.6}} onClick={logIn} src={user? user.photoURL:avatar} className="cursor-pointer w-10 h-10 min-h-[2.5rem] min-w-[2.5rem] drop-shadow-xl rounded-full" alt="avatar"/>
{isMenu&&
          <motion.div initial={{opacity:0 ,scale:0.6}}animate={{opacity:1 ,scale:1}} exit={{opacity:0 ,scale:0.6}} className="w-40 bg-gray-50  flex flex-col shadow-lg rounded-lg absolute top-12 right-0">
          {user&&user.email==="hafizaizaz58@gmail.com" &&
          (<Link to={"/createItem"}>
            <p onClick={()=>setisMenu(false)} className="flex gap-3 items-center px-4 py-2 cursor-pointer transition-all ease-in-out duration-100 hover:bg-slate-200 text-textColor text-base">New Item <MdAdd/></p>

          </Link>)
          }

          <ul  className="flex flex-col  ">
            <li onClick={()=>setisMenu(false)}  className="text-base px-4 py-2 text-textColor hover:bg-slate-200 cursor-pointer transition-all duration-100 ease-in-out ">
              Home
            </li>
            <li onClick={()=>setisMenu(false)} className="text-base px-4 py-2 text-textColor cursor-pointer transition-all duration-100 ease-in-out hover:bg-slate-200">
              Menu
            </li>
            <li  onClick={()=>setisMenu(false)} className="text-base px-4 py-2 text-textColor cursor-pointer transition-all duration-100 ease-in-out hover:bg-slate-200">
              About Us
            </li>
            <li  onClick={()=>setisMenu(false)} className="text-base px-4 py-2 text-textColor cursor-pointer transition-all duration-100 ease-in-out hover:bg-slate-200">
              Service
            </li>
          </ul>

            <p className="flex gap-3 items-center justify-center m-2 shadow-md p-2 cursor-pointer transition-all ease-in-out duration-100 hover:bg-slate-300 text-textColor bg-gray-200  text-base" onClick={logOut}>logOut <MdLogout/></p>
          </motion.div>



}

          </div>
      </nav>
    </header>
  );
};

export default Header;
