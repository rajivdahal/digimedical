import { userActionTypes } from "../actions/User.ac"

export const UserReducer = (state, action) => {
    console.log("inside user reducerrrr",state,action.payload)
    switch (action.type) {
        case userActionTypes.SET_IS_FETCH_PROFILE:
            // let url=
            return {
                ...state,
                profileImage:action.payload.imgUrl,
                userId:action.payload.id
            }
        default:
            return {
                ...state
            }
    }
}
