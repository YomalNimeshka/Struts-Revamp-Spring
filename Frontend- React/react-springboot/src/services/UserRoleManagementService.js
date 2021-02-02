import axios from 'axios';

const PageManagementService_API_BASE_URL = "http://localhost:8080/api/v1/PageMRecords";
const PageManagementService_API_ADD_URL = "http://localhost:8080/api/v1/AddPage";
const PageManagementService_API_Delete_URL = "http://localhost:8080/api/v1/DeletePageM";
const PageManagementService_API_update_URL = "http://localhost:8080/api/v1/updatePageM";
const PageManagementService_API_get_URL = "http://localhost:8080/api/v1/PageMRecord";
const PageManagementService_API_Search_URL = "http://localhost:8080/api/v1/SearchPageMRecord";


class PageManagementService{
    //calling get method to get all page management records
    getPageManagementData(){
        return axios.get(PageManagementService_API_BASE_URL);
    }

    //calling post method to add the page to db
    addPageManagementData(pageD){
        return axios.post(PageManagementService_API_ADD_URL, pageD);
    }

    deletePageManagementData(pageCode){
        return axios.delete(PageManagementService_API_Delete_URL+'/'+pageCode);
    }

    getOnePageManagementData(pageCode){
        return axios.get(PageManagementService_API_get_URL+'/'+pageCode);
    }

    SearchPageManagementData(SearchVal){
        return axios.get(PageManagementService_API_Search_URL+'/'+SearchVal);
    }

    updateEmployee(pageD){
        return axios.put(PageManagementService_API_update_URL,pageD);
    }

}
export default new PageManagementService()