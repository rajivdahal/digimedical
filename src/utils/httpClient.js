import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL
const REACT_APP_BASE_URL_LOGIN = process.env.REACT_APP_BASE_URL_LOGIN

export const http = axios.create({
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

const POST = (url, data, grant_type, getheaders, headerType = "json" , params = {}) => {
    if (getheaders) {
        const token = localStorage.getItem('dm-access_token')
        let headers = {
            'Authorization':`Bearer ${token}`,
            'Content-Type': "application/json"
        }

        if(headerType =='formdata'){
            headers['Content-Type'] = 'multipart/form-data';
        }


        return http.post(BASE_URL + url, data,{headers})
    }
    return http.post(BASE_URL + url, data)
}

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
const PUT = (url, data,grant_type,getheaders,headerType = "json",params = {}) => {
    if (getheaders) {
        const token = localStorage.getItem('dm-access_token')
        let headers = {
            'Authorization':`Bearer ${token}`,
            'Content-Type': "application/json"
        }

        if(headerType =='formdata'){
            headers['Content-Type'] = 'multipart/form-data';
        }


        return http.put(BASE_URL + url, data,{headers})
    }
    return http.put(BASE_URL + url, data)
}

//incoming change

const UPLOAD = (method, url, data = {}, grant_type, files,getheaders) => {
    if (grant_type) {
        data.grant_type = grant_type
    }
    console.log("inside http upload",method,url,data,grant_type,files,getheaders)
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        console.log("xhr is",xhr)
        const formData = new FormData();
        if(files){
            files.forEach(item => {
                console.log("inside image loop",item)
                formData.append('image', item, item.name)
            })
        }
        for (let key in data) {
            console.log("key and data are",key,data)
            formData.append(key, data[key])
        }
        console.log("formdata is",formData)

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response)
                } else {
                    reject(xhr.response)
                }
            }
        }
        // xhr.open(method, !getheaders?REACT_APP_BASE_URL_LOGIN:BASE_URL+url)
        xhr.open(method,getheaders?BASE_URL+url:REACT_APP_BASE_URL_LOGIN)
        xhr.setRequestHeader("Authorization", getheaders?`Bearer ${localStorage.getItem('dm-access_token')}`:`Basic Y2xpZW50aWQ6c2VjcmV0`);

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