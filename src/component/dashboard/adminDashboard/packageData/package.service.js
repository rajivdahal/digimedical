import { httpClient } from "../../../../utils/httpClient";

const PackageApi = {
    createPackage: (values) => {
        let data = {
            name: values.packageName,
            amount: values.price,
            lunchingOfferPrice: values.launchingOffer,
            laboratoryPercentage: values.labDiscount
        }
        return httpClient.POST("membership-packages/create", data, false, true)
    },

    getAllPackage: () => {
        return httpClient.GET("membership-packages/all", false, true)
    },

    editPackage: (values, id) => {
        let data = {
            name: values.packageName,
            amount: values.price,
            lunchingOfferPrice: values.launchingOffer,
            laboratoryPercentage: values.labDiscount
        }
        return httpClient.PUT("membership-packages/" + id, data, false, true)
    },

    changeStatus: (id, status) => {
        console.log(status)
        let packageId = id;
        let tempStatus = status.toString() === true.toString() ? false : true;
        console.log(tempStatus)
        return httpClient.PUT("membership-packages/change/status/" + packageId +"/"+tempStatus,{}, false, true)

    },

    createPackageDetail:(values)=>{
        let selectedId = values.selectedPackage.value;
        let  data ={
            membershipPackageId : selectedId,
        }
        return httpClient.POST("membership-packages-details/create",data,false,true)
    }
}
export default PackageApi;