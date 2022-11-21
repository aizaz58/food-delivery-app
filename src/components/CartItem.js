import React, { useEffect } from 'react'
import {motion} from "framer-motion"
import {BiMinus ,BiPlus} from "react-icons/bi"
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

const CartItem = ({item}) => {
   
  
    const [{cartItems},dispatch]=useStateValue()
   
let items=[]
    const updateCart = () => {
        dispatch({
          type: actionType.SET_CARTITEMS,
          cartItems: items
        })
        dispatch({
          type:actionType.SET_TOTAL
        })
        localStorage.setItem("cartItems", JSON.stringify(items))
      }
    const updateQty=(action,id)=>{
        if(action==="add"){
          
        cartItems.map((item) => {
            if (item.id === id) {
              item.qty += 1;

            }
          });
         
         
        updateCart()

        }
        if(action==="remove"){
          if(item.qty===1){
          
          items=cartItems.filter(item=>(
              item.id!==id
           ))
        
           updateCart()
           
          }else{
           
            cartItems.map((item)=>{
              if(item.id===id){
                  item.qty-=1

              }

          })
      updateCart()
          }
        }
    }
    useEffect(() => {
   items=cartItems
    }, [items])
   
    
  return (
    <div className='w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2'>
            <img src={item.ImageAsset} alt="cartotem" className='w-20 h-20 max-w-[60px] rounded-full object-contain' />

            <div className='flex flex-col gap-2'>
              <p className='text-base text-gray-50'>{item.title}</p>
              <p className='text-sm text-gray-300 font-semibold block'>{item.Price*item.qty}</p>
            </div>

            <div className='group flex items-center gap-2 cursor-pointer ml-auto'>
<motion.div whileTap={{scale:0.75}} onClick={()=>updateQty("remove",item?.id)} >
<BiMinus className='text-gray-50'/>
</motion.div>
<p className='w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center'>{item.qty}</p>
<motion.div whileTap={{scale:0.75}} onClick={()=>updateQty("add",item?.id)} >
<BiPlus className='text-gray-50'/>
</motion.div>
            </div>
          </div>

  )
}

export default CartItem