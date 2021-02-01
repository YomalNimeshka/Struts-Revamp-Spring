import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Col, Form} from "react-bootstrap";
import PageManagementService from "../services/PageManagementService";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

class AddUpdatePageM extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.inState;
    }

    inState = {
        pageCode: "",
        description: "",
        url: "",
        sortKey: "",
        status: "",
        dualAuth: ""
    }
    addPage = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    submitPage = (event) => {
        const pageD = {
            "pageCode": this.state.pageCode,
            "description": this.state.description,
            "url": this.state.url,
            "sortKey": this.state.sortKey,
            "status": this.state.status,
            "dualAuth": this.state.dualAuth,
            "remarks": "a"
        };
        console.log(pageD);
        PageManagementService.addPageManagementData(pageD).then((res) => {
            toast.success('successful');
            this.props.history.push('/pageManagement');
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
                    <Card.Header><h1>Add Employee</h1></Card.Header>

                    <Card.Body>
                        <Form id='addPage' onSubmit={this.submitPage}>

                            <Form.Row>

                                <Form.Group as={Col} controlId='pageCode'>
                                    <Form.Label> Page Code</Form.Label>
                                    <Form.Control type="text" name='pageCode'
                                                  placeholder="Page Code" value={this.state.pageCode}
                                                  onChange={this.addPage} required/>
                                </Form.Group>
                                <Form.Group as={Col} controlId='description'>
                                    <Form.Label> Description</Form.Label>
                                    <Form.Control type="text" name='description'
                                                  placeholder="Description" value={this.state.description}
                                                  onChange={this.addPage} required/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId='url'>
                                    <Form.Label> URL</Form.Label>
                                    <Form.Control type="text" name='url'
                                                  placeholder="URl" value={this.state.url}
                                                  onChange={this.addPage} required/>
                                </Form.Group>
                                <Form.Group as={Col} controlId='sortKey'>
                                    <Form.Label> Sort Key</Form.Label>
                                    <Form.Control type="text" name='sortKey'
                                                  placeholder="Sort Key" value={this.state.sortKey}
                                                  onChange={this.addPage} required/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId='status'>
                                    <Form.Label> Status</Form.Label>
                                    <Form.Control type="text" name='status'
                                                  placeholder="Status" value={this.state.status}
                                                  onChange={this.addPage} required/>
                                </Form.Group>
                                <Form.Group as={Col} controlId='dualAuth'>
                                    <Form.Label> Dual Auth</Form.Label>
                                    <Form.Control type="text" name='dualAuth'
                                                  placeholder="Dual Auth" value={this.state.dualAuth}
                                                  onChange={this.addPage} required/>
                                </Form.Group>
                            </Form.Row>
                        <Form.Row>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Form.Row>

                        </Form>
                    </Card.Body>
                </Card>

            </div>

        )
    }
}

export default AddUpdatePageM