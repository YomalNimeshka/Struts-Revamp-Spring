import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class UpdateEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            empId: this.props.match.params.empId,
            empName:'',
            empSalary:'',
            empDesignation:'',
           
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSalaryHandler = this.changeSalaryHandler.bind(this);
        this.changeDesignationHandler = this.changeDesignationHandler.bind(this);
        this.updateEmp = this.updateEmp.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.empId).then( (res) =>{
            let employeeData = res.data;
            this.setState({empName: employeeData.empName,
                empSalary: employeeData.empSalary,
                empDesignation: employeeData.empDesignation});
        });
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

    //save button function
    updateEmp = (e)=>{
        e.preventDefault();
        let employee = {empName: this.state.empName, empSalary: this.state.empSalary, empDesignation: this.state.empDesignation,
           };

        console.log("Emp object ==> " +JSON.stringify(employee));

        EmployeeService.updateEmployee(employee, this.state.empId).then(res=>{
            this.props.history.push(`/AllEmployees`);
        });
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
                        <h3 className="text-center">Update Employee</h3>
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

                                <button className="btn btn-success" onClick={this.updateEmp} >Save</button>
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

export default UpdateEmployeeComponent;