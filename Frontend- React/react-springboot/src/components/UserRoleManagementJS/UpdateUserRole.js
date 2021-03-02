import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Form} from "react-bootstrap";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserRoleManagementService from "../../services/UserRoleManagementService";

toast.configure()

class UpdateUserRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRoleCode: this.props.match.params.userRoleCode,
            description: "",
            status: "",
            userRoleType: ""
        };
        console.log(this.state.userRoleCode);
    }
    componentDidMount(){
        UserRoleManagementService.getOneUserRoleManagement(this.state.userRoleCode).then( (res) =>{
            let userRoleData = res.data;
            console.log(userRoleData);
            this.setState({
                userRoleCode:userRoleData.userRoleCode ,
                description: userRoleData.description ,
                status: userRoleData.status ,
                userRoleType: userRoleData.userRoleType

            });
        });
    }


    addUser = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    UpdateUserRole = (event) => {
        const userD = {
            "userRoleCode":this.state.userRoleCode,
            "description": this.state.description,
            "status": this.state.status,
            "userRoleType": this.state.userRoleType
        };
        console.log(userD)
        UserRoleManagementService.updateUserRoleManagement(userD).then((res) => {
            toast.success('successful');
            this.props.history.push('/AllUserRoleManagement');
        })
        event.preventDefault();
    }

    render() {
        const container = {
            paddingLeft: '250px',
            paddingRight: '200px'
        };
        return (
            <div style={container}>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><h1>Update User Role</h1></Card.Header>
                    <Card.Body>
                        <Form id='addUserRole' onSubmit={this.UpdateUserRole}>
                            <Form.Group controlId='userRoleCode'>
                                <Form.Label> User Role Code</Form.Label>
                                <Form.Control type="text" name='userRoleCode'
                                              placeholder="User Role Code" value={this.state.userRoleCode}
                                              onChange={this.addUser} required/>
                            </Form.Group>
                            <Form.Group controlId='description'>
                                <Form.Label> Description</Form.Label>
                                <Form.Control type="text" name='description'
                                              placeholder="Description" value={this.state.description}
                                              onChange={this.addUser} required/>
                            </Form.Group>
                            <Form.Group controlId='status'>
                                <Form.Label> Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="status"
                                    placeholder="Status"
                                    value={this.state.status}
                                    onChange={this.addUser}
                                    required
                                >
                                    <option value="Active" >Active</option>
                                    <option value="Deactivate" >Deactivate</option>

                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='userRoleType'>
                                <Form.Label> User Role Type</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="userRoleType"
                                    placeholder="User Role Type"
                                    value={this.state.userRoleType}
                                    onChange={this.addUser}
                                    required
                                >
                                    <option value="web user">web user</option>
                                    <option value="terminal user" >terminal user</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary" type="submit">Update</Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>

            </div>
        )
    }

}

export default UpdateUserRole