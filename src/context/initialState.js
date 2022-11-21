import { fetchCart, fetchUser } from "../utils/fetchLocalStorage"

const userInfo=fetchUser()
const cartInfo =fetchCart()
export  const InitialState={
    user:userInfo,
    foodItems:null,
    cartShow:false,
    cartItems:cartInfo,
    Total:0,
    Quantity:1
}
