import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Table, Button, InputGroup, FormControl} from 'react-bootstrap';
import EmployeeService from '../services/EmployeeService';

class ListEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            employees:[],
            currentPage:1,
            usersPerPage:5,
            downloadStatus: "",
            file:'',
            uploadStatus:""
        }

        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.pdfReport = this.pdfReport.bind(this);
        this.excelReport = this.excelReport.bind(this);
        this.csvReport = this.csvReport.bind(this);

    }

    //this is to get the @GetMapping from the REST API and get all the values from the relavent method
    componentDidMount(){
        EmployeeService.getEmployees().then((res)=>{
            this.setState({ employees: res.data});
        })
    }

    //routing the add employee button
    addEmployee(){
        this.props.history.push("/AddEmployees");
    }



    //routing the update button
    editEmployee(empId){
        this.props.history.push(`/UpdateEmployee/${empId}`);
    }

    //delete option
    deleteEmployee(empId){
        alert(empId);
        EmployeeService.deleteEmployee(empId).then(res=>{
            this.setState({employees: this.state.employees.filter(employee => employee.empId !== empId)});
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
        if(this.state.currentPage < Math.ceil(this.state.employees.length / this.state.usersPerPage)){
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    }

    lastPage = () => {

        if(this.state.currentPage < Math.ceil(this.state.employees.length / this.state.usersPerPage)){
            this.setState({
                currentPage: Math.ceil(this.state.employees.length / this.state.usersPerPage)
            });
        }
    }


    //reports
    pdfReport(){
        // this.props.history.push(`/Reports/${'pdf'}`);
        const format = `${"pdf"}`;
         EmployeeService.getReport(format).then(res=>{
             var path = res.data;
             this.setState({downloadStatus: 'Download Complete at ' + path});
             this.props.history.push('/AllEmployees');
         });
     }

    excelReport(){
        // this.props.history.push(`/Reports/${'pdf'}`);
        const format = `${"excel"}`;
         EmployeeService.getReport(format).then(res=>{
            var path = res.data;
            this.setState({downloadStatus: 'Download Complete at ' + path});
             this.props.history.push('/AllEmployees');
         });
     }
     csvReport(){
        // this.props.history.push(`/Reports/${'pdf'}`);
        const format = `${"csv"}`;
         EmployeeService.getReport(format).then(res=>{
            var path = res.data;
            this.setState({downloadStatus: 'Download Complete at ' + path});
             this.props.history.push('/AllEmployees');
         });
     }

     //upload section
     onFileChange = (event) => {
         this.setState({
             file: event.target.files[0]
         });
     }


     uploadFile = (event)=>{
         event.preventDefault();
          const data = new FormData();
          data.append('file', this.state.file);
          console.log("upload--"+data)

          EmployeeService.uploadCSV(data).then(res=>{
              this.setState({uploadStatus: 'File Uploaded'});
              window.location.reload(false);
              this.props.history.push('/AllEmployees');
          });
     }

    render() {
        const {employees, currentPage, usersPerPage}= this.state;
        const lastIndex = currentPage * usersPerPage;
        const firstIndex = lastIndex - usersPerPage;
        const currentUsers = employees.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(employees.length / usersPerPage);

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
            paddingLeft : '250px',
            paddingRight : '200px'
        };

        return (
            <div style={container}>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><h3>Employee List</h3></Card.Header>

                    <button style={{"width":"auto"}} className="btn btn-primary" onClick={this.addEmployee}>Add Employees</button>

                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                <th>Employee Id</th>
                                <th>Employee Name</th>
                                <th>Employee Salary</th>
                                <th>Employee Designation</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                currentUsers.map(
                                    employee =>
                                    <tr key = {employee.empId}>
                                        <td>{employee.empId}</td>
                                        <td>{employee.empName}</td>
                                        <td>{employee.empSalary}</td>
                                        <td>{employee.empDesignation}</td>
                                        <td>
                                            <button onClick= { () => this.editEmployee(employee.empId)} className="btn btn-info">Update</button>
                                            <button style={{marginLeft:"10px"}} onClick= { () =>{if(window.confirm('Are you sure to delete this record?')) {this.deleteEmployee(employee.empId)}}} className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>

                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        <div>
                            <button style={{width:"auto",marginRight:"5px"}} className="btn btn-primary" onClick={this.pdfReport}>Download PDF</button>
                            <button style={{width:"auto", marginRight:"5px"}} className="btn btn-primary" onClick={this.excelReport}>Download Excel</button>
                            <button style={{width:"auto", marginRight:"5px"}} className="btn btn-primary" onClick={this.csvReport}>Download CSV</button>
                        </div>
                        <div style={{"marginTop":"5px"}}>
                           <input onChange={this.onFileChange} type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"></input>
                            <button style={{"width":"auto"}} className="btn btn-primary" onClick={this.uploadFile}>Upload CSV</button>
                        </div>
                        <div>
                        <label style={downloadSuccess}>{this.state.downloadStatus}</label>
                        <label style={downloadSuccess}>{this.state.uploadStatus}</label>
                        </div>
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

export default ListEmployeeComponent;