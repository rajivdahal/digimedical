const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
export const userActionTypes = {
    SET_IS_FETCH_PROFILE: 'SET_IS_FETCH_PROFILE',
    SET_IS_EDIT_PROFILE:"SET_IS_EDIT_PROFILE"
}
export const loginUser=params=>{
    console.log("inside action",params)
    return(dispatch)=>{
        let id=localStorage.getItem("userid")
        console.log("id is",id)
        let imgUrl=REACT_APP_BASE_URL + "download/" + id;
        console.log("image url is",imgUrl)
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
    console.log("inside edit profile action file")
    return(dispatch)=>{
      dispatch({
          type:userActionTypes.SET_IS_EDIT_PROFILE,
          payload:true
      })
    }

}