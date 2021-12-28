import { cartActionTypes } from "../actions/cart.ac";
import { labtestActionTypes } from "../actions/cart.ac";

export const Cartreducer = (state, action) => {
    
    console.log("reducers atate is",state)
    console.log("action.type is",action.type,action.payload)
    switch (action.type) {
        case cartActionTypes.SET_IS_CART_ADDING:
            return {
                ...state,
                iscartadding: action.payload
            }
        case cartActionTypes.SET_IS_CART_ADDED:
            let cartitems=state.cartitems
            console.log("cartvalues are",cartitems)
            cartitems.push(action.payload)
            return {
                ...state,
                cartvalue:state.cartvalue+1,
                cartitems:[...cartitems]
            }
        case labtestActionTypes.SET_IS_LAB_TEST_FETCHED:
            return{
                ...state,
                allabtest:action.payload
            }   
        default:
            return {
                ...state
            }
    }
}