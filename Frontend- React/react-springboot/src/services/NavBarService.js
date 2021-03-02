import axios from 'axios';

const Nav_API_BASE_URL = "http://localhost:8080/api/v1/Nav/NavData";

class NavBarService {

    getNavBarData(){
        return axios.get(Nav_API_BASE_URL);
    }

}

export default new NavBarService()