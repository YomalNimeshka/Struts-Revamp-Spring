import axios from 'axios';

const SECTION_API_BASE_URL = "http://localhost:8080/api/v1/Section Mgt/All Sections";

const SECTION_API_ADD_URL = "http://localhost:8080/api/v1/Section Mgt/Add Sections";
const SECTION_API_GET_SECTIONCODE_URL = "http://localhost:8080/api/v1/Section Mgt/Section-code";
const SECTION_API_UPDATE_URL = "http://localhost:8080/api/v1/Section Mgt/Section-update";
const SECTION_API_DELETE_URL = "http://localhost:8080/api/v1/Section Mgt/Section-delete";



class SectionMgtService{
    //calling get method to get all employees
    getSections(){
        return axios.get(SECTION_API_BASE_URL);
    }

    
    //calling post method to add the employee to db
    addSection(section){
        return axios.post(SECTION_API_ADD_URL, section);
    }
    
    getSectionByCode(sectionCode){
        return axios.get(SECTION_API_GET_SECTIONCODE_URL+ '/' +sectionCode);
    }

    updateSection(section, sectionCode){
        return axios.put(SECTION_API_UPDATE_URL+'/'+sectionCode, section);
    }

    deleteSection(sectionCode){
        return axios.delete(SECTION_API_DELETE_URL+'/'+sectionCode);
    }

    
}
export default new SectionMgtService()