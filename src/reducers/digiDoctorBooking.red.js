import { digiDoctorAppointmentBookingActionTypes } from "../actions/digiDoctorBooking.ac"
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
                digiDoctorAppointmentDate:action.payload.date,
                digiDoctorAppointmentTime:action.payload.time,
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
                digiDoctorAppointmentDate:"",
                digiDoctorAppointmentTime:"",
                digiDoctorInfo:null,
                selectedService:null

            }

        default:
            return {
                ...state
            }
    }
}