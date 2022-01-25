export const dashboardActionTypes = {
    SET_IS_DASHBOARD_OPEN: 'SET_IS_DASHBOARD_OPEN',
    SET_IS_DASHBOARD_CLOSE:'SET_IS_DASHBOARD_CLOSE',

}

export const dashboardOpen=(params)=>{
    return (dispatch)=>{
        dispatch({
            type:dashboardActionTypes.SET_IS_DASHBOARD_OPEN,
            payload:true
        })
    }
}
export const dashboardClose=params=>{
    return (dispatch)=>{
        dispatch({
            type:dashboardActionTypes.SET_IS_DASHBOARD_CLOSE,
            payload:false
        })
    }
}