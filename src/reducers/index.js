import { combineReducers } from "redux";
import { UserReducer } from "./user.red";
import { Cartreducer } from "./cart.red";
export const rootReducer=combineReducers({
    login:UserReducer,
    cart:Cartreducer
})