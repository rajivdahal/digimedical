import { hospitalAppointmentBookingActionTypes } from "../actions/hospitalAppointmentBooking.ac"
export const hospitalAppointmentBookingReducer=(state,action)=>{
    // debugger
    console.log("reducer data is",action.payload)
    switch (action.type) {
        case hospitalAppointmentBookingActionTypes.SET_DOCTOR_INFO:
            console.log("inside hospital set doctor info condition reducer",state)
            return{
                ...state,
                doctorInfo:action.payload
            }
        case hospitalAppointmentBookingActionTypes.SET_IS_APPOINTMENT_FIXED:
            return{
                ...state,
                isAppointmentFixed:true,
                appointmentDate:action.payload.date,
                appointmentTime:action.payload.time,
            }
        case hospitalAppointmentBookingActionTypes.SET_IS_APPOINTMENT_METHOD:
            return{
                ...state,
                onlinePlatformForBooking:action.payload,
                isPaymentShown:true
            }
        case hospitalAppointmentBookingActionTypes.RESET_HOSPITAL_DOCTOR_INFO:
            return{
                ...state,
                appointmentBookingPopUp:false,
                doctorInfo:null,
                isDoctorInfoAdded:false,
                appointmentDate:"",
                appointmentTime:"",
                isAppointmentFixed:false,
                onlinePlatformForBooking:"",
            }
        default:
            return {
                ...state
            }
    }
}