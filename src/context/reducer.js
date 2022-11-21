
export const actionType={
    SET_USER:"SET_USER",
    SET_FOOD_ITEMS:"SET_FOOD_ITEMS",
    SET_CART_SHOW:"SET_CART_SHOW",
    SET_CARTITEMS:"SET_CARTITEMS",
    SET_TOTAL:"SET_TOTAL"}
   
const reducer=(state,action)=>{
switch (action.type) {
    case actionType.SET_USER:
        return {
            ...state,user:action.user
        }
        case actionType.SET_FOOD_ITEMS:
        return {
            ...state,foodItems:action.foodItems
        }
    case actionType.SET_CART_SHOW:
        return{
            ...state,cartShow:action.cartShow
        }
        case actionType.SET_CARTITEMS:
            return{
                ...state,cartItems:action.cartItems
            }
case actionType.SET_TOTAL:
   
    let total = 0;
   state.cartItems.forEach(element => {
        
        total+=element.qty * element.Price
    });
    return{
        ...state,Total:total
    }

   
           
              
        
    default:
    return state
}
}

export default reducer