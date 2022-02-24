export const digiDoctorAppointmentBookingActionTypes={
    SET_IS_APPOINTMENT_FIXED:"SET_IS_APPOINTMENT_FIXED",
    SET_IS_APPOINTMENT_METHOD:"SET_IS_APPOINTMENT_METHOD",
    SET_DOCTOR_INFO:"SET_DOCTOR_INFO"
}

export const digiDoctorAppointmentFixed=(params)=>{
    console.log("inside actions",params)
    return (dispatch)=>{
        dispatch({
            type:digiDoctorAppointmentBookingActionTypes.SET_IS_APPOINTMENT_FIXED,
            payload:params
        })
    }
}