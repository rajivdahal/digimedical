import { userActionTypes } from "../actions/User.ac"

export const UserReducer = (state, action) => {
    // // console.log('at reducer>>>>', action)
    // console.log("state iin user reducer is>>", state)
    switch (action.type) {
        case userActionTypes.SET_IS_LOGIN_LOADING:
            return {
                ...state,
                isuserloginloading: action.payload
            }
        case userActionTypes.USER_LOGGED_IN:
            return {
                ...state,
                email: action.payload.email,
                // password:action.payload.password
            }
        default:
            return {
                ...state
            }
    }
}
