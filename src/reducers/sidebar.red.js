import { dashboardActionTypes } from "../actions/dashboard.ac";

export const SidebarReducer=(state,action)=>{
    // debugger
    console.log("state in sidebar reducerrr is",state,action)
    switch (action.type) {
        case dashboardActionTypes.SET_IS_DASHBOARD_OPEN:
                return{
                    ...state,
                    isopen:action.payload
                }
        case dashboardActionTypes.SET_IS_DASHBOARD_CLOSE:
            return{
                ...state,
                isopen:action.payload
            }
        default:
            return {
                ...state
            }
    }
}