import { httpClient } from "../../../../utils/httpClient";

const PackageApi = {
    createPackage: (values) => {
        let selectedId = values.selectedPackage.value;

        let data = {
            name: values.packageName,
            amount: values.price,
            lunchingOfferPrice: values.launchingOffer,
            laboratoryPercentage: values.labDiscount,
            packageId : selectedId,

        }
        console.log(data)
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
                points : values.allDetails
            }
        return httpClient.POST("membership-packages-details/create",data,false,true)
    },
    getPackageDetails : ()=>{
        return httpClient.GET("membership-packages-details/all", false, true)
    },
    editPackageDetails : (values,detailID)=>{
        let selectedId = values.selectedPackage.value;
            let  data ={
                membershipPackageId : selectedId,
                points : values.details,
                id:detailID,
            }
        return httpClient.PUT("membership-packages-details/update",data,false,true)
    },
    getPackageDesc: () => {
        return httpClient.GET("master-package/get-all", false, true)
    },

    createPackageDesc:(values)=>{
            let  data ={
                name : values.name,
                description : values.description,
                purpose : values.allPurpose,
            }
        return httpClient.POST("master-package/create",data,false,true)
    },

    editPackageDesc : (values,detailID)=>{
            let  data ={
                name : values.name,
                description : values.description,
                purpose : values.allPurpose,
            }
        return httpClient.PUT("master-package/update/"+detailID,data,false,true)
    },

    packageStatus: (packageid, status) => {
          let tempStatus = status.toString() === true.toString() ? false : true;
            console.log(tempStatus)
        return httpClient.PUT("master-package/change/" + packageid +"/"+tempStatus,{}, false, true)
        
      },
}
export default PackageApi;