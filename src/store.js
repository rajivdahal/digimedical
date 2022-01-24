import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
const middlewares = [thunk]

const initialState = {
    user:{
        profileImage:"",
        userId:null,
        isProfileChanged:false
    },
    cart:{
        allabtest:[],
        cartitems:[],
        cartnumber:null,
        cartvalue:parseInt(localStorage.getItem("cartvalue"))||0,
        tempdata:{
            totalamount:0
        },
        addtocartsignal:true,
        checkoutsignal:false,
        removeproductsign:true,
        cartpopupsign:false
    }
}
export const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares))