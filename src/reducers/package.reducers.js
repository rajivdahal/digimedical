import { packageBookingTypes } from "../actions/package.action";


export const packageReducer=(state,action)=>{
    console.log("inside package reducer",action.payload)
    switch (action.type) {
        case packageBookingTypes.INTERNAL_PACKAGE_BOOKING:
            return {
                ...state,
                data:action.payload
            };
        case packageBookingTypes.RESET_PACKAGE_INFO:
            return{
                ...state,
                data:null
            }
        default:
            return {
                ...state
            }
    }
}