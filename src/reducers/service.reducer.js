import { serviceBookingTypes } from "../actions/service.action.js";

export const serviceReducer=(state,action)=>{
    console.log("inside service reducer")
    switch (action.type) {
        case serviceBookingTypes.INTERNAL_SERVICE_BOOKING:
            return {
                ...state,
                data:action.payload
            };

        case serviceBookingTypes.EXTERNAL_SERVICE_BOOKING:
            return {
                ...state,
                data:action.payload
            }
        case serviceBookingTypes.RESET_SERVICES_INFO:
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