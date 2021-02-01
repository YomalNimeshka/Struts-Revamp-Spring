import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import {encode as base64_encode} from 'base-64';

class AddEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
           empName:'',
           empSalary:'',
           empDesignation:'',
           username:'',
           password:''
        }

        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSalaryHandler = this.changeSalaryHandler.bind(this);
        this.changeDesignationHandler = this.changeDesignationHandler.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);

        this.saveEmp = this.saveEmp.bind(this);
    }

    changeNameHandler=(event)=>{
        this.setState({empName: event.target.value});
    }
    changeSalaryHandler=(event)=>{
        this.setState({empSalary: event.target.value});
    }
    changeDesignationHandler=(event)=>{
        this.setState({empDesignation: event.target.value});
    }
    changeUsernameHandler=(event)=>{
        this.setState({username: event.target.value});
    }

    
    changePasswordHandler=(event)=>{
        this.setState({password: event.target.value});
    }

    //save button function
    saveEmp = (e)=>{
        e.preventDefault();
            let encoded = base64_encode(this.state.password);
           
            let employee = {empName: this.state.empName, empSalary: this.state.empSalary, empDesignation: this.state.empDesignation,
                username: this.state.username, password: encoded};
    
            console.log("Emp object ==> " +JSON.stringify(employee));
        
        

        EmployeeService.addEmployee(employee).then(res =>{
            this.props.history.push('/AllEmployees');
        })
    }

    //cancel button function
    cancel(){
        this.props.history.push('/AllEmployees');
    }

    render() {
        const container={
            paddingLeft : '250px',
            paddingRight : '200px'
        };
        return (
            <div style={container}>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Add Employee</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Name :</label>
                                        <input placeholder="Name" name="empName" className="form-control" 
                                           value={this.state.empName} onChange={this.changeNameHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label>Salary :</label>
                                        <input placeholder="Salary" name="empSalary" className="form-control" 
                                           value={this.state.empSalary} onChange={this.changeSalaryHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label>Designation :</label>
                                        <input placeholder="Designation" name="empDesignation" className="form-control" 
                                           value={this.state.empDesignation} onChange={this.changeDesignationHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label>UserName :</label>
                                        <input placeholder="Username" name="username" className="form-control" 
                                           value={this.state.username} onChange={this.changeUsernameHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label>Password :</label>
                                        <input placeholder="Password" name="password" className="form-control" 
                                           value={this.state.password} onChange={this.changePasswordHandler} 
                                           type="password" />
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveEmp} >Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddEmployeeComponent;