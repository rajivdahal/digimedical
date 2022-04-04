import { notify } from "../services/notify"
import { httpClient } from "../utils/httpClient"

export const digiDoctorAppointmentBookingActionTypes={
    SET_IS_DIGI_DOCTOR_APPOINTMENT_FIXED:"SET_IS_DIGI_DOCTOR_APPOINTMENT_FIXED",
    SET_IS_DIGI_DOCTOR_APPOINTMENT_METHOD:"SET_IS_DIGI_DOCTOR_APPOINTMENT_METHOD",
    SET_DIGI_DOCTOR_INFO:"SET_DIGI_DOCTOR_INFO",
    RESET_DIGI_DOCTOR_INFO:"RESET_DIGI_DOCTOR_INFO",
    SET_DIGI_DOCTOR_SELECTED_SERVICE:"SET_DIGI_DOCTOR_SELECTED_SERVICE",
    SET_DIGI_DOCTOR_PAYMENT_TYPE:"SET_DIGI_DOCTOR_PAYMENT_TYPE",
    SET_DIGI_DOCTOR_APPOINTMENT_BOOK_LOADING:"SET_DIGI_DOCTOR_APPOINTMENT_BOOK_LOADING",
    SET_DIGI_DOCTOR_APPOINTMENT_BOOK_NOT_LOADING:"SET_DIGI_DOCTOR_APPOINTMENT_BOOK_NOT_LOADING",
    INITIAL_BOOKING_API_CALLING:"INITIAL_BOOKING_API_CALLING"
}

export const digiDoctorInfo=(params)=>{
    return(dispatch)=>{
        dispatch({
            type:digiDoctorAppointmentBookingActionTypes.SET_DIGI_DOCTOR_INFO,
            payload:params
        })
    }
}

export const digiDoctorAppointmentFixed=(params)=>{
    // debugger
    // console.log("inside actions of digi doctor booking appointment fixing",params)

    if(params.origin!="digidoctorBooking" && params.origin!="corporate"){
        return (dispatch)=>{
            httpClient.POST("create-appointment",params,false,true)
            .then(resp=>{
                dispatch({
                    type:digiDoctorAppointmentBookingActionTypes.SET_IS_DIGI_DOCTOR_APPOINTMENT_FIXED,
                    payload:resp.data.data
                })
            })
            .catch(err=>{
                notify.error("Error in booking appointment")
            })
        }
    }
    if(params.origin==="corporate"){
        return (dispatch)=>{
            httpClient.POST("create-appointment/corporate",params,false,true)
            .then(resp=>{
                dispatch({
                    type:digiDoctorAppointmentBookingActionTypes.SET_IS_DIGI_DOCTOR_APPOINTMENT_FIXED,
                    payload:resp.data.data
                })
            })
            .catch(err=>{
                notify.error("Error in booking appointment")
            })
        }
    }
    return(dispatch)=> dispatch({
        type:digiDoctorAppointmentBookingActionTypes.SET_IS_DIGI_DOCTOR_APPOINTMENT_FIXED,
        payload:params.data
    })

}

export const digiDoctorAppointmentBookLoading=(params)=>{
    return (dispatch)=>{
        dispatch({
            type:digiDoctorAppointmentBookingActionTypes.SET_DIGI_DOCTOR_APPOINTMENT_BOOK_LOADING,
            payload:params
        })
    }
}
export const digiDoctorAppointmentBookNotLoading=(params)=>{
    return (dispatch)=>{
        dispatch({
            type:digiDoctorAppointmentBookingActionTypes.SET_DIGI_DOCTOR_APPOINTMENT_BOOK_NOT_LOADING,
            payload:params
        })
    }
}
export const callApiForInitialBooking=(params)=>{
    console.log("params in action are",params)

    // return (dispatch)=>{
    //     dispatch({
    //         type:digiDoctorAppointmentBookingActionTypes.INITIAL_BOOKING_API_CALLING,
    //         payload:params
    //     })
    // }
}
export const selectedService=(params)=>{
    return(dispatch)=>{
        dispatch({
            type:digiDoctorAppointmentBookingActionTypes.SET_DIGI_DOCTOR_SELECTED_SERVICE,
            payload:params
        })
    }
}
export const setPaymentType=(params)=>{

    return(dispatch)=>{
        dispatch({
            type:digiDoctorAppointmentBookingActionTypes.SET_DIGI_DOCTOR_PAYMENT_TYPE,
            payload:params
        })
    }
}

export const resetDigiDoctorState=(params)=>{
    return(dispatch)=>{
        dispatch({
            type:digiDoctorAppointmentBookingActionTypes.RESET_DIGI_DOCTOR_INFO,
            payload:params
        })
    }
}
