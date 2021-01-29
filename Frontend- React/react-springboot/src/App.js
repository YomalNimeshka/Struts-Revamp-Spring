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
          </Switch>
        </div>
      </Router>
      
    </div>
  );
}

export default App;
