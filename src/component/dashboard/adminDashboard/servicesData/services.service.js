import { httpClient } from '../../../../utils/httpClient';

const ServiceApi={

    getAllServices : ()=>{
        return httpClient.GET("services/get-digi", false, true);
    },

    getHospitalServices : ()=>{
        return httpClient.GET("services/get-hospital", false, true);
    },

    createService : (values)=>{
        let formData = new FormData();
  
        if (values.image) {
          formData.append("image", values.image);
        }
        formData.append("serviceName", values.serviceName);
        formData.append("serviceDescription", values.serviceDescription);
        formData.append("price", values.price);
        
        return httpClient.POST("services/create", formData, false, true, "formdata")
    },

    editService:(values,id)=>{
        let formData = new FormData();
  
        if (values.image) {
          formData.append("image", values.image);
        }
        formData.append("serviceName", values.serviceName);
        formData.append("serviceDescription", values.serviceDescription);
        formData.append("price", values.price);
    
        return httpClient.PUT("services/update/" + id, formData, false, true, "formdata")
    },

    changeServiceStatus:(serviceStatus,serviceID)=>{
        console.log(serviceStatus)
        let tempServiceStatus = {
            id: serviceID,
            status: serviceStatus == true ? false : true
        }
        console.log(tempServiceStatus)
        return httpClient.PUT("services/change-status" ,tempServiceStatus, false, true)
       
    },

}

export default ServiceApi;