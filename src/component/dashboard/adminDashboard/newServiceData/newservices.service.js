import { httpClient } from '../../../../utils/httpClient';

const DigiServiceApi={

    getAllDigiServices : ()=>{
        return httpClient.GET("digi-service/get-all", false, true);
    },

    createDigiService : (values)=>{
        let formData = new FormData();
  
        if (values.image) {
          formData.append("image", values.image);
        }
        if (values.iconImg) {
            formData.append("iconImage", values.iconImg);
          }
        formData.append("name", values.serviceName);
        formData.append("description", values.serviceDescription);
        formData.append("amount", values.price);
        formData.append("type", values.type);

        return httpClient.POST("digi-service/create", formData, false, true, "formdata")
    },

    editDigiService:(values,id)=>{
        console.log(values);
        let formData = new FormData();
  
        if (values.image) {
          formData.append("image", values.image);
        }
        if (values.iconImg) {
            formData.append("iconImage", values.iconImg);
          }
        formData.append("name", values.serviceName);
        formData.append("description", values.serviceDescription);
        formData.append("amount", values.price);
        formData.append("type", values.type);
    
        return httpClient.PUT("digi-service/update/" + id, formData, false, true, "formdata")
    },

    changeServiceStatus:(serviceStatus,serviceID)=>{
            
        let status = serviceStatus == true ? false : true;

        return httpClient.PUT("digi-service/change/status/"+serviceID+"/"+status,{}, false, true)
       
    },

}

export default DigiServiceApi;