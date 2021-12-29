import { cartActionTypes } from "../actions/cart.ac";
import { labtestActionTypes } from "../actions/cart.ac";

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
            let cartitems = state.cartitems
            console.log("cartvalues are", cartitems)
            cartitems.push(action.payload)
            if (!localStorage.getItem("cart")) {
                var cart = {
                    cartvalue: 0,
                    labs: []
                }
            }
            else {
                var cart = JSON.parse(localStorage.getItem("cart"))
            }

            cart.cartvalue = parseInt(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).cartvalue : "0") + 1
            cart.labs.push(action.payload)
            localStorage.setItem("cart", JSON.stringify(cart))
            return {
                ...state,
                cartvalue: state.cartvalue + 1,
                cartitems: [...cartitems]
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
            // console.log("action payload is",action.payload)
            return {
                ...state,
                tempdata: {
                    totalamount: action.payload
                }
            }
        case labtestActionTypes.CLEAR_TEMP_TOTAL:
            // console.log("action payload is",action.payload)
            return {
                ...state,
                tempdata: {
                    totalamount: action.payload
                }
            }
        case labtestActionTypes.SET_RESET_CHECKBOX:
            // console.log("action payload is",action.payload)
            console.log("payload in reducers>>>>>>", action.payload)
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
            // console.log("action payload is",action.payload)
            return {
                ...state,
                addtocartsignal: action.payload
            }
        case labtestActionTypes.CHECKOUT:
            console.log("checkout triggered>>>>>>>>>>>>>>>>>", action.payload)
            return {
                ...state,
                checkoutsignal: action.payload
            }
        case labtestActionTypes.REMOVE_PRODUCT_STATUS:
            console.log("inside removeproduct statuss reducer", action.payload)
            return {
                ...state,
                removeproductsign: action.payload
            }
        case labtestActionTypes.REMOVE_PRODUCT:
            let data = action.payload
            console.log("data in remove product reducers are", data)

            return {
                ...state
                // removeproductstatus: action.payload
            }
        case labtestActionTypes.CART_POP_UP:
           console.log("data is",action.payload)
           if(data.payload==true){
            return {
                ...state,
                cartpopupsign:false
            }
           }
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
