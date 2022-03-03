export const paymentPopupActionTypes = {
    SET_TRUE_TRIGGER:"SET_TRUE_TRIGGER",
    SET_FALSE_TRIGGER:"SET_FALSE_TRIGGER"
}

export const setOpenPopUp=(params)=>{
    return(dispatch)=>{
        dispatch({
            type:paymentPopupActionTypes.SET_TRUE_TRIGGER,
            payload:params
        })
    }
}
export const setClosePopUp=(params)=>{
    return(dispatch)=>{
        dispatch({
            type:paymentPopupActionTypes.SET_FALSE_TRIGGER,
            payload:params
        })
    }
}