import React from 'react'
import HomeContainer from './HomeContainer'
import {motion } from "framer-motion"
import {MdChevronLeft,MdChevronRight} from  "react-icons/md"
import RowContainer from './RowContainer'
import { useScrollValue } from '../context/valueProvider'
import MenuContainer from './MenuContainer'
import CartContainer from './CartContainer'
import { useStateValue } from '../context/StateProvider'
const MainContainer = () => {
  const {setScrollValue} = useScrollValue()
  const [{cartShow},dispatch]=useStateValue()
  
  return (
    <div className='flex flex-col w-full h-auto items-center justify-center'>
      <HomeContainer/>
      <section className='w-full my-6'>
        <div className='w-full flex items-center justify-between'>
          <p className='font-semibold text-2xl capitalize text-headingColor relative before:absolute before:content before:rounded-lg before:w-32 before:h-1 before:-bottom-2 bbefore:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100'>our fresh & healthy fruits</p>
          <div className='hidden md:flex gap-3 items-center'>
            <motion.div onClick={()=>setScrollValue(-200)}  whileTap={{scale:0.75}}  className='w-8 h-8 bg-orange-300 hover:bg-orange-500 hover:shadow-lg cursor-pointer transition-all ease-in-out
             duration-100 rounded-lg items-center justify-center flex'>
              <MdChevronLeft className='text-white text-lg'/>
             </motion.div>
            <motion.div onClick={()=>setScrollValue(200)} whileTap={{scale:0.75}} className='w-8 h-8 bg-orange-300 hover:bg-orange-500 hover:shadow-lg cursor-pointer transition-all ease-in-out
             duration-100 rounded-lg items-center justify-center flex'>
              <MdChevronRight   className='text-white text-lg'/>
             </motion.div>
          </div>
        </div>
        <RowContainer filterKey="fruits" flag={true}/>
      </section>
      <MenuContainer/>
      {cartShow &&(

      <CartContainer/>
      )}
    </div>
  )
}

export default MainContainer