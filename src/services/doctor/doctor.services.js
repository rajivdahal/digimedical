import { httpClient } from "../../utils/httpClient";

const doctorServices = {
    getAll : async () =>{
        return httpClient.GET("doctor/getall")
    },
     
    getTrueServices : async () =>{
        return httpClient.GET("services/true")
    },
}


export default doctorServices;