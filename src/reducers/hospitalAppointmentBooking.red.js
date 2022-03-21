import { hospitalAppointmentBookingActionTypes } from "../actions/hospitalAppointmentBooking.ac"
export const hospitalAppointmentBookingReducer=(state,action)=>{
    console.log("reducer data is",action.payload)
    switch (action.type) {
        case hospitalAppointmentBookingActionTypes.SET_HOSPITAL_INFO:
            // console.log("inside hospital set doctor info condition reducer",state)
            return{
                ...state,
                hospitalInfo:action.payload
            }
        case hospitalAppointmentBookingActionTypes.SET_DOCTOR_INFO:
            return{
                ...state,
                doctorInfo:action.payload
            }
        case hospitalAppointmentBookingActionTypes.SET_IS_APPOINTMENT_FIXED:
            return{
                ...state,
                isAppointmentFixed:true,
                appointmentDate:action.payload.appointmentDate,
                appointmentTime:action.payload.appointmentTime,
                hospitalDoctorBookingIdAfterBooking:action.payload.data
            }
        case hospitalAppointmentBookingActionTypes.SET_IS_APPOINTMENT_METHOD:
            return{
                ...state,
                doctorPaymentType:action.payload,
            }
        case hospitalAppointmentBookingActionTypes.HOSPITAL_DOCTOR_PAYMENT_METHOD:
                return{
                    ...state,
                    doctorPaymentType:action.payload,
                    // isPaymentShown:true
                }
        case hospitalAppointmentBookingActionTypes.HOSPITAL_DOCTOR_SERVICE_SET:
                return{
                    ...state,
                    selectedHospitalDoctorService:action.payload,
                    // isPaymentShown:true
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
                doctorPaymentType:"online",
                isDoctorAppointmentLoading:false,
                selectedHospitalDoctorService:null,
                // hospitalInfo:null
            }
        default:
            return {
                ...state
            }
    }
}