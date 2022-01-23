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
            // debugger
            console.log("cartvalues are", cartitems)
            let payload=action.payload
            // action.payload.map((item)=>{
            //     console.log("item in reducer is",item)
            //     cartitems.push(item)
            //     console.log("cartitem is",cartitems)
            // })

// {"cartvalue":2,"labs":
// [[   {"name":"Abnormal Hb Test","subcategory":"pcr test","company":"Apex Pharmaceuticals Pvt. Ltd.","price":"2000","labId":2,"medicalInstituteId":4},
//      {"name":"Abnormal Hb Test","subcategory":"abc","company":"OM hospital","price":"2000","labId":1,"medicalInstituteId":1}],
// [    {"name":"Abnormal Hb Test","subcategory":"pcr test","company":"Apex Pharmaceuticals Pvt. Ltd.","price":"2000","labId":2,"medicalInstituteId":4},
//      {"name":"Abnormal Hb Test","subcategory":"abc","company":"OM hospital","price":"2000","labId":1,"medicalInstituteId":1}]]}

            // cart.cartvalue = parseInt(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).cartvalue : "0") + 1
            // {"cartvalue":1,"labs":[[[{"price":"100","labId":4,"medicalInstituteId":1,"medicalname":"institute1","category":"labtest2`","subcategoryname":"lab4"},{"price":"1200","labId":1,"medicalInstituteId":1,"medicalname":"institute1","category":"labtest2`","subcategoryname":"lab1"},{"price":"1044","labId":3,"medicalInstituteId":3,"medicalname":"institute3","category":"labtest2`","subcategoryname":"lab3"}]]]}
            // [[{"cartvalue":1,"labs":[[{"price":"100","labId":4,"medicalInstituteId":1,"medicalname":"institute1","category":"labtest2`","subcategoryname":"lab4"},{"price":"1200","labId":1,"medicalInstituteId":1,"medicalname":"institute1","category":"labtest2`","subcategoryname":"lab1"}],
            // [[{"price":"100","labId":4,"medicalInstituteId":1,"medicalname":"institute1","category":"labtest2`","subcategoryname":"lab4"},{"price":"1200","labId":1,"medicalInstituteId":1,"medicalname":"institute1","category":"labtest2`","subcategoryname":"lab1"},{"price":"1044","labId":3,"medicalInstituteId":3,"medicalname":"institute3","category":"labtest2`","subcategoryname":"lab3"}]]
            // ]}
            let isinside=false
            let arrayinsidelabs=localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")).labs:[]
            let changedIndex=null
            let newarr=[]
            console.log("array inside labs is",arrayinsidelabs)
            payload.map((item,index)=>{
                console.log("inside map",item)
                if(cart.labs.length){
                            cart.labs.map((labItem,labIndex)=>{
                                labItem.map((labObject,labObjectIndex)=>{
                                    if(labObject.subcategoryname===item.subcategoryname){
                                        isinside=labObject.subcategoryname
                                    }
                                })
                                if(labIndex===cart.labs.length-1 && !isinside){
                                    arrayinsidelabs.map((labItem,labIndex)=>{
                                        if(labItem[0].category===item.category){
                                            arrayinsidelabs[labIndex].push(item)
                                            changedIndex=labIndex+1
                                        }
                                    })
                                    if(index==payload.length-1){
                                        console.log("inside olelelel")
                                        arrayinsidelabs.push(payload)
                                    }
                                }
                            })
                            // if(!isinside){
                            //     console.log("item is inside elseeee first elseee",item)
                            //     arrayinsidelabs.push(item)
                            //     cart.cartvalue=cart.cartvalue+1
                            //     console.log("array inside lab is",arrayinsidelabs)
                            // }
                }
                else{
                    console.log("item is inside elseeee",item)
                    arrayinsidelabs.push(item)
                    cart.cartvalue=1
                    console.log("array inside lab is",arrayinsidelabs)
                }
                // arrayinsidelabs.push(item)
            })
            if(changedIndex){
                console.log("cart lab before splice is",cart.labs)
                cart.labs.splice(changedIndex-1,1)
                console.log("cart lab after splice is",cart.labs)
                cart.labs=[]
                 arrayinsidelabs.map((item,index)=>{
                    cart.labs.push(item)
                      localStorage.setItem("cart", JSON.stringify(cart))
                })
            }
            else{
                console.log("cart before is",cart.labs)
                console.log("array inside labs is",arrayinsidelabs)
                cart.labs.push(arrayinsidelabs)
                console.log("caet after is",cart.labs)
                localStorage.setItem("cart", JSON.stringify(cart))
            }
            // if(arrayinsidelabs.length){

            //     notify.success("Added to cart");
            // }
            // else{
            //     notify.error(` ${isinside} is already in the cart`);
            // }
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
