import React, {Component} from "react";
import {Button, Card, Form} from "react-bootstrap";
import $ from 'jquery';
import UserRoleManagementService from "../services/UserRoleManagementService";
import SectionMgtService from "../services/SectionMgtService";
import PageManagementService from "../services/PageManagementService";
import {AiFillCaretRight} from "react-icons/ai";
import { AiFillCaretLeft} from "react-icons/ai";
import { AiFillBackward} from "react-icons/ai";
import { AiFillForward} from "react-icons/ai";
import {toast} from "react-toastify";




class UserSectionPasges extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userRoleCode: this.props.match.params.userRoleCode,
            sections:"",
            unassignPage:"",
            assignBranch:[],
            sectionData:[],
            pagesData:[]
        };
        console.log(this.state.userRoleCode);
        this.changeUnassignBranchHandler = this.changeUnassignBranchHandler.bind(this);
        this.changeAssignBranchHandler = this.changeAssignBranchHandler.bind(this);
    }
    componentDidMount(){
        SectionMgtService.getSections().then((res)=>{
            this.setState({ sectionData: res.data});

        });
        this.setState({sections : this.state.sectionData.map( (s) => <option key={s.sectionCode} value={s.sectionCode}>{s.description}</option>)
        });
        PageManagementService.getPageManagementData().then((res) => {
            this.setState({pagesData: res.data});
            console.log(this.state.pagesData);

        })
        this.setState({unassignPage : this.state.pagesData.map( (p) => <option key={p.pageCode} value={p.pageCode}>{p.description}</option>)
        });

    }
    AssiUser = (event) => {
        console.log("change handler working");
        this.setState({[event.target.name]: event.target.value});

    }

    //branch assign funtionalites
    changeUnassignBranchHandler = (event) => {
        //this.setState({value: event.option});
        console.log("unassign change handler working");
        this.setState({unassignBranch: Array.from(event.target.selectedOptions, (item) => item.value)});

    }


    changeAssignBranchHandler = (event) => {
        //this.setState({value: event.option});

        console.log("assign change handler working");
        this.setState({assignBranch: Array.from(event.target.selectedOptions, (item) => item.value)});
        //this.setState({assignBranch: event.target.value})

    }

    toRight() {
        $("#currentList option:selected").each(function () {

            $("#newList").append($('<option>', {
                value: $(this).val(),
                text: $(this).text()
            }));
            // this.state.newListData.append($(this).text);
            $(this).remove();

        });


    }

    toRightAll() {
        $("#currentList option").each(function () {

            $("#newList").append($('<option>', {
                value: $(this).val(),
                text: $(this).text()
            }));

            $(this).remove();

        });

    }

    toLeft() {
        $("#newList option:selected").each(function () {

            $("#currentList").append($('<option>', {
                value: $(this).val(),
                text: $(this).text()
            }));
            // this.state.newListData.remove($(this).text);
            $(this).remove();
        });
    }

    toLeftAll() {
        $("#newList option").each(function () {

            $("#currentList").append($('<option>', {
                value: $(this).val(),
                text: $(this).text()
            }));
            //this.state.newListData.remove($(this).text);
            $(this).remove();
        });
    }
    assignSectionUserRole = (event) => {
        var pageOptions = $('#newList option');

        let pages = $.map(pageOptions ,function(option) {
            return option.value;
        });
        console.log(this.state.userRoleCode);
        console.log(this.state.sections);
        let asssigndata = { userType : this.state.userRoleCode , sectionCode : this.state.sections, pageList : pages}
        console.log("Emp object ==> " +JSON.stringify(asssigndata));
        UserRoleManagementService.AssignPagesSectionUser(asssigndata).then((res) => {
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
                    <Form id='UserAssignSection' onSubmit={this.assignSectionUserRole}>
                        <Card.Header>User Role : {this.state.userRoleCode}
                        <br/><br/>
                        <Form.Group controlId='Section tupe'>
                            <Form.Label> Sections</Form.Label>
                            <Form.Control
                                as="select"
                                name="sections"
                                value={this.state.sections}
                                onChange={this.AssiUser}
                                required
                            >
                                <option >Select section</option>
                                {
                                    this.state.sectionData.map(
                                        sec =>
                                            <option key={sec.sectionCode} value={sec.sectionCode}>{sec.description}</option>
                                    )
                                }
                            </Form.Control>
                        </Form.Group>
                        </Card.Header>
                        <Card.Body>
                            <div className="form-group">
                                <Form.Group >
                                    <div className="d-flex justify-content-center">
                                        <table style={container}>
                                            <tbody>
                                            <tr>
                                                <td style={{float: "left"}}><b>Unassign</b></td>
                                                <td style={{textAlign: "center", width: "100px", hight: "300px"}}></td>
                                                <td style={{float: "left"}}><b>Assign</b></td>
                                            </tr>

                                            <tr>
                                                <td style={{width: "300px"}}>
                                                    <Form.Control
                                                        as="select"
                                                        name="unassignBranch"
                                                        placeholder="Unassign branch"
                                                        value={this.state.unassignBranch}
                                                        onChange={this.changeUnassignBranchHandler}
                                                        multiple={true}
                                                        id="currentList"
                                                        size={"lg"}
                                                        htmlSize={8}
                                                    >
                                                        {/* CurrentList otpion values has to be taken from db and listed later on. This for now dummy data */}
                                                        {
                                                            this.state.pagesData.map(
                                                                sec =>
                                                                    <option key={sec.pageCode} value={sec.pageCode}>{sec.description}</option>
                                                            )
                                                        }

                                                    </Form.Control>
                                                </td>

                                                <td style={{textAlign: "center", width: "250px"}}>
                                                    {/* buttons */}

                                                    <Button onClick={this.toRight}
                                                            style={{fontSize: "12px", width: "100px", margin: "2px"}}>
                                                        <AiFillCaretRight/>Right</Button><br/>
                                                    <Button onClick={this.toRightAll}
                                                            style={{fontSize: "12px", width: "100px", margin: "2px"}}>
                                                        <AiFillForward/>Right All</Button><br/>
                                                    <Button onClick={this.toLeft}
                                                            style={{fontSize: "12px", width: "100px", margin: "2px"}}>
                                                        <AiFillCaretLeft/>Left</Button><br/>
                                                    <Button onClick={this.toLeftAll}
                                                            style={{fontSize: "12px", width: "100px", margin: "2px"}}>
                                                        <AiFillBackward/>Left All</Button><br/>
                                                </td>

                                                <td style={{width: "300px"}}>
                                                    <Form.Control
                                                        as="select"
                                                        name="assignBranch"
                                                        placeholder="Assgin branch"
                                                        value={this.state.assignBranch}
                                                        onChange={this.changeAssignBranchHandler}
                                                        multiple={true}
                                                        id="newList"
                                                        size={"lg"}
                                                        htmlSize={8}
                                                    >


                                                    </Form.Control>
                                                </td>
                                            </tr>
                                        </tbody>
                                        </table>
                                    </div>


                                </Form.Group>

                            </div>
                        </Card.Body>
                        <Card.Footer>
                            <div className="d-flex justify-content-center">
                                <Form.Group>
                                    <Button variant="primary" type="submit">Assign</Button>
                                </Form.Group>
                            </div>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default UserSectionPasges