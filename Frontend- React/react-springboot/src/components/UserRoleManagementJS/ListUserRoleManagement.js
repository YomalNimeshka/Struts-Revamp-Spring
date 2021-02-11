import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Col, Form, FormControl, InputGroup, Table} from 'react-bootstrap';
import UserRoleManagementService from "../../services/UserRoleManagementService";



class ListUserRoleManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            UserRoleManagementData: [],
            currentPage: 1,
            UserRoleManagementDataPerPage: 5,
            userTypeSearch:" "
        }
    }

    componentDidMount() {
        UserRoleManagementService.getUserRoleManagementData().then((res) => {
            this.setState({UserRoleManagementData: res.data});
            console.log(res.data);

        })
    }

    changePage = event => {
        this.setState({
            [event.target.name]: (event.target.value)
        });
    }
    firstPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            });
        }
    }

    prevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });

        }
    }

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.UserRoleManagementData.length / this.state.UserRoleManagementDataPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    }

    lastPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.UserRoleManagementData.length / this.state.UserRoleManagementDataPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.UserRoleManagementData.length / this.state.UserRoleManagementDataPage)
            });
        }
    }
    deleteUserRoleData = (userRoleCode) => {
        UserRoleManagementService.deleteUserRoleManagement(userRoleCode).then((res) => {
            this.setState({UserRoleManagementData: this.state.UserRoleManagementData.filter(UserRoleManagementData => UserRoleManagementData.userRoleCode !== userRoleCode)});
        })

    }
    update = (userRoleCode) => {
        this.props.history.push(`/UpdateUserRole/${userRoleCode}`);
    }

    SearchUserType = (event) => {

        if (this.state.userTypeSearch === "") {
            console.log("running if ");
            UserRoleManagementService.getUserRoleManagementData().then((res) => {
                this.setState({UserRoleManagementData: res.data});
                console.log(res.data);
            })
        } else {
            console.log("running else");
            UserRoleManagementService.SearchUserRoleManagement(this.state.userTypeSearch).then((res) => {
                this.setState({UserRoleManagementData: res.data});
                console.log(res.data);
            });
            console.log("running else end");
        }

        console.log(this.state.userTypeSearch);
        event.preventDefault();
    }

    render() {
        const {UserRoleManagementData, currentPage, UserRoleManagementDataPerPage} = this.state;
        const lastIndex = currentPage * UserRoleManagementDataPerPage;
        const firstIndex = lastIndex - UserRoleManagementDataPerPage;
        const currentUserRoleManagementData = UserRoleManagementData.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(UserRoleManagementData.length / UserRoleManagementDataPerPage);
        const PageNumCss = {
            width: "45px",
            border: "1px solid #17A288",
            color: "#17A288",
            textAlign: "center",
            fontWeight: "bold"
        };
        const container = {
            paddingLeft: '250px',
            paddingRight: '200px'
        };

        return (
            <div style={container}>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><h3>User Role Management </h3></Card.Header>
                    <Card.Body>
                        <Form id='SearchUserType' onSubmit={this.SearchUserType}>
                            <Form.Row>
                                <Form.Group as={Col} md="11" controlId='userRoleCode'>
                                    <Form.Control type="text" name='userTypeSearch'
                                                  placeholder="Page Code to search" value={this.state.userTypeSearch}
                                                  onChange={this.changePage}/>
                                </Form.Group>
                                <Form.Group as={Col} md="1">
                                    <Button variant="primary" type="submit">Search</Button>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                        <Button variant="secondary" onClick={() => this.props.history.push('/AddUserRole')}>
                            Add New User Role
                        </Button>

                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>User Role Code</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>User Role Type</th>
                                <th>Edit</th>
                                <th>Delete</th>
                                <th>Assign page to Section</th>
                                <th>Assign Task to Page</th>
                                <th>Assign Transaction</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                currentUserRoleManagementData.map(
                                    URMData =>
                                        <tr key={URMData.userRoleCode}>
                                            <td>{URMData.userRoleCode}</td>
                                            <td>{URMData.description}</td>
                                            <td>{URMData.status}</td>
                                            <td>{URMData.userRoleType}</td>
                                            <td>
                                                <Button variant="secondary" size="sm" onClick={() => this.update(URMData.userRoleCode)}>
                                                    Edit
                                                </Button>
                                            </td>
                                            <td>
                                                <Button size="sm" variant="danger" onClick={() => {
                                                    if (window.confirm('Are you sure to delete this record?')) {
                                                        this.deleteUserRoleData(URMData.userRoleCode)
                                                    }
                                                }}  >Delete
                                                </Button>
                                            </td>
                                            <td>
                                                <Button variant="secondary" size="sm">
                                                    change
                                                </Button>
                                            </td>
                                            <td>
                                                <Button variant="secondary" size="sm">
                                                    change
                                                </Button>
                                            </td>
                                            <td>
                                                <Button variant="secondary" size="sm">
                                                    change
                                                </Button>
                                            </td>
                                        </tr>
                                )
                            }
                            </tbody>

                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        <div style={{"float": "left"}}>
                            Showing Page {currentPage} of {(totalPages)}
                        </div>
                        <div style={{"float": "right"}}>
                            <InputGroup size="50">
                                <InputGroup.Prepend>
                                    <Button type="button" variant="outline-info"
                                            disabled={currentPage === 1 ? true : false}
                                            onClick={this.firstPage}>
                                        First

                                    </Button>
                                    <Button type="button" variant="outline-info"
                                            disabled={currentPage === 1 ? true : false}
                                            onClick={this.prevPage}>
                                        Prev
                                    </Button>
                                </InputGroup.Prepend>
                                <FormControl style={PageNumCss} className="bg-dark" name="currentPage"
                                             value={currentPage}
                                             onChange={this.changePage}/>
                                <InputGroup.Append>
                                    <Button type="button" variant="outline-info"
                                            disabled={currentPage === totalPages ? true : false}
                                            onClick={this.nextPage}>
                                        Next
                                    </Button>
                                    <Button type="button" variant="outline-info"
                                            disabled={currentPage === totalPages ? true : false}
                                            onClick={this.lastPage}>
                                        Last
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>

                    </Card.Footer>
                </Card>
            </div>
        )
    }
}

export default ListUserRoleManagement