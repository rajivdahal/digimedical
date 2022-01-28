import { userActionTypes } from "../actions/User.ac"

export const UserReducer = (state, action) => {
    console.log("inside user reducerrrr",state,action.payload)
    switch (action.type) {
        case userActionTypes.SET_IS_FETCH_PROFILE:
            return {
                ...state,
                profileImage:action.payload.imgUrl,
                userId:action.payload.id,
            }
        case userActionTypes.SET_IS_EDIT_PROFILE:
            return{
                ...state,
                isProfileChanged:true
            }
        default:
            return {
                ...state
            }
    }
}
