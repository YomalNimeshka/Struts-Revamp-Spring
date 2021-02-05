import React, { Component } from 'react';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import {Form} from "react-bootstrap";
import UserMgtService from '../../services/UserMgtService';

class AddUserComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
           username:'',
           employeeId:'',
           fullName:'',
           userRole:'',
           userRoleDescription:'',
           email:'',
           status: '',
           password: ''

        }

        this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
        this.changeEmployeeIdHandler = this.changeEmployeeIdHandler.bind(this);
        this.changeFullNameHandler = this.changeFullNameHandler.bind(this);
        this.changeUserRoleHandler = this.changeUserRoleHandler.bind(this);
        this.changeUserRoleDescriptionHandler = this.changeUserRoleDescriptionHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);

        this.saveUser = this.saveUser.bind(this);
    }
    changeUserNameHandler=(event)=>{
        this.setState({username: event.target.value});
    }
    changeEmployeeIdHandler=(event)=>{
        this.setState({employeeId: event.target.value});
    }
    changeFullNameHandler=(event)=>{
        this.setState({fullName: event.target.value});
    }
    changeUserRoleHandler=(event)=>{
        this.setState({userRole: event.target.value});
    }

    
    changeUserRoleDescriptionHandler=(event)=>{
        this.setState({userRoleDescription: event.target.value});
    }
    changeEmailHandler=(event)=>{
        this.setState({email: event.target.value});
    }
    changeStatusHandler=(event)=>{
        this.setState({status: event.target.value});
    }
    changePasswordHandler=(event)=>{
        this.setState({password: event.target.value});
    }

    //save button function
    saveUser = (e)=>{
        e.preventDefault();
            let encoded = base64_encode(this.state.password);
            
           
            let user = {username: this.state.username, employeeId: this.state.employeeId, fullName: this.state.fullName,
                userRole: this.state.userRole, userRoleDescription: this.state.userRoleDescription,
                email: this.state.email, status: this.state.status, password: encoded};
    
            console.log("Emp object ==> " +JSON.stringify(user));
        
        

    UserMgtService.addUser(user).then(res =>{
            this.props.history.push('/User-Mgt/All-Users');
        })
    }

     
   
    //cancel button function
    cancel(){
        this.props.history.push('/User-Mgt/All-Users');
    }
    render() {
       
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Add User</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>UserName :</label>
                                        <input required="required" placeholder="User Name" name="username" className="form-control" 
                                           value={this.state.username} onChange={this.changeUserNameHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label>Employee ID :</label>
                                        <input required="required" placeholder="Employee Id" name="employeeId" className="form-control" 
                                           value={this.state.employeeId} onChange={this.changeEmployeeIdHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label>Full Name :</label>
                                        <input placeholder="Full Name" name="fullName" className="form-control" 
                                           value={this.state.fullName} onChange={this.changeFullNameHandler} />
                                    </div>

                                    {/* <div className="form-group">
                                        <label>User Role :</label>
                                        <input placeholder="User Role" name="userRole" className="form-control" 
                                           value={this.state.userRole} onChange={this.changeUserRoleHandler} />
                                    </div> */}

                                    <div className="form-group">
                                        <Form.Group controlId='userRole'>
                                            <Form.Label>User Role :</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    name="userRole"
                                                    placeholder="User Role"
                                                    value={this.state.userRole}
                                                    onChange={this.changeUserRoleHandler}
                                                    
                                                    required
                                                >
                                                    <option value="" disabled="disabled" >Select User Role</option>
                                                    <option value="Admin" >Admin</option>
                                                    <option value="Super Admin" >Super Admin</option>

                                                </Form.Control>
                                        </Form.Group>
                                    </div>

                                    <div className="form-group">
                                        <label>User Role Description :</label>
                                        <input placeholder="User Role Description" name="userRoleDescription" className="form-control" 
                                           value={this.state.userRoleDescription} onChange={this.changeUserRoleDescriptionHandler} 
                                           />
                                    </div>

                                    <div className="form-group">
                                        <label>Email :</label>
                                        <input required="required" placeholder="Email" name="email" className="form-control" 
                                           value={this.state.email} onChange={this.changeEmailHandler} 
                                            />
                                    </div>

                                    {/* <div className="form-group">
                                        <label>Status :</label>
                                        <input placeholder="Status" name="status" className="form-control" 
                                           value={this.state.status} onChange={this.changeStatusHandler} 
                                           />
                                    </div> */}
                                    <div className="form-group">
                                        <Form.Group controlId='status'>
                                        <Form.Label> Status</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="status"
                                                placeholder="Status"
                                                value={this.state.status}
                                                onChange={this.changeStatusHandler}
                                                
                                                required
                                            >
                                                <option value="" disabled="disabled" >Select Status</option>
                                                <option value="Active" >Active</option>
                                                <option value="Deactivate" >Deactivate</option>

                                            </Form.Control>
                                        </Form.Group>

                                    </div>

                                    <div className="form-group">
                                        <label>Password :</label>
                                        <input required="required" placeholder="Password" name="password" className="form-control" 
                                           value={this.state.password} onChange={this.changePasswordHandler} 
                                           type="password" />
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveUser} >Save</button>
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

export default AddUserComponent;