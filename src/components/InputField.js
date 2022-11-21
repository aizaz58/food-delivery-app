import React from 'react'
import {MdAttachMoney, MdCloudUpload, MdDelete, MdFastfood, MdFoodBank} from "react-icons/md"

const InputField = ({changeHandler,placeHolder, IconName,value}) => {
  const iconp=React.createElement(IconName,{},"")
  console.log(iconp)
  return (
    <div className='flex items-center border-b w-full py-2 border-gray-300 gap-2'>
  <IconName/>
  <input type="text" required value={value} onChange={changeHandler} placeholder={placeHolder} className='w-full h-full bg-transparent font-semibold placeholder:text-gray-400 outline-none border-none text-textColor' />
</div>

  )
}

export default InputField