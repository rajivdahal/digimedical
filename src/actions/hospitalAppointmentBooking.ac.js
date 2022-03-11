export const hospitalAppointmentBookingActionTypes={
    SET_HOSPITAL_INFO:"SET_HOSPITAL_INFO",
    SET_IS_APPOINTMENT_FIXED:"SET_IS_APPOINTMENT_FIXED",
    SET_IS_APPOINTMENT_METHOD:"SET_IS_APPOINTMENT_METHOD",
    SET_DOCTOR_INFO:"SET_DOCTOR_INFO",
    RESET_HOSPITAL_DOCTOR_INFO:"RESET_HOSPITAL_DOCTOR_INFO",
    HOSPITAL_DOCTOR_PAYMENT_METHOD:"HOSPITAL_DOCTOR_PAYMENT_METHOD",
    HOSPITAL_DOCTOR_SERVICE_SET:"HOSPITAL_DOCTOR_SERVICE_SET"
}

export const setHospitalInfo=(params)=>{
    // console.log("inside hospital's doctor booking setting information",params)
    return(dispatch)=>{
        dispatch({
            type:hospitalAppointmentBookingActionTypes.SET_HOSPITAL_INFO,
            payload:params
        })
    }
}

export const setDoctorInfo=(params)=>{
    console.log("inside hospital's doctor booking setting information",params)
    return(dispatch)=>{
        dispatch({
            type:hospitalAppointmentBookingActionTypes.SET_DOCTOR_INFO,
            payload:params
        })
    }
}
export const appointmentFixed=(params)=>{
    console.log("inside actions",params)
    return (dispatch)=>{
        dispatch({
            type:hospitalAppointmentBookingActionTypes.SET_IS_APPOINTMENT_FIXED,
            payload:params
        })
    }
}

export const selectAppointmentMethod=(params)=>{
    console.log("params is",params)
    return (dispatch)=>{
        dispatch({
            type:hospitalAppointmentBookingActionTypes.SET_IS_APPOINTMENT_METHOD,
            payload:params
        })
    }
}
export const selectHospitalDoctorPaymentMethod=(params)=>{
    console.log("params is",params)
    return (dispatch)=>{
        dispatch({
            type:hospitalAppointmentBookingActionTypes.HOSPITAL_DOCTOR_PAYMENT_METHOD,
            payload:params
        })
    }
}
export const setHospitalDoctorService=(params)=>{
    console.log("params is",params)
    return (dispatch)=>{
        dispatch({
            type:hospitalAppointmentBookingActionTypes.HOSPITAL_DOCTOR_SERVICE_SET,
            payload:params
        })
    }
}

export const resetHospitalDoctorState=(params)=>{
    return(dispatch)=>{
        dispatch({
            type:hospitalAppointmentBookingActionTypes.RESET_HOSPITAL_DOCTOR_INFO,
            payload:params
        })
    }
}