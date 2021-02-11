import React, { Component } from 'react';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import {Button, Form} from "react-bootstrap";
import UserMgtService from '../../services/UserMgtService';
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free';
import $ from 'jquery';


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
           password: '',
           unassignBranch:[],
           assignBranch:[],
           currentLsitData:[],
           newListData:[]

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

        this.changeUnassignBranchHandler = this.changeUnassignBranchHandler.bind(this);
        this.changeAssignBranchHandler = this.changeAssignBranchHandler.bind(this);
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
                email: this.state.email, status: this.state.status, password: encoded, assignBranch: this.state.assignBranch};
    
            console.log("Emp object ==> " +JSON.stringify(user));
        
        

    UserMgtService.addUser(user).then(res =>{
            this.props.history.push('/User-Mgt/All-Users');
        })
    }

     
   
    //cancel button function
    cancel(){
        this.props.history.push('/User-Mgt/All-Users');
    }


    //branch assign funtionalites
    changeUnassignBranchHandler=(event) =>{
        //this.setState({value: event.option});
        this.setState({unassignBranch: Array.from(event.target.selectedOptions, (item) => item.value)});
        
    }


    changeAssignBranchHandler=(event) =>{
        //this.setState({value: event.option});
        this.setState({assignBranch: Array.from(event.target.selectedOptions, (item) => item.value)});
        
    }
    
    toRight(){
        $("#currentList option:selected").each(function () {

            $("#newList").append($('<option>', {
                value: $(this).val(),
                text: $(this).text()
            }));
           // this.state.newListData.append($(this).text);
            $(this).remove();
            
        });
       
    }

    toRightAll(){
        $("#currentList option").each(function () {

            $("#newList").append($('<option>', {
                value: $(this).val(),
                text: $(this).text()
            }));
            
            $(this).remove();
            
        });
        
    }

    toLeft(){
        $("#newList option:selected").each(function () {

            $("#currentList").append($('<option>', {
                value: $(this).val(),
                text: $(this).text()
            }));
           // this.state.newListData.remove($(this).text);
            $(this).remove();
        });
    }

    toLeftAll(){
        $("#newList option").each(function () {

            $("#currentList").append($('<option>', {
                value: $(this).val(),
                text: $(this).text()
            }));
            //this.state.newListData.remove($(this).text);
            $(this).remove();
        });
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

                                    {/* Branch slection section */}
                                    <div className="form-group">
                                        
                                        <Form.Group controlId='UnassginBranch'>
                                            <table>
                                                <tr>
                                                    <td style={{float: "left"}}><b>Unassign</b></td>
                                                    <td style={{textAlign: "center"},{ width: "100px"}}></td>
                                                    <td style={{float: "left"}}><b>Assign</b></td>
                                                </tr>

                                                <tr>
                                                    <td style={{float: "right"}}>
                                                        <Form.Control
                                                            as="select"
                                                            name="unassignBranch"
                                                            placeholder="Unassign branch"
                                                            value={this.state.unassignBranch}
                                                            onChange={this.changeUnassignBranchHandler}
                                                            multiple={true}
                                                            id="currentList"
                                                            
                                                        >
                                                            {/* CurrentList otpion values has to be taken from db and listed later on. This for now dummy data */}
                                                            <option value="Wattala" >Wattala</option>
                                                            <option value="Ragama" >Ragama</option>
                                                            <option value="Colombo" >Colombo</option>
                                                            <option value="Rathnapura" >Rathnapura</option>
                                                            <option value="Chilaw" >Chilaw</option>
                                                            <option value="Kandy" >Kandy</option>

                                                        </Form.Control>
                                                    </td>

                                                    <td style={{textAlign: "center"},{width: "100px"}}>
                                                        {/* buttons */}
                                                        
                                                        <Button onClick={this.toRight} style={{fontSize:"10px"},{width:"30px"},{margin:"2px"}}>     <i className="fas fa-angle-right"></i></Button>
                                                        <Button onClick={this.toRightAll}  style={{fontSize:"10px"},{width:"30px"},{margin:"2px"}}>  <i className="fas fa-angle-double-right"></i></Button>
                                                        <Button onClick={this.toLeft}  style={{fontSize:"10px"},{width:"30px"},{margin:"2px"}}>      <i className="fas fa-angle-left"></i></Button>
                                                        <Button onClick={this.toLeftAll}  style={{fontSize:"10px"},{width:"30px"},{margin:"2px"}}>   <i className="fas fa-angle-double-left"></i></Button>
                                                       

                                                    </td>
                                                        
                                                    <td style={{float: "left"}}>
                                                        <Form.Control
                                                                as="select"
                                                                name="assignBranch"
                                                                placeholder="Assgin branch"
                                                                value={this.state.assignBranch}
                                                                onChange={this.changeAssignBranchHandler}
                                                                multiple={true}
                                                                id="newList"
                                                                
                                                            >
                                                               
                                                                

                                                            </Form.Control>
                                                    </td>
                                                </tr>
                                            </table>
                                                
                                       
                                                
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