import { httpClient } from "../../../../utils/httpClient";

const hospitalApi = {
  createHospital: (values) => {
    let formData = new FormData();
    if (values.hospitalImage) {
      formData.append("image", values.hospitalImage);
    }
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("establishedDate", values.establishedDate);
    formData.append("panNo", values.panNo);
    formData.append("link", values.link);
    formData.append("contactNo", values.contactNumber);
    formData.append("phoneNumber", values.mobileNumber);
    formData.append("address", values.address);
    formData.append("hospitalEmail", values.email);
    formData.append("password", values.password);
    formData.append("confirmPassword", values.confirmPassword);

    return httpClient.POST("hospital/create", formData, false, true, "formdata");
  },

  editHospital : (values,id) =>{
    let formData = new FormData();

    if (values.hospitalImage) {
      formData.append("image", values.hospitalImage);
    }
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("panNo", values.panNo);
    formData.append("link", values.link);
    formData.append("contactNo", values.contactNumber);
    formData.append("phoneNumber", values.mobileNumber);
    formData.append("address", values.address);
    formData.append("establishedDate", values.establishedDate);
    formData.append("hospitalId", id);

    return httpClient.PUT("hospital/update", formData, false, true, "formdata");

  },
  
  getAllHospital : ()=>{
    return httpClient.GET("hospital/get-all/admin", false, true);
  },

  getHospitalById : (id)=>{
    return httpClient.GET("hospital/get/" + id, false, true);
  },

  hospitalStatus :(status,id)=>{
    return httpClient.PUT("hospital/change/" + status + "/" + id, {}, null, true)

  }
};

export default hospitalApi;
