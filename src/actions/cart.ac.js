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
    let cartvalue=parseInt(localStorage.getItem("cartvalue")?localStorage.getItem("cartvalue"):"0")
    localStorage.setItem("cartvalue",cartvalue+1)
    return (dispatch) => {
        dispatch({
            type: cartActionTypes.SET_IS_CART_ADDED,
            payload: params
        })
    }
}

export const fetchlabtest = (params) => {
    console.log("inside fetchlabtest")
    return (dispatch) => {
        httpClient.GET("lab-test/get-all/active")
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