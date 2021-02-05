import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Table, Button, InputGroup, FormControl, Form, Col} from 'react-bootstrap';
import UserMgtService from '../../services/UserMgtService';

class ListUserComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            users:[],
            currentPage:1,
            usersPerPage:5,
            userTypeSearch:''
        }

        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.changeCodeSearch = this.changeCodeSearch.bind(this);
        
        
    }

    //this is to get the @GetMapping from the REST API and get all the values from the relavent method
    componentDidMount(){
        UserMgtService.getUsers().then((res)=>{
            this.setState({ users: res.data});
        })
    }

    //routing the add employee button
    addUser(){
        this.props.history.push("/User-Mgt/Add-User");
    }

    

    //routing the update button
    editUser(empId){
        this.props.history.push(`/User-Mgt/Update-User/${empId}`);
    }

    //delete option
    deleteUser(empId){
        UserMgtService.deleteUser(empId).then(res=>{
            

            this.setState({users: this.state.users.filter(user => user.employeeId !== empId)});
        });
    }

    //pagination button events
    changePage = event => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        });
    }

    firstPage = () => {
        if(this.state.currentPage > 1){
            this.setState({
                currentPage:1
            });
        }
    }

    prevPage = () => {
        if(this.state.currentPage > 1){
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    }

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.users.length / this.state.usersPerPage)){
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    }

    lastPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.users.length / this.state.usersPerPage)){
            this.setState({
                currentPage: Math.ceil(this.state.users.length / this.state.usersPerPage)
            });
        }
    }

    //search
    SearchUserType = (event) => {

        if (this.state.userTypeSearch === "") {
            console.log("running if ");
            UserMgtService.getUsers().then((res) => {
                this.setState({users: res.data});
                console.log(res.data);
            })
        } else {
            console.log("running else");
            UserMgtService.searchUser(this.state.userTypeSearch).then((res) => {
                this.setState({users: res.data});
                console.log(res.data);
            });
            console.log("running else end");
        }

        console.log(this.state.userTypeSearch);
        event.preventDefault();
    }

    
    changeCodeSearch=(event)=>{
        this.setState({userTypeSearch: event.target.value});
    }
    
    render() {
        const {users, currentPage, usersPerPage}= this.state;
        const lastIndex = currentPage * usersPerPage;
        const firstIndex = lastIndex - usersPerPage;
        const currentUsers = users.slice(firstIndex, lastIndex);
        const totalPages = users.length / usersPerPage;

        const PageNumCss = {
            width: "45px",
            border: "1px solid #17A288",
            color: "#17A288",
            textAlign: "center",
            fontWeight: "bold"
        };

        const downloadSuccess={
            color: 'white',
            
            fontSize: '13px'
        };
        const container={
            paddingLeft : '100px'
        };

        return (
            <div style={container}>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><h3>Users</h3></Card.Header>
                    
                    <button style={{"width":"auto"}} className="btn btn-primary" onClick={this.addUser}>Add User</button>
                    
                    <Card.Body>
                        <Form id='SearchUserType' onSubmit={this.SearchUserType}>
                                <Form.Row>
                                    <Form.Group as={Col} md="11" controlId='userCode'>
                                        <Form.Control type="text" name='userTypeSearch'
                                                    placeholder="User Role Code to search" value={this.state.userTypeSearch}
                                                    onChange={this.changeCodeSearch}/>
                                    </Form.Group>
                                    <Form.Group as={Col} md="1">
                                        <Button variant="primary" type="submit">Search</Button>
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                <th>User Name</th>
                                <th>Employee Id</th>
                                <th>Full Name</th>
                                <th>Userrole Code</th>
                                <th>Userrole Description</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                currentUsers.map(
                                    user =>
                                    <tr key = {user.employeeId}>
                                        <td>{user.username}</td>
                                        <td>{user.employeeId}</td>
                                        <td>{user.fullName}</td>
                                        <td>{user.userRole}</td>
                                        <td>{user.userRoleDescription}</td>
                                        <td>{user.email}</td>
                                        <td>{user.status}</td>
                                        <td>
                                            <button onClick= { () => this.editUser(user.employeeId)} className="btn btn-info">Update</button>
                                            <button style={{marginLeft:"10px"}} onClick= { () =>{if(window.confirm('Are you sure to delete this record?')) {this.deleteUser(user.employeeId)}}} className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>

                        </Table>
                    </Card.Body>
                    <Card.Footer>
                    
                        <div style={{"float":"left"}}>
                            Showing Page {currentPage} of {(totalPages)}
                        </div>
                        <div style={{"float":"right"}}>
                            <InputGroup size="50">
                                <InputGroup.Prepend>
                                    <Button type="button" variant="outline-info" disabled={currentPage === 1? true : false}
                                        onClick={this.firstPage}>
                                        First

                                    </Button>
                                    <Button type="button" variant="outline-info" disabled={currentPage === 1? true : false} 
                                        onClick={this.prevPage}>
                                        Prev
                                    </Button>
                                </InputGroup.Prepend>
                                <FormControl style={PageNumCss} className="bg-dark" name="currentPage" value={currentPage} 
                                    onChange={this.changePage} />
                                <InputGroup.Append>
                                    <Button type="button" variant="outline-info" disabled={currentPage === totalPages? true : false}
                                        onClick={this.nextPage}>
                                        Next
                                    </Button>
                                    <Button type="button" variant="outline-info" disabled={currentPage === totalPages? true : false}
                                        onClick={this.lastPage}>
                                        Last
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Footer>
                </Card>


        
            </div>
        );
    }
}

export default ListUserComponent;