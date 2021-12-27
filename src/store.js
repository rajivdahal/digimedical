import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

const middlewares = [thunk]
const initialState = {
    login:{
        username:'',
        email:'',
        isuserloginloading:false
    },
    cart:{
        allabtest:[],
        cartitems:[],
        cartnumber:null,
        cartvalue:localStorage.getItem("cartvalue")||0
    }
}
export const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares))