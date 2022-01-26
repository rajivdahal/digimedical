export const medicalReportsActionTypes={
    SET_IS_MEDICAL_REPORTS_OPEN:"SET_IS_MEDICAL_REPORTS_OPEN",
    SET_IS_UTILS_INFO_OPEN:"SET_IS_uTILS_INFO_OPEN"
}

export const setMedicalReportOpen=(params)=>{
    return (dispatch)=>{
        dispatch({
            type:medicalReportsActionTypes.SET_IS_MEDICAL_REPORTS_OPEN,
            payload:params
        })
    }
}

export const setUtilsInfoOpen=(params)=>{
    return (dispatch)=>{
        dispatch({
            type:medicalReportsActionTypes.SET_IS_UTILS_INFO_OPEN,
            payload:params
        })
    }
}