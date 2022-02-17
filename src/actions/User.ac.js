const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const userActionTypes = {
    SET_IS_FETCH_PROFILE: 'SET_IS_FETCH_PROFILE',
    SET_IS_EDIT_PROFILE:"SET_IS_EDIT_PROFILE"
}
export const loginUser=params=>{
    return(dispatch)=>{
        let id=localStorage.getItem("userid")
        let imgUrl=REACT_APP_BASE_URL + "download/" + id;
        dispatch({
            type:userActionTypes.SET_IS_FETCH_PROFILE,
            payload:{
                imgUrl:imgUrl,
                id:id,
            }
        })
    }
}

export const editProfile=params=>{
    return(dispatch)=>{
      dispatch({
          type:userActionTypes.SET_IS_EDIT_PROFILE,
          payload:true
      })
    }

}