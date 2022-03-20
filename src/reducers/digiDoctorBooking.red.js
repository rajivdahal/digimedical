import { digiDoctorAppointmentBookingActionTypes } from "../actions/digiDoctorBooking.ac"
import { notify } from "../services/notify"
import { httpClient } from "../utils/httpClient"
export const digiDoctorAppointmentBookingReducer=(state,action)=>{
    console.log("reducer data is from digi doctor part",action.payload)
    switch (action.type) {
        case digiDoctorAppointmentBookingActionTypes.SET_DIGI_DOCTOR_INFO:
            console.log("inside digi doctor set doctor info",state)
            return{
                ...state,
                digiDoctorInfo:action.payload
            }

        case digiDoctorAppointmentBookingActionTypes.SET_IS_DIGI_DOCTOR_APPOINTMENT_FIXED:
            return{
                ...state,
                isDigiDoctorAppointmentFixed:true,
                digiDoctorBookingIdAfterBooking:action.payload,
                isLoadingAppointmentBooking:false
            }
        case digiDoctorAppointmentBookingActionTypes.SET_DIGI_DOCTOR_APPOINT_FIXED_EMAIL_ALREADY_EXISTS:
            return{
                ...state,
                emailAlreadyExistsMessage:action.payload
            }
        case digiDoctorAppointmentBookingActionTypes.SET_DIGI_DOCTOR_APPOINTMENT_BOOK_LOADING:
                return{
                    ...state,
                    isLoadingAppointmentBooking:true
                }
        case digiDoctorAppointmentBookingActionTypes.SET_DIGI_DOCTOR_APPOINTMENT_BOOK_NOT_LOADING:
                    return{
                        ...state,
                        isLoadingAppointmentBooking:false
                    }
        case digiDoctorAppointmentBookingActionTypes.INITIAL_BOOKING_API_CALLING:
                    return{
                        ...state,
                        digiDoctorBookingIdAfterBooking:action.payload
                    }
        case digiDoctorAppointmentBookingActionTypes.SET_DIGI_DOCTOR_SELECTED_SERVICE:
            return{
                ...state,
                selectedService:action.payload
                  }
        case digiDoctorAppointmentBookingActionTypes.SET_DIGI_DOCTOR_PAYMENT_TYPE:
            return{
               ...state,
               digiDoctorPaymentType:action.payload
                }
        case digiDoctorAppointmentBookingActionTypes.RESET_DIGI_DOCTOR_INFO:
            return{
                ...state,
                isDigiDoctorAppointmentFixed:false,
                isLoadingAppointmentBooking:false,
                digiDoctorAppointmentDate:"",
                digiDoctorAppointmentTime:"",
                digiDoctorInfo:null,
                digiDoctorPaymentType:"online",
                selectedService:null,
                digiDoctorBookingIdAfterBooking:null,
            }

        default:
            return {
                ...state
            }
    }
}