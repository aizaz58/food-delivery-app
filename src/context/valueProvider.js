import { createContext, useState,useContext, useRef } from "react";
import { actionType } from "./reducer";
import { useStateValue } from "./StateProvider";

 export const ValueContext=createContext()

 export const ScrollProvider=({children})=>{
    const [{cartShow},dispatch]=useStateValue()
    const [scrollValue, setScrollValue] = useState(0)
    const basketref = useRef()
   
    const [filter, setfilter] = useState("chicken")
const showCart=()=>{
    dispatch({
        type:actionType.SET_CART_SHOW,
        cartShow:!cartShow

    })
}

    return(
   
    <ValueContext.Provider value={{scrollValue,setScrollValue,filter,setfilter,showCart,basketref}}>
        {children}
    </ValueContext.Provider>
 )}

 export const useScrollValue=()=>useContext(ValueContext)