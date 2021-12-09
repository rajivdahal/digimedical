export const userActionTypes = {
    SET_IS_LOGIN_LOADING: 'SET_IS_LOGIN_LOADING',
    USER_LOGGED_IN: 'USER_LOGGED_IN',
}

export const loginuser=params=>{
    // console.log("at action file inc data is>>",params)
    return(dispatch)=>{
        dispatch({
            type:userActionTypes.SET_IS_LOGIN_LOADING,
            payload:true
        })
        dispatch({
            type:userActionTypes.USER_LOGGED_IN,
            payload:params
        })
        //http call
        //TODO
        dispatch({
            type:userActionTypes.SET_IS_LOGIN_LOADING,
            payload:false
        })
    }
}