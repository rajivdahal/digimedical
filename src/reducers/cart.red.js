import { cartActionTypes } from "../actions/cart.ac";
import { labtestActionTypes } from "../actions/cart.ac";
import { notify } from "../services/notify";

export const Cartreducer = (state, action) => {
    console.log("reducers atate is", state)
    console.log("action.type is", action.type, action.payload)
    switch (action.type) {
        case cartActionTypes.SET_IS_CART_ADDING:
            return {
                ...state,
                iscartadding: action.payload
            }
        case cartActionTypes.SET_IS_CART_ADDED:
            console.log("inside reducer and payload is",action.payload)
            let cart
            if (!localStorage.getItem("cart")) {
                cart = {
                    cartvalue: 0,
                    labs: []
                }
            }
            else {
                cart = JSON.parse(localStorage.getItem("cart"))
            }
            console.log("cart is",cart)
            // let cartitems = state.cartitems
            // console.log("cartvalues are", cartitems)
            let payload=action.payload
            let isInside=false
            if(cart.labs.length){
                // debugger
                console.log("inside if condition,cart.labs.length")
                cart.labs.map((item,index)=>{
                    item.map((itemIndividual,itemIndividualIndex)=>{
                        payload.map((payloadItem,payloadItemIndex)=>{
                            if(payloadItem.id===itemIndividual.id){
                                isInside=payloadItem.id
                                // payload.splice(payloadItemIndex,1)
                                notify.error(`${payloadItem.labcategoryname} is already in the cart`)
                            }
                        })
                    })
                 if(index==cart.labs.length-1 && !isInside){
                     if(!action.payload.length){
                         notify.error("Please select some items")
                         return
                     }
                    cart.labs.push(payload)
                   cart.cartvalue=cart.cartvalue+1
                    notify.success("Added to cart")
                 }
                })
            }
           else{

               if(action.payload.length){
                cart.labs.push(payload)
                cart.cartvalue=cart.cartvalue+1
                notify.success("Added to cart")
               }
               else{
                   notify.error("Please select some items   ")
               }
           }

            console.log("cart after updating is",cart)
            localStorage.setItem("cart",JSON.stringify(cart))
            return {
                ...state,
                cartvalue: state.cartvalue + 1,
            }
        case labtestActionTypes.SET_IS_LAB_TEST_FETCHED:
            return {
                ...state,
                allabtest: action.payload
            }
        case labtestActionTypes.SET_IS_LAB_TEST_SET:
            return {
                ...state,
                allabtest: action.payload
            }
        case labtestActionTypes.SET_TEMP_TOTAL:

            return {
                ...state,
                tempdata: {
                    totalamount: action.payload
                }
            }
        case labtestActionTypes.CLEAR_TEMP_TOTAL:
            return {
                ...state,
                tempdata: {
                    totalamount: action.payload
                }
            }
        case labtestActionTypes.SET_RESET_CHECKBOX:
            let allabtest = state.allabtest.map((item, index) => {
                if (index == action.payload.categoryindex) {
                    item.subcategory.map((item, index) => {
                        if (index == action.payload.subcategoryindex) {
                            item.checked = action.payload.checked
                        }
                    })
                }
                return item
            })
            return {
                ...state,
                allabtest: allabtest
            }
        case labtestActionTypes.ADD_TO_CART_SIGNAL:
            return {
                ...state,
                addtocartsignal: action.payload
            }
        case labtestActionTypes.CHECKOUT:
            return {
                ...state,
                checkoutsignal: action.payload
            }
        case labtestActionTypes.REMOVE_PRODUCT_STATUS:
            return {
                ...state,
                removeproductsign: action.payload
            }
        case labtestActionTypes.REMOVE_PRODUCT:
            let data = action.payload
            return {
                ...state
            }
        case labtestActionTypes.CART_POP_UP:

            return {
                ...state,
                cartpopupsign:action.payload
            }

        default:
            return {
                ...state
            }
    }
}
