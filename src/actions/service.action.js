export const serviceBookingTypes={
    INTERNAL_SERVICE_BOOKING :"INTERNAL_SERVICE_BOOKING",
    EXTERNAL_SERVICE_BOOKING :"EXTERNAL_SERVICE_BOOKING",
    RESET_SERVICES_INFO:"RESET_SERVICES_INFO"
}

export const internalServiceBooking=(params)=>{
    console.log(params)
    return (dispatch)=>{

        // get service by id here ;

        dispatch({
            type:serviceBookingTypes.INTERNAL_SERVICE_BOOKING,
            payload: params
        })
    }
}

export const externalServiceBooking=(params)=>{
    return (dispatch)=>{
        dispatch({
            type:serviceBookingTypes.EXTERNAL_SERVICE_BOOKING,
            payload:params
        })
    }

}
export const resetServicesInfo=(params)=>{
    return(dispatch)=>{
        dispatch({
            type:serviceBookingTypes.RESET_SERVICES_INFO,
            payload:params
        })
    }
}