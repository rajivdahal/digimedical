export const hospitalAppointmentBookingActionTypes={
    SET_IS_APPOINTMENT_FIXED:"SET_IS_APPOINTMENT_FIXED",
    SET_IS_APPOINTMENT_METHOD:"SET_IS_APPOINTMENT_METHOD",
    SET_DOCTOR_INFO:"SET_DOCTOR_INFO",
    RESET_HOSPITAL_DOCTOR_INFO:"RESET_HOSPITAL_DOCTOR_INFO"
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

export const resetHospitalDoctorState=(params)=>{
    return(dispatch)=>{
        dispatch({
            type:hospitalAppointmentBookingActionTypes.RESET_HOSPITAL_DOCTOR_INFO,
            payload:params
        })
    }
}