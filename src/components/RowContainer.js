import React, { useRef, useEffect, useState } from 'react'
import { MdShoppingBasket } from "react-icons/md"
import NotFound from "../img/NotFound.svg"
import { motion } from "framer-motion"
import { useStateValue } from '../context/StateProvider'
import { useScrollValue } from '../context/valueProvider'
import { actionType } from '../context/reducer'
const RowContainer = ({ flag, filterKey }) => {
  const [{ foodItems, cartItems }, dispatch] = useStateValue()
  const { scrollValue} = useScrollValue()
  const [items, setitems] = useState([])
  const fruitsItems = foodItems?.filter((n) => n.category === filterKey)

  const rowContainer = useRef()
 
  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue
  }, [scrollValue])


  const addTocart = (newItem) => {




    const itemIndex=cartItems.findIndex(item=>item.id===newItem.id)
    if (itemIndex >=0) {
  
   cartItems[itemIndex].qty+=1
      setitems([...cartItems])
      updateCart()
  
    }else{
setitems([...cartItems,newItem])
    }

  


    
    
  }

  const updateCart=()=>{
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items
    })
    dispatch({
      type:actionType.SET_TOTAL
    })
    
     localStorage.setItem("cartItems", JSON.stringify(items))
  }

  useEffect(() => {
    updateCart()
  }, [items])


  
  return (
    <div ref={rowContainer} className={`w-full my-12 flex scroll-smooth gap-3 bg-rowBg ${flag ? " overflow-x-scroll scrollbar-none" : "overflow-x-hidden flex-wrap justify-center"}`}>
      {fruitsItems && fruitsItems.length > 0 ? (fruitsItems.map(item => (
        <div key={item.id} className='w-275 min-w-[275px] my-12 md:w-300 md:min-w-[300px] h-[175px] bg-cardOverlay rounded-lg p-2 hover:drop-shadow-lg backdrop-blur-lg flex items-center justify-between'>
          <div className='flex items-center justify-between w-full'>
            <motion.div whileHover={{ scale: 1.2 }} className='w-40 h-40 -mt-8 drop-shadow-2xl'>

              <img src={item.ImageAsset} alt={item.title} className='w-full h-full object-contain' />
            </motion.div>
            <motion.div whileTap={{ scale: 0.75 }} className='w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:shadow-md bg-red-600' onClick={()=>addTocart(item)}>
              <MdShoppingBasket className='text-white text-lg' />
            </motion.div>
          </div>

          <div className='flex w-full items-end justify-end flex-col'>
            <p className='text-textColor font-semibold md:text-lg text-base'>
              {item.title}
            </p>
            <p className='mt-1 text-sm text-gray-500'>{item.calories}</p>
            <div className='flex items-center gap-8'>
              <p className='text-lg text-headingColor font-semibold'>
                <span className='font-sm text-red-500'>$</span>{item.Price}
              </p>
            </div>
          </div>
        </div>


      ))) : (
        <div className='w-full  flex flex-col gap-4 items-center justify-center'>
          <img src={NotFound} className=" h-320" alt="not found" />
          <p className='text-xl font-semibold text-headingColor my-2'>Items not Available</p>
        </div>
      )}
    </div>
  )
}

export default RowContainer