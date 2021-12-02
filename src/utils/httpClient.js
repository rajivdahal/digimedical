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

let token=localStorage.getItem("dm-access_token")?localStorage.getItem("dm-access_token"):"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ0ZXN0QGdtYWlsLmNvbSIsInNjb3BlIjpbIlJFQUQiLCJXUklURSJdLCJleHAiOjE2Mzg0NzY4MTQsInVzZXJpZCI6NiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6ImE5YWU3YzA3LTBlZDgtNDRhMS1iZjNkLWM3YWM3YmY4YWMzMCIsImNsaWVudF9pZCI6ImNsaWVudGlkIiwic3RhdHVzIjoyMDB9.ivfDfUbHtjJ80RrHQMV5bNPm8zKUOvOPHrIcIGeKQLNGtQO223Vyk6-BByKN6_dmeJHZHTZVcvshjzGn2xwRDlk2RVIMQtAjFAihH8Cd0thxJ4bHJhvOR665dekvJRn8f_FeNzTmwcySBIhj3V4LBPzEiDzXIMeDjSQZlsmt23SQ9qf2xwNK0pgqkoSIrJkJ9p35rvsghUN2_EgxKFejDqDeauVvGmsSUSLWjyzWcCRaNUdkzef6BY2sAootDRW9UlZjl4UDnh0n0ApevRnuS8srPU-wjs3MMnVDh4cY8mfn4YtgAO6J-FM0UogvQiomAWI8quvalL1hGHQqjCVnPQ"

const GET = (url,grant_type,params = {}) => {
    return http.get(BASE_URL+url,{
        headers:{
            "Authorization":'Bearer '+token
    }
    })
}

const POST = (url, data,grant_type, params = {}) => {
    return http.post(BASE_URL+url, data)
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