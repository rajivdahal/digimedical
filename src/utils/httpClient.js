import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL
const REACT_APP_BASE_URL_LOGIN = process.env.REACT_APP_BASE_URL_LOGIN
const REACT_APP_BASE_URL_SERVICE = process.env.REACT_APP_BASE_URL_SERVICE



const http = axios.create({
    baseURL: BASE_URL,
    responseType: 'json',
    timeout: 20000,
    timeoutErrorMessage: "request Timeout",
})

const GET = (url,grant_type, params = {}) => {
    return http.get(BASE_URL+url,{
        headers:{
            "Authorization":'Bearer '+localStorage.getItem('dm-access_token')
    }
    })
}

const POST = (url, data,grant_type, params = {}) => {
    return http.post(BASE_URL+url, data,{
        headers:{
          'Authorization':'Bearer '+localStorage.getItem('dm-access_token')
        }
    })
}

const DELETE = (url,grant_type, params = {}) => {
    return http.delete(BASE_URL+url,{
        headers:{
            "Authorization":'Bearer '+localStorage.getItem('dm-access_token')
    }
    })
}

// const GETSERVICE = (url, params = {}) => {
//     return http.get(REACT_APP_BASE_URL_SERVICE+url,{
//         headers:{
//             "Authorization":'Bearer '+localStorage.getItem('dm-access_token')
//     }
//     })
// }

// const POSTSERVICE = (url, data,grant_type, params = {}) => {
//     return http.post(REACT_APP_BASE_URL_SERVICE+url, data,{
//         headers:{
//             "Authorization":'Bearer '+localStorage.getItem('dm-access_token')
//         }
//     })
// }
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
    // PUT,
    DELETE,
    UPLOAD,
    // POSTSERVICE,
    // GETSERVICE
}