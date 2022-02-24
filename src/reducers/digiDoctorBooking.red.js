import { digiDoctorAppointmentBookingActionTypes } from "../actions/digiDoctorBooking.ac"
export const digiDoctorAppointmentBookingReducer=(state,action)=>{
    console.log("reducer data is",action.payload)
    switch (action.type) {
        case digiDoctorAppointmentBookingActionTypes.SET_DOCTOR_INFO:
            console.log("inside appointment condition",state)
            return{
                ...state,
                doctorInfo:action.payload
            }
        case digiDoctorAppointmentBookingActionTypes.SET_IS_APPOINTMENT_FIXED:
            return{
                ...state,
                isAppointmentFixed:true,
                appointmentDate:action.payload.date,
                appointmentTime:action.payload.time,
            }
        case digiDoctorAppointmentBookingActionTypes.SET_IS_APPOINTMENT_METHOD:
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