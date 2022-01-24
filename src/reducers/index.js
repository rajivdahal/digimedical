import { combineReducers } from "redux";
import { UserReducer } from "./user.red";
import { Cartreducer } from "./cart.red";
export const rootReducer=combineReducers({
    user:UserReducer,
    cart:Cartreducer
})