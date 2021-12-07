import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL
const REACT_APP_BASE_URL_LOGIN = process.env.REACT_APP_BASE_URL_LOGIN

const http = axios.create({
    baseURL: BASE_URL,
    responseType: 'json',
    timeout: 20000,
    timeoutErrorMessage: "request Timeout",
})
//current change

const GET = (url, grant_type, getheaders, params = {}) => {
    if (getheaders) {
        const token = localStorage.getItem('dm-access_token')
        return http.get(BASE_URL + url, {
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
    }
    return http.get(BASE_URL + url)
}
// current change

const POST = (url, data, grant_type, getheaders, params = {}) => {
    if (getheaders) {
        const token = localStorage.getItem('dm-access_token')
        return http.post(BASE_URL + url, data,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }
        )
    }
    return http.post(BASE_URL + url, data)
}
//current change
const DELETE = (url, grant_type,getheaders, params = {}) => {
    if (getheaders) {
        const token = localStorage.getItem('dm-access_token')
        return http.delete(BASE_URL + url,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }
        )
    }
    return http.delete(BASE_URL + url)
}
//current change
//incoming change
const PUT = (url, data,grant_type,getheaders,params = {}) => {
    if (getheaders) {
        const token = localStorage.getItem('dm-access_token')
        return http.put(BASE_URL + url, data,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }
        )
    }
    return http.put(BASE_URL + url, data)
}

//incoming change

const UPLOAD = (method, url, data = {}, grant_type, files = []) => {
    if (grant_type) {
        data.grant_type = grant_type
    }
    console.log("inside http")
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key])
        }
        xhr.onreadystatechange = () => {

            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // console.log("res:",xhr.response)
                    resolve(xhr.response)
                } else {
                    reject(xhr.response)
                }
            }
        }

        xhr.open(method, REACT_APP_BASE_URL_LOGIN)
        xhr.setRequestHeader("Authorization", `Basic Y2xpZW50aWQ6c2VjcmV0`);
        xhr.send(formData)



    })
}

export const httpClient = {
    GET,
    POST,
    PUT,
    DELETE,
    UPLOAD,

}