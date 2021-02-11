import React from 'react';
import PageManagementService from "../services/PageManagementService";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Form, FormControl, InputGroup, Table,Col} from "react-bootstrap";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()


class PageManagement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageManagementData: [],
            currentPage: 1,
            pageManagementDataPerPage: 5,
            pageSearch:""
        }

    }

    componentDidMount() {
        PageManagementService.getPageManagementData().then((res) => {
            this.setState({pageManagementData: res.data});
            console.log(res.data);
        })
    }

    update = (pageCode) => {
        this.props.history.push(`/UpdatePageManagementData/${pageCode}`);
    }

    deletePageManagementData = (pageCode) => {
        alert(pageCode);
        PageManagementService.deletePageManagementData(pageCode).then((res) => {
            this.setState({pageManagementData: this.state.pageManagementData.filter(PageManagementData => PageManagementData.pageCode !== pageCode)});
        })


    }
    addPage = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    changePage = event => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
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
        if (this.state.currentPage < Math.ceil(this.state.pageManagementData.length / this.state.pageManagementDataPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    }

    lastPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.pageManagementData.length / this.state.pageManagementDataPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.pageManagementData.length / this.state.pageManagementDataPerPage)
            });
        }
    }

    SearchPage = (event) => {
        if (this.state.pageSearch === "") {
            console.log("running if ");
            PageManagementService.getPageManagementData().then((res) => {
                this.setState({pageManagementData: res.data});
                console.log(res.data);
            })
        } else {
            console.log("running else");
            PageManagementService.SearchPageManagementData(this.state.pageSearch).then((res) => {
                this.setState({pageManagementData: res.data});
                console.log(res.data);
            });
            console.log("running else end");
        }

        console.log(this.state.pageSearch);
        event.preventDefault();

    }

    render() {
        const {pageManagementData, currentPage, pageManagementDataPerPage} = this.state;
        const lastIndex = currentPage * pageManagementDataPerPage;
        const firstIndex = lastIndex - pageManagementDataPerPage;
        const currentPageManagementData = pageManagementData.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(pageManagementData.length / pageManagementDataPerPage);
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
                    <Card.Header><h3>Page Management</h3></Card.Header>
                    <Card.Body>
                        <Form id='SearchPage' onSubmit={this.SearchPage}>
                            <Form.Row>
                                <Form.Group as={Col} md="11" controlId='searchPageCode'>
                                    <Form.Control type="text" name='pageSearch'
                                                  placeholder="Page Code to search" value={this.state.pageSearch}
                                                  onChange={this.addPage}/>
                                </Form.Group>
                                <Form.Group  as={Col} md="1"controlId='SearchButton'>

                                    <Button variant="primary" type="submit">Search</Button>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                        <Button variant="secondary"
                                onClick={() => this.props.history.push('/AddUpdatePageM')}>Add
                            New page</Button>

                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>Page Code</th>
                                <th>Description</th>
                                <th>Url</th>
                                <th>Sort Key</th>
                                <th>Status</th>
                                <th>Dual Auth</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                currentPageManagementData.map(
                                    PageManagementData =>
                                        <tr key={PageManagementData.pageCode}>
                                            <td>{PageManagementData.pageCode}</td>
                                            <td>{PageManagementData.description}</td>
                                            <td>{PageManagementData.url}</td>
                                            <td>{PageManagementData.sortKey}</td>
                                            <td>{PageManagementData.status}</td>
                                            <td>{PageManagementData.dualAuth}</td>
                                            <td>
                                                <button onClick={() => this.update(PageManagementData.pageCode)}
                                                        className="btn btn-info">Update
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={() => {
                                                    if (window.confirm('Are you sure to delete this record?')) {
                                                        this.deletePageManagementData(PageManagementData.pageCode)
                                                    }
                                                }} className="btn btn-danger">Delete
                                                </button>
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

export default PageManagement;