import React, {Component} from 'react';
import {Button, Card, FormControl, InputGroup, Table, Form, Col} from "react-bootstrap";
import SectionMgtService from '../../services/SectionMgtService';

class ListSectionComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            sections:[],
            currentPage:1,
            usersPerPage:5,
            userTypeSearch:''

        }

        this.addSection = this.addSection.bind(this);
        this.editSection = this.editSection.bind(this);
        this.deleteSection = this.deleteSection.bind(this);

        this.changeCodeSearch = this.changeCodeSearch.bind(this);


    }

        //this is to get the @GetMapping from the REST API and get all the values from the relavent method
        componentDidMount(){
            SectionMgtService.getSections().then((res)=>{
                this.setState({ sections: res.data});
            })
        }
    
        //routing the add employee button
        addSection(){
            this.props.history.push("/Section-Mgt/Add-Section");
        }
    
        
    
        //routing the update button
        editSection(sectionCode){
            this.props.history.push(`/Section-Mgt/Update-Section/${sectionCode}`);
        }
    
        //delete option
        deleteSection(sectionCode){
            SectionMgtService.deleteSection(sectionCode).then(res=>{
                
    
                this.setState({sections: this.state.sections.filter(section => section.sectionCode !== sectionCode)});
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
            if(this.state.currentPage < Math.ceil(this.state.sections.length / this.state.usersPerPage)){
                this.setState({
                    currentPage: this.state.currentPage + 1
                });
            }
        }
    
        lastPage = () => {
            if(this.state.currentPage < Math.ceil(this.state.sections.length / this.state.usersPerPage)){
                this.setState({
                    currentPage: Math.ceil(this.state.sections.length / this.state.usersPerPage)
                });
            }
        }

        //search
    SearchUserType = (event) => {

        if (this.state.userTypeSearch === "") {
            console.log("running if ");
            SectionMgtService.getSections().then((res) => {
                this.setState({sections: res.data});
                console.log(res.data);
            })
        } else {
            console.log("running else");
            SectionMgtService.search(this.state.userTypeSearch).then((res) => {
                this.setState({sections: res.data});
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
        
        const {sections, currentPage, usersPerPage}= this.state;
        const lastIndex = currentPage * usersPerPage;
        const firstIndex = lastIndex - usersPerPage;
        const currentUsers = sections.slice(firstIndex, lastIndex);
        const totalPages = sections.length / usersPerPage;

        const PageNumCss = {
            width: "45px",
            border: "1px solid #17A288",
            color: "#17A288",
            textAlign: "center",
            fontWeight: "bold"
        };

       
        const container={
            paddingLeft : '100px'
        };

        return (
            <div style={container}>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><h3>Section List</h3></Card.Header>

                    <button style={{"width":"auto"}} className="btn btn-primary" onClick={this.addSection}>Add Sections</button>

                    <Card.Body>
                            <Form id='SearchUserType' onSubmit={this.SearchUserType}>
                                <Form.Row>
                                    <Form.Group as={Col} md="11" controlId='userCode'>
                                        <Form.Control type="text" name='userTypeSearch'
                                                    placeholder="Status Code to search" value={this.state.userTypeSearch}
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
                                    <th>Section Code</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Sort Key</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentUsers.map(
                                        section =>
                                            <tr key = {section.sectionCode}>
                                                <td>{section.sectionCode}</td>
                                                <td>{section.description}</td>
                                                <td>{section.status}</td>
                                                <td>{section.sortKey}</td>
                                                
                                                <td>
                                                    <button onClick= { () => this.editSection(section.sectionCode)} className="btn btn-info">Update</button>
                                                    <button style={{marginLeft:"10px"}} onClick= { () =>{if(window.confirm('Are you sure to delete this section?')) {this.deleteSection(section.sectionCode)}}} className="btn btn-danger">Delete</button>
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

export default ListSectionComponent;