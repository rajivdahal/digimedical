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
            var cart

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

            let cartitems = state.cartitems
            console.log("cartvalues are", cartitems)
            let payload=action.payload

            let isinside=false
            let arrayinsidelabs=localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")).labs:[]
            let changedIndex=null
            console.log("array inside labs is",arrayinsidelabs)
            payload.map((item,index)=>{
                console.log("inside map",item)
                if(cart.labs.length){
                            cart.labs.map((labItem,labIndex)=>{
                                labItem.map((labObject,labObjectIndex)=>{
                                    if(labObject.subcategoryname===item.subcategoryname){
                                        isinside=labObject.subcategoryname
                                        notify.error(labObject.subcategoryname+"has already been added")
                                    }
                                })
                                if(labIndex===cart.labs.length-1 && !isinside){
                                    arrayinsidelabs.map((labItem,labIndex)=>{
                                        if(labItem[0].category===item.category){
                                            arrayinsidelabs[labIndex].push(item)
                                            changedIndex=labIndex+1
                                        }
                                    })

                                }
                            })
                            if(index==payload.length-1 && !isinside && !changedIndex){
                                arrayinsidelabs.push(payload)
                            }
                }
                else{
                    arrayinsidelabs.push(item)
                    cart.cartvalue=1
                }
            })
            if(changedIndex){
                cart.labs.splice(changedIndex-1,1)
                cart.labs=[]
                 arrayinsidelabs.map((item,index)=>{
                    cart.labs.push(item)
                      localStorage.setItem("cart", JSON.stringify(cart))
                })
                notify.success("Added to cart")
            }
            else{
                if(!cart.labs.length){
                    cart.labs.push(arrayinsidelabs)
                }
                else{
                    cart.cartvalue=cart.cartvalue+1
                    cart.labs=arrayinsidelabs
                }
                if(!isinside){
                    localStorage.setItem("cart", JSON.stringify(cart))
                    notify.success("Added to cart")
                }
            }
            return {
                ...state,
                cartvalue: state.cartvalue + 1,
                cartitems: cartitems
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
