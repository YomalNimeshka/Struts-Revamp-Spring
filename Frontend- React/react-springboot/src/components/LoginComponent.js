import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class LoginComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            username:'',
            password:'',
            loginMessage:''
           
        }
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);

        this.loginUser = this.loginUser.bind(this);
    }
    
    //this is for the authentication for the login to get through
    loginUser=(e)=>{
        e.preventDefault();
        //setting up the username and password entered in the form to a object to sent to the REST API
        let user = {username: this.state.username, password: this.state.password}
        //console.log('user details == ' +JSON.stringify(user));
        
        var canLogin;
        EmployeeService.loginUserIn(user).then((res)=>{
            //setting the @postmapping return value from REST api to canLogin var
            canLogin = res.data;
            console.log("login value 2: "+canLogin);

            //if login value is 1 means that there is a user can that user can now login
            if(canLogin === 1){
                this.setState({loginMessage: 'Login Success'});
                this.props.history.push('/AllEmployees');


            //if login value is 0 means there is no user as such so the user cannot login
            }else if(canLogin === 0){
                this.setState({loginMessage: 'Login Failed. UserName or Password maybe wrong.'});
                this.props.history.push('/Login');
            }
        });
       
    }

    changeUsernameHandler = (event) => {
        this.setState({username: event.target.value});
    }
    changePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }


    render() {
        //css part for the login error msg
        const loginTextMsg={
            color: 'red',
            fontWeight: 'bold',
            fontSize: '13px'
        }
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Login</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>User Name:</label>
                                        <input placeholder="User Name" name="username" className="form-control"
                                            value={this.state.username} onChange={this.changeUsernameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Password:</label>
                                        <input placeholder="Password" name="password" className="form-control"
                                            type="password" value={this.state.password} onChange={this.changePasswordHandler}/>
                                    </div>
                                    <div className="form-group" >
                                        <label style={loginTextMsg}>{this.state.loginMessage}</label>
                                    </div>
                                    
                                    <button className="btn btn-primary" onClick={this.loginUser}>Login</button>
                                    
                                </form>
                            </div>
                        </div>

                    </div>    
                </div> 
                
            </div>
        );
    }
}

export default LoginComponent;