import { paymentPopupActionTypes } from "../actions/paymentPopUp.ac"

export const paymentPopUpReducer=(state,action)=>{
    switch (action.type) {
        case paymentPopupActionTypes.SET_TRUE_TRIGGER:
            return{
                ...state,
                trigger:true
            }
        case paymentPopupActionTypes.SET_FALSE_TRIGGER:
            return {
                ...state,
                trigger:false
            }

        default:
            return {
                ...state
            }
    }
}