import { combineReducers } from "redux";
import { UserReducer } from "./user.red";
import { Cartreducer } from "./cart.red";
import { SidebarReducer } from "./sidebar.red";
import { medicalReportsReducer } from "./medicalReports.red";
import { hospitalAppointmentBookingReducer } from "./hospitalAppointmentBooking.red";
import { digiDoctorAppointmentBookingReducer } from "./digiDoctorBooking.red";
export const rootReducer=combineReducers({
    user:UserReducer,
    cart:Cartreducer,
    sidebar:SidebarReducer,
    medicalReports:medicalReportsReducer,
    appointmentBooking:hospitalAppointmentBookingReducer,
    digiDoctorAppointmentBooking:digiDoctorAppointmentBookingReducer


})