import { httpClient } from "../../../../utils/httpClient";

const doctorApi = {

  getTrueServices : () =>{
    return httpClient.GET("services/true", false, true);
  },

  createAdminDoctor: (values) => {
    let selectedId = [];
    values.doctorServices.forEach((service, index) => {
      selectedId.push(service.value);
    });

    let formData = new FormData();
    if (values.doctorImage) {
      formData.append("image", values.doctorImage);
    }
    formData.append("firstName", values.firstName);
    formData.append("middleName", values.middleName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("prefix", values.prefix);
    formData.append("nmcNo", values.nmcNumber);
    formData.append("specialist", values.specialist);
    formData.append("description", values.description);
    formData.append("password", values.password);
    formData.append("confirmPassword", values.confirmPassword);
    formData.append("liscenceDate", values.licensedDate);
    formData.append("mobileNumber", values.mobileNumber);
    formData.append("serviceId", selectedId);

    return httpClient.POST("doctor/create", formData, false, true, "formdata");
  },
  createHospitalDoctor: (values) => {
    let selectedId = [];
    values.doctorServices.forEach((service, index) => {
      selectedId.push(service.value);
    });

    let days = [];
    if (values.availableDays) {
      days = values.availableDays.map((day) => day.value);
    }

    let formData = new FormData();

    if (values.doctorImage) {
      formData.append("image", values.doctorImage);
    }
    formData.append("firstName", values.firstName);
    formData.append("middleName", values.middleName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("prefix", values.prefix);
    formData.append("nmcNo", values.nmcNumber);
    formData.append("specialist", values.specialist);
    formData.append("description", values.description);
    formData.append("password", values.password);
    formData.append("confirmPassword", values.confirmPassword);
    formData.append("liscenceDate", values.licensedDate);
    formData.append("mobileNumber", values.mobileNumber);
    formData.append("availableDays", days);
    formData.append("startTime", values.startTime);
    formData.append("endTime", values.endTime);
    formData.append("serviceId", selectedId);

    return httpClient.POST(
      "doctor/hospital/create",
      formData,
      false,
      true,
      "formdata"
    );
  },

  editAdminDoctor: (values, id) => {
    let selectedId = [];
    values.doctorServices.forEach((service, index) => {
      selectedId.push(service.value);
    });

    let formData = new FormData();
    if (values.doctorImage) {
      formData.append("image", values.doctorImage);
    }
    formData.append("firstName", values.firstName);
    formData.append("middleName", values.middleName);
    formData.append("lastName", values.lastName);
    formData.append("prefix", values.prefix);
    formData.append("nmcNo", values.nmcNumber);
    formData.append("specialist", values.specialist);
    formData.append("description", values.description);
    formData.append("liscenceDate", values.licensedDate);
    formData.append("mobileNumber", values.mobileNumber);

    formData.append("serviceId", selectedId);
    return httpClient.PUT(
      "doctor/update/" + id,
      formData,
      false,
      true,
      "formdata"
    );
  },

  editHospitalDoctor: (values, id) => {
    let selectedId = [];
    values.doctorServices.forEach((service, index) => {
      selectedId.push(service.value);
    });

    let days = [];
    if (values.availableDays) {
      days = values.availableDays.map((day) => day.value);
    }

    let formData = new FormData();
    if (values.doctorImage) {
      formData.append("image", values.doctorImage);
    }
    formData.append("firstName", values.firstName);
    formData.append("middleName", values.middleName);
    formData.append("lastName", values.lastName);
    formData.append("prefix", values.prefix);
    formData.append("nmcNo", values.nmcNumber);
    formData.append("specialist", values.specialist);
    formData.append("description", values.description);
    formData.append("liscenceDate", values.licensedDate);
    formData.append("mobileNumber", values.mobileNumber);
    formData.append("availableDays", days);
    formData.append("startTime", values.startTime);
    formData.append("endTime", values.endTime);
    formData.append("serviceId", selectedId);
    return httpClient.PUT(
      "doctor/hospital/update/" + id,
      formData,
      false,
      true,
      "formdata"
    );
  },

  getAdminDoctor: () => {
    return httpClient.GET("doctor/getall", false, true);
  },

  getHospitalDoctor: () => {
    return httpClient.GET("hospital/all/doctors", false, true);
  },

  getAdminDoctorBYId: (id) => {
    console.log(id)
    return httpClient.GET("doctor/basic-info/" + id, false, true);
  },

  getHospitalDoctorById: (id) => {
    return httpClient.GET("doctor/hospital/" + id, false, true);
  },
  adminDoctorStatus: (doctorid, doctorstatus) => {
    let tempDoctorStatus = {
      id: doctorid,
      status: doctorstatus.toString() === true.toString() ? false : true,
    };
    console.log(tempDoctorStatus);
    return httpClient.PUT(
      "doctor/change-status",
      tempDoctorStatus,
      false,
      true
    );
  },
};

export default doctorApi;
