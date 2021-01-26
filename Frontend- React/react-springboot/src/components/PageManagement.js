import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Table} from "react-bootstrap";

class PageManagement extends  Component{
    render() {
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
        return(
            <div style={container}>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><h3></h3></Card.Header>

                    <button style={{"width":"auto"}} className="btn btn-primary" >Add Page</button>

                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>Page Code</th>
                                <th>Description</th>
                                <th>Url</th>
                                <th>Sort Key</th>
                                <th>Status</th>
                                <th>Dual Auth</th>
                            </tr>
                            </thead>
                            <tbody>

                            </tbody>

                        </Table>
                    </Card.Body>
                    <Card.Footer>
                    </Card.Footer>
                </Card>
            </div>
        )



    }

                        }
export default PageManagement;