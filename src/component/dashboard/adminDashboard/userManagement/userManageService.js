import { httpClient } from '../../../../utils/httpClient';

const UserManagementApi={

    getRole : ()=>{
        return httpClient.GET("role/get-all", false, true);
    },
    createRole : (values)=>{
        let data = {
            roleName: values.name,
            roleDescription: values.description
        }
        return httpClient.POST("role/create", data, false, true)
    },

    editRole:(values,id)=>{
        let data = {
            roleName: values.name,
            roleDescription: values.description
        }
        return httpClient.PUT("role/update/" + id, data, false, true)
             
    },

    getAllAdmin : ()=>{
        return httpClient.GET("admin/all", false, true);
    },

    createAdmin : (values)=>{
        let roleid = values.selectedRole.value;
        console.log(roleid);
        let formData = new FormData();
  
        if (values.adminImage) {
          formData.append("image", values.adminImage);
        }
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("email", values.email);
        formData.append("dob", values.dob);
        formData.append("mobileNumber", values.mobileNumber);
        formData.append("password", values.password);
        formData.append("confirmPassword", values.confirmPassword);
        // formData.append("role", roleid);
            return httpClient.POST("admin/create", formData, false, true, "formdata")
    },

    editAdmin:(values,id)=>{
        let formData = new FormData();

        if (values.adminImage) {
          formData.append("image", values.adminImage);
        }
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("dob", values.dob);
        formData.append("mobileNumber", values.mobileNumber);
            return httpClient.PUT("admin/update/" + id, formData, false, true, "formdata")
    },

    changeAdminStatus:(status,id)=>{
    let changedStatus = status == true ? false : true;
        return httpClient.PUT("admin/change/" + id + "/" + changedStatus, {}, null, true)
       
    },
    
    getAllScreen:()=>{
        return httpClient.GET("screen/get-all",false,true)
    },
    
    getAllScreenRole : ()=>{
        return httpClient.GET("screen-role/get-all",false,true)
    
    },

    createPermission:(values)=>{
        let roleid = values.role.value;
        let selectedScreenId = [];
        values.screens.forEach((screen) => {
            selectedScreenId.push(screen.value);
        });

        let data= {
            roleId : roleid,
            screenId : selectedScreenId,
        }
        console.log(data)
        return httpClient.POST("screen-role/create",data,false,true)
    },
    editPermission:(values,id)=>{
        console.log(id)
        let roleid = values.role.value;
        let selectedScreenId = [];
        values.screens.forEach((screen) => {
            selectedScreenId.push(screen.value);
        });

        let data= {
            roleId : roleid,
            screenId : selectedScreenId,
        }
        console.log(data)
        return httpClient.PUT("screen-role/update/"+id,data,false,true)
    },

    getScreenbyId: (id)=>{
        return httpClient.GET("screen-role/get/"+id,false,true);
    }

}

export default UserManagementApi;