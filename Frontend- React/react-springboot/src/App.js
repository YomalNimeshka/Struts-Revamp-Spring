import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import LoginComponent from './components/LoginComponent';
import ViewPageComponent from './components/ViewPageComponent';
import AddEmployeeComponent from './components/AddEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';

import NavBar from './components/NavBar';
import ListSectionComponent from './components/sectionCompoments/ListSectionComponent';
import AddSectionComponent from './components/sectionCompoments/AddSectionComponent';
import UpdateSectionComponent from './components/sectionCompoments/UpdateSectionComponent';
import ListUserComponent from './components/userManagementComponents/ListUserComponent';
import AddUserComponent from './components/userManagementComponents/AddUserComponent';
import UpdateUserComponent from './components/userManagementComponents/UpdateUserComponent';



function App() {
  return (
    <div className="Container">
     
      <Router>
        <NavBar/>
        <div className="container">
        
          <Switch>
              <Route path="/" exact component={ViewPageComponent} ></Route>
              <Route path="/Login" component={LoginComponent} ></Route>
              <Route path="/AllEmployees" component={ListEmployeeComponent} ></Route>
              <Route path="/AddEmployees" component={AddEmployeeComponent} ></Route>
              <Route path="/UpdateEmployee/:empId" component={UpdateEmployeeComponent} ></Route>

              <Route path="/Section-Mgt/All-Sections" component={ListSectionComponent} ></Route>
              <Route path="/Section-Mgt/Add-Section" component={AddSectionComponent} ></Route>
              <Route path="/Section-Mgt/Update-Section/:sectionCode" component={UpdateSectionComponent} ></Route>

              <Route path="/User-Mgt/All-Users" component={ListUserComponent} ></Route>
              <Route path="/User-Mgt/Add-User" component={AddUserComponent} ></Route>
              <Route path="/User-Mgt/Update-User/:employeeId" component={UpdateUserComponent} ></Route>
          </Switch>
        </div>
      </Router>
      
    </div>
  );
}

export default App;
