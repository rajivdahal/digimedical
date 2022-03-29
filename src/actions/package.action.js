export const packageBookingTypes={
    INTERNAL_PACKAGE_BOOKING :"INTERNAL_PACKAGE_BOOKING",
    RESET_PACKAGE_INFO:"RESET_PACKAGE_INFO"
}

export const internalPackageBooking=(params)=>{
    console.log("payment action")
    console.log(params)
    return (dispatch)=>{
        dispatch({
            type:packageBookingTypes.INTERNAL_PACKAGE_BOOKING,
            payload:params
        })
    }

}
export const resetPackageInfo=(params)=>{
    return(dispatch)=>{
        dispatch({
            type:packageBookingTypes.RESET_PACKAGE_INFO,
            payload:params
        })
    }
}