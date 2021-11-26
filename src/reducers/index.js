import { combineReducers } from "redux";
import { UserReducer } from "./user.red";
export const rootReducer=combineReducers({
    login:UserReducer,
})