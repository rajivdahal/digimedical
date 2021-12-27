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
        cartnumber:null
    }
}
export const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares))