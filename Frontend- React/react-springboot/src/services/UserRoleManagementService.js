import axios from 'axios';

const UserRoleManagementService_API_BASE_URL = "http://localhost:8080/api/v1/UserRoleData";
const UserRoleManagementService_API_ADD_URL = "http://localhost:8080/api/v1/AddUserRole";
const UserRoleManagementService_API_Delete_URL = "http://localhost:8080/api/v1/DeleteUserRole";
const UserRoleManagementService_API_update_URL = "http://localhost:8080/api/v1/UpdateUserRole";
const UserRoleManagementService_API_get_URL = "http://localhost:8080/api/v1/UserRoleData";
const UserRoleManagementService_API_Search_URL = "http://localhost:8080/api/v1/SearchUserRoleData";
const AssignPagesSectionUser_API_ADD_URL= "http://localhost:8080/api/v1/UserSectionPages/AddPagesSectionsUser";


class UserRoleManagementService{
    //calling get method to get all page management records
    getUserRoleManagementData(){
        return axios.get(UserRoleManagementService_API_BASE_URL);
    }

    //calling post method to add the page to db

    addUserRoleManagement(pageD){
        return axios.post(UserRoleManagementService_API_ADD_URL, pageD);
    }

    deleteUserRoleManagement(pageCode){
        return axios.delete(UserRoleManagementService_API_Delete_URL+'/'+pageCode);
    }

    getOneUserRoleManagement(pageCode){
        return axios.get(UserRoleManagementService_API_get_URL+'/'+pageCode);
    }

    SearchUserRoleManagement(SearchVal){
        return axios.get(UserRoleManagementService_API_Search_URL+'/'+SearchVal);
    }

    updateUserRoleManagement(pageD){
        return axios.put(UserRoleManagementService_API_update_URL,pageD);
    }

    AssignPagesSectionUser(asssigndata){
        return axios.post(AssignPagesSectionUser_API_ADD_URL, asssigndata);
    }

}
export default new UserRoleManagementService()