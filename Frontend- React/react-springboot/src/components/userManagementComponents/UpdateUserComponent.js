import React, { Component } from 'react';
import {Form} from "react-bootstrap";
import UserMgtService from '../../services/UserMgtService';

class UpdateUserComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            employeeId: this.props.match.params.employeeId,
            username:'',
            fullName:'',
            userRole:'',
            email:''
           
        }
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changeFullNameHandler = this.changeFullNameHandler.bind(this);
        this.changeUserRoleHandler = this.changeUserRoleHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);

        this.updateUser = this.updateUser.bind(this);
        
    }
    componentDidMount(){
        UserMgtService.getUserByEmployeeId(this.state.employeeId).then( (res) =>{
            let userData = res.data;
            console.log("Section object ==> " +JSON.stringify(userData));
            this.setState({username: userData.username,
                fullName: userData.fullName,
                userRole: userData.userRole,
                email: userData.email
            });
        });
    }

    changeUsernameHandler=(event)=>{
        this.setState({username: event.target.value});
    }
    changeFullNameHandler=(event)=>{
        this.setState({fullName: event.target.value});
    }
    changeUserRoleHandler=(event)=>{
        this.setState({userRole: event.target.value});
    }
    changeEmailHandler=(event)=>{
        this.setState({email: event.target.value});
    }

    //save button function
    updateUser = (e)=>{
        e.preventDefault();
        let user = {username: this.state.username, fullName: this.state.fullName, userRole: this.state.userRole, email: this.state.email};

        console.log("Section object ==> " +JSON.stringify(user));

        UserMgtService.updateUser(user, this.state.employeeId).then(res=>{
            this.props.history.push(`/User-Mgt/All-Users`);
        });
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
                        <h3 className="text-center">Update User</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>User Name :</label>
                                    <input placeholder="USer Name" name="username" className="form-control" 
                                       value={this.state.username} onChange={this.changeUsernameHandler} />
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
                                                    required="required"
                                                >
                                                    <option value="Admin" >Admin</option>
                                                    <option value="Super Admin" >Super Admin</option>

                                                </Form.Control>
                                        </Form.Group>
                                    </div>

                                <div className="form-group">
                                    <label>Email :</label>
                                    <input placeholder="Email" name="email" className="form-control" 
                                       value={this.state.email} onChange={this.changeEmailHandler} />
                                </div>

                                <button className="btn btn-success" onClick={this.updateUser} >Save</button>
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

export default UpdateUserComponent;