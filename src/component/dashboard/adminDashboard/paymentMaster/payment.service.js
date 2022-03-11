import { httpClient } from "../../../../utils/httpClient";

export const PaymentApi = {
    getAllPayment : ()=>{
        return httpClient.GET("payment-master/get-all", false, true);
    },
    createPaymentMaster : (values)=>{
        let data = {
            name : values.name,
            type : values.type,
            url : values.url
        }
        
        return httpClient.POST("payment-master/create", data, false, true)
    },
    editPaymentMaster : (values,id)=>{
        let data = {
            name : values.name,
            type : values.type,
            url : values.url,
            id,
        }
        
        return httpClient.POST("payment-master/create", data, false, true)
    },

    changePaymentStatus : (id,status)=>{
        let paymentSatus = status == true ? false : true;
        return httpClient.PUT("payment-master/update/"+ id+"/"+paymentSatus,{}, false, true)
    }
}