import React, { useEffect, useRef } from 'react'
import {MdOutlineKeyboardBackspace} from "react-icons/md"
import {RiRefreshFill} from "react-icons/ri"

import {motion} from "framer-motion"
import { useScrollValue } from '../context/valueProvider'
import EmptyCart from "../img/emptyCart.svg"
import { useStateValue } from '../context/StateProvider'
import CartItem from './CartItem'
import { actionType } from '../context/reducer'
const CartContainer = () => {
  const [{cartItems,user,Total,cartShow},dispatch]=useStateValue()
  const {showCart} = useScrollValue()
  

  const clearCart=()=>{
    dispatch({
      type:actionType.SET_CARTITEMS,
      cartItems:[]
    })
    localStorage.setItem("cartItems",JSON.stringify([]))
  }/* 
  useEffect(() => {

    const closeCart=(e)=>{
      console.log(e)
      if(e.path[0].tagName!=="path"){
        dispatch({
          type:actionType.SET_CART_SHOW,
          cartShow:!cartShow
  
      })
      }

    }
    document.body.addEventListener("click",closeCart)
  
    return () => {
      document.body.removeEventListener("click",closeCart)
    }
  }, []) */
  
  return (
    <motion.div initial={{opacity:0,x:200}} animate={{opacity:1,x:0}} exit={{opacity:0,x:200}} className='w-full fixed top-0 right-0 flex flex-col md:w-375 bg-white drop-shadow-md h-screen z-[101] backdrop-blur-3xl'>
      <div className='w-full flex items-center justify-between cursor-pointer p-4'>
      <motion.div whileTap={{scale:0.75}}  onClick={showCart} >

<MdOutlineKeyboardBackspace className='text-textColor text-3xl'/>
      </motion.div>
      <p className='text-textColor font-semibold text-lg'>Cart</p>
      <motion.p whileTap={{scale:0.75}} onClick={clearCart} className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-base text-textColor'>
        Clear <RiRefreshFill />{" "}
      </motion.p>
      </div>

      {cartItems && cartItems.length >0?(
      <div className='w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col'>
     

        <div className='w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none'>


        {cartItems&&cartItems.map(item=>(

          <CartItem key={item.id} item={item}/>
        ))}
        </div>
      

{/* total section*/}
<div className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2'>
<div className='w-full flex items-center justify-between'>
  <p className='text-gray-400 text-lg'>Sub total</p>
  <p className='text-gray-400 text-lg'>{Total}</p>
</div>
<div className='w-full flex items-center justify-between'>
  <p className='text-gray-400 text-lg'>Delivery</p>
  <p className='text-gray-400 text-lg'>2.5</p>
</div>

<div className='w-full border-b border-gray-400 my-2'></div>

<div className='w-full flex items-center justify-between'>
  <p className='text-gray-200 text-xl font-semibold'>Total</p>
  <p className='text-gray-200 text-xl font-semibold'>{Total + 2.5}</p>
</div>
{user?(
<motion.button className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 tetx-lg  my-2 hover:shadow-lg transition-all duration-100 ease-in-out">Check Out</motion.button>

):(

  <motion.button className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 tetx-lg  my-2 hover:shadow-lg transition-all duration-100 ease-in-out">login to CheckOut</motion.button>
)}
</div>
      </div>):(
        <div className='w-full h-full flex flex-col items-center justify-center gap-6'>
          <img src={EmptyCart} alt="noItems" className='w-300' />
          <p className='text-xl font-semibold text-textColor'>Add some items to cart</p>
        </div>
      )}
    </motion.div>
  )
}

export default CartContainer