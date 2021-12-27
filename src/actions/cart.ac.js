import { notify } from "../services/notify"
import { httpClient } from "../utils/httpClient"

export const cartActionTypes = {
    SET_IS_CART_ADDING: 'SET_IS_CART_ADDING',
    SET_IS_CART_ADDED: 'SET_IS_CART_ADDED',
    SET_IS_CART_RENDERED: 'SET_IS_CART_RENDERED',
}
export const labtestActionTypes = {
    SET_IS_LAB_TEST_FETCHED: 'SET_IS_LAB_TEST_FETCHED',
}

export const addtocart = params => {
    console.log("at action file inc data is>>", params)
    return (dispatch) => {
        dispatch({
            type: cartActionTypes.SET_IS_CART_ADDING,
            payload: true
        })
        dispatch({
            type: cartActionTypes.SET_IS_CART_ADDED,
            payload: params
        })
    }
}

export const fetchlabtest = (params) => {
    console.log("inside fetchlabtest")
    return (dispatch) => {
        httpClient.GET("lab-test/get-all",false,true)
            .then(resp => {
                // console.log(resp.data.data)
                dispatch({
                    type: labtestActionTypes.SET_IS_LAB_TEST_FETCHED,
                    payload: resp.data.data
                })
            })
            .catch(err => {
                notify.error("Something went wrong")
            })
    }
}