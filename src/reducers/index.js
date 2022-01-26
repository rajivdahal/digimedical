import { combineReducers } from "redux";
import { UserReducer } from "./user.red";
import { Cartreducer } from "./cart.red";
import { SidebarReducer } from "./sidebar.red";
import { medicalReportsReducer } from "./medicalReports.red";
export const rootReducer=combineReducers({
    user:UserReducer,
    cart:Cartreducer,
    sidebar:SidebarReducer,
    medicalReports:medicalReportsReducer
})