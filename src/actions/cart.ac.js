import { notify } from "../services/notify"
import { httpClient } from "../utils/httpClient"

export const cartActionTypes = {
    SET_IS_CART_ADDING: 'SET_IS_CART_ADDING',
    SET_IS_CART_ADDED: 'SET_IS_CART_ADDED',
    SET_IS_CART_RENDERED: 'SET_IS_CART_RENDERED',
}

export const labtestActionTypes = {
    SET_IS_LAB_TEST_FETCHED: 'SET_IS_LAB_TEST_FETCHED',
    SET_IS_LAB_TEST_SET: 'SET_IS_LAB_TEST_SET',
    SET_TEMP_TOTAL:"SET_TEMP_TOTAL",
    CLEAR_TEMP_TOTAL:"CLEAR_TEMP_TOTAL",
    SET_RESET_CHECKBOX:"SET_RESET_CHECKBOX",
    ADD_TO_CART_SIGNAL:"ADD_TO_CART_SIGNAL"
}

export const addtocart = params => {

    return (dispatch) => {
        dispatch({
            type: cartActionTypes.SET_IS_CART_ADDED,
            payload: params
        })
    }
}

export const fetchlabtest = (params) => {

    return (dispatch) => {
        httpClient.GET("labtest/category/get",false,true)
            .then(resp => {
                let data=resp.data.data
                console.log(data)
                data.map((item,index)=>{
                    item.isactiveclass=false
                    item.subcategory.map((item)=>{
                        item.checked=true
                    })
                })
                console.log("data is",data)
                dispatch({
                    type: labtestActionTypes.SET_IS_LAB_TEST_FETCHED,
                    payload:data
                })
            })
            .catch(err => {
                notify.error("Something went wrong")
            })
    }
}
export const setlabtest=(params)=>{
    return (dispatch)=>{
        dispatch({
            type:labtestActionTypes.SET_IS_LAB_TEST_SET,
            payload:params
        })
        dispatch({
            type:labtestActionTypes.CLEAR_TEMP_TOTAL,
            payload:0
        })
    }
}
export const settemptotal=(params)=>{
    return (dispatch)=>{
        dispatch({
            type:labtestActionTypes.SET_TEMP_TOTAL,
            payload:params
        })
    }
}
export const resetcheckbox=(params)=>{
    return (dispatch)=>{
        dispatch({
            type:labtestActionTypes.SET_RESET_CHECKBOX,
            payload:params
        })
    }
}
export const addtocartsignal=(params)=>{
    return(dispatch)=>{
        dispatch({
            type:labtestActionTypes.ADD_TO_CART_SIGNAL,
            payload:params
        })
    }
}