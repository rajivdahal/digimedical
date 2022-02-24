export const hospitalAppointmentBookingActionTypes={
    SET_IS_APPOINTMENT_FIXED:"SET_IS_APPOINTMENT_FIXED",
    SET_IS_APPOINTMENT_METHOD:"SET_IS_APPOINTMENT_METHOD"
}

export const appointmentFixed=(params)=>{
    return (dispatch)=>{
        dispatch({
            type:hospitalAppointmentBookingActionTypes.SET_IS_APPOINTMENT_FIXED,
            payload:true
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