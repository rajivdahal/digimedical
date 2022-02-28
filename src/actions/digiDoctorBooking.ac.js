export const digiDoctorAppointmentBookingActionTypes={
    SET_IS_DIGI_DOCTOR_APPOINTMENT_FIXED:"SET_IS_DIGI_DOCTOR_APPOINTMENT_FIXED",
    SET_IS_DIGI_DOCTOR_APPOINTMENT_METHOD:"SET_IS_DIGI_DOCTOR_APPOINTMENT_METHOD",
    SET_DIGI_DOCTOR_INFO:"SET_DIGI_DOCTOR_INFO",
    RESET_DIGI_DOCTOR_INFO:"RESET_DIGI_DOCTOR_INFO",
    SET_DIGI_DOCTOR_SELECTED_SERVICE:"SET_DIGI_DOCTOR_SELECTED_SERVICE",
    SET_DIGI_DOCTOR_PAYMENT_TYPE:"SET_DIGI_DOCTOR_PAYMENT_TYPE"
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
    console.log("inside actions of digi doctor booking appointment fixing",params)
    return (dispatch)=>{
        dispatch({
            type:digiDoctorAppointmentBookingActionTypes.SET_IS_DIGI_DOCTOR_APPOINTMENT_FIXED,
            payload:params
        })
    }
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
