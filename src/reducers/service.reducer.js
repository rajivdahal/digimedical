import { serviceBookingTypes } from "../actions/service.action.js";

let defaultState = {
    data : null,
}
export const serviceReducer=(state = defaultState, action)=>{
    switch (action.type) {
        case serviceBookingTypes.INTERNAL_SERVICE_BOOKING:
            let newState = { ...state, ...{ data : action.payload } }
            return newState;
        case serviceBookingTypes.EXTERNAL_SERVICE_BOOKING:
            return {
                ...state,
            }

        default:
            return {
                ...state
            }
    }
}