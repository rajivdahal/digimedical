import { medicalReportsActionTypes } from "../actions/medicalReports.ac";

export const medicalReportsReducer=(state,action)=>{
    switch (action.type) {
        case medicalReportsActionTypes.SET_IS_MEDICAL_REPORTS_OPEN:
            return{
                ...state,
                reports:true,
                utilsInfo:false
            }
        case medicalReportsActionTypes.SET_IS_UTILS_INFO_OPEN:
            return {
                ...state,
                reports:false,
                utilsInfo:true
            }

        default:
            return {
                ...state
            }
    }
}