import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import LoginComponent from './components/LoginComponent';
import ViewPageComponent from './components/ViewPageComponent';
import AddEmployeeComponent from './components/AddEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import PageManagement from "./components/PageManagement";
import AddUpdatePageM from "./components/AddUpdatePageM";
import UpdatePageManagementData from "./components/updatePageManagementData";
import ListUserRoleManagement from "./components/UserRoleManagementJS/ListUserRoleManagement";
import AddUserRole from "./components/UserRoleManagementJS/AddUserRole";
import UpdateUserRole from "./components/UserRoleManagementJS/UpdateUserRole";

import NavBar from './components/NavBar';
import React from "react";


function App() {
    return (
        <div className="Container">
            <div style={{backgroundColor: '#060b26', height: '100%'}}>

                <Router >
                    <NavBar/>


                        <Switch>
                            <Route path="/" exact component={ViewPageComponent}></Route>

                            <Route path="/Login" component={LoginComponent}></Route>

                            <Route path="/AllEmployees" component={ListEmployeeComponent}></Route>
                            <Route path="/AddEmployees" component={AddEmployeeComponent}></Route>
                            <Route path="/UpdateEmployee/:empId" component={UpdateEmployeeComponent}></Route>

                            <Route path="/AllUserRoleManagement" component={ListUserRoleManagement}></Route>
                            <Route path="/AddUserRole" component={AddUserRole}></Route>
                            <Route path="/UpdateUserRole/:userRoleCode" component={UpdateUserRole}></Route>

                            <Route path="/pageManagement" component={PageManagement}></Route>
                            <Route path="/AddUpdatePageM" component={AddUpdatePageM}></Route>
                            <Route path="/UpdatePageManagementData/:pageCode" component={UpdatePageManagementData}></Route>

                        </Switch>

                </Router>
            </div>

        </div>
    );
}

export default App;
