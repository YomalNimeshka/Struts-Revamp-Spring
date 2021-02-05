import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/v1/User Mgt/All Users";

const USER_API_ADD_URL = "http://localhost:8080/api/v1/User Mgt/Add Users";
const USER_API_GET_EMPLOYEEID_URL = "http://localhost:8080/api/v1/User Mgt/EmployeeId";
const USER_API_UPDATE_URL = "http://localhost:8080/api/v1/User Mgt/UpdateUser";
const USER_API_DELETE_URL = "http://localhost:8080/api/v1/User Mgt/DeleteUser";

class UserMgtService{

    //calling get method to get all employees
    getUsers(){
        return axios.get(USER_API_BASE_URL);
    }

    
    //calling post method to add the employee to db
    addUser(user){
        return axios.post(USER_API_ADD_URL, user);
    }
    
    getUserByEmployeeId(employeeId){
        return axios.get(USER_API_GET_EMPLOYEEID_URL+ '/' +employeeId);
    }

    updateUser(user, employeeId){
        return axios.put(USER_API_UPDATE_URL+'/'+employeeId, user);
    }

    deleteUser(employeeId){
        return axios.delete(USER_API_DELETE_URL+'/'+employeeId);
    }


}
export default new UserMgtService()