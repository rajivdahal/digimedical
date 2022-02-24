import { hospitalAppointmentBookingActionTypes } from "../actions/hospitalAppointmentBooking.ac"
export const hospitalAppointmentBookingReducer=(state,action)=>{
    switch (action.type) {
        case hospitalAppointmentBookingActionTypes.SET_IS_APPOINTMENT_FIXED:
            return{
                ...state,
                isAppointmentFixed:true,
            }
        case hospitalAppointmentBookingActionTypes.SET_IS_APPOINTMENT_METHOD:
            return{
                ...state,
                onlinePlatformForBooking:action.payload,
                isPaymentShown:true
            }
        default:
            return {
                ...state
            }
    }
}