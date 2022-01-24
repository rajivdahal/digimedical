const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
export const userActionTypes = {
    SET_IS_FETCH_PROFILE: 'SET_IS_FETCH_PROFILE',
}
export const loginUser=params=>{
    console.log("inside action",params)
    return(dispatch)=>{
        let id=localStorage.getItem("userid")
        let imgUrl=REACT_APP_BASE_URL + "download/" + id;
        dispatch({
            type:userActionTypes.SET_IS_FETCH_PROFILE,
            payload:{
                imgUrl:imgUrl,
                id:id
            }
        })
    }
}