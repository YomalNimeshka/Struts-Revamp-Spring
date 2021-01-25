import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/Employees";
const EMPLOYEE_API_LOGIN_URL = "http://localhost:8080/api/v1/Login";
const EMPLOYEE_API_ADD_URL = "http://localhost:8080/api/v1/AddEmp";
const EMPLOYEE_API_GET_EMPID_URL = "http://localhost:8080/api/v1/EmpId";
const EMPLOYEE_API_UPDATE_URL = "http://localhost:8080/api/v1/UpdateEmp";
const EMPLOYEE_API_DELETE_URL = "http://localhost:8080/api/v1/DeleteEmp";
const EMPLOYEE_API_REPORT_PDF_URL = "http://localhost:8080/api/v1/Report";
const EMPLOYEE_API_CSV_UPLOAD_URL = "http://localhost:8080/api/v1/CSV/upload";


class EmployeeService{
    //calling get method to get all employees
    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    //calling post method to send the entered details and get the login value from the api
    loginUserIn(user){
        return axios.post(EMPLOYEE_API_LOGIN_URL, user);
    }

    //calling post method to add the employee to db
    addEmployee(employee){
        return axios.post(EMPLOYEE_API_ADD_URL, employee);
    }
    
    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_GET_EMPID_URL+ '/' +employeeId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_UPDATE_URL+'/'+employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_DELETE_URL+'/'+employeeId);
    }

    getReport(format){
        return axios.get(EMPLOYEE_API_REPORT_PDF_URL+'/'+format);
    }

    uploadCSV(file){
        return axios.post(EMPLOYEE_API_CSV_UPLOAD_URL, file, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }});
    }
}
export default new EmployeeService()