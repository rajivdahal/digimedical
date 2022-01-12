import { httpClient } from '../../../../utils/httpClient';

const UserManagementApi={

    getRole : ()=>{
        return httpClient.GET("role/get-all", false, true);
    }
}

export default UserManagementApi;