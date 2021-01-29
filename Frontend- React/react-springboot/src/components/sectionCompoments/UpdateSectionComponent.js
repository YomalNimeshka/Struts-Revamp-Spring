import React, { Component } from 'react';
import SectionMgtService from '../../services/SectionMgtService';

class UpdateSectionComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            sectionCode: this.props.match.params.sectionCode,
            description:'',
            status:'',
            sortKey:'',
            remarks:''
           
        }
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
        this.changeSortKeyHandler = this.changeSortKeyHandler.bind(this);
        this.changeRemarksHandler = this.changeRemarksHandler.bind(this);

        this.updateSection = this.updateSection.bind(this);
        
    }
    componentDidMount(){
        SectionMgtService.getSectionByCode(this.state.sectionCode).then( (res) =>{
            let sectionData = res.data;
            this.setState({description: sectionData.description,
                status: sectionData.status,
                sortKey: sectionData.sortKey,
                remarks: sectionData.remarks
            });
        });
    }

    changeDescriptionHandler=(event)=>{
        this.setState({description: event.target.value});
    }
    changeStatusHandler=(event)=>{
        this.setState({status: event.target.value});
    }
    changeSortKeyHandler=(event)=>{
        this.setState({sortKey: event.target.value});
    }
    changeRemarksHandler=(event)=>{
        this.setState({remarks: event.target.value});
    }

    //save button function
    updateSection = (e)=>{
        e.preventDefault();
        let section = {description: this.state.description, status: this.state.status, sortKey: this.state.sortKey, remarks: this.state.remarks};

        console.log("Section object ==> " +JSON.stringify(section));

        SectionMgtService.updateSection(section, this.state.sectionCode).then(res=>{
            this.props.history.push(`/Section-Mgt/All-Sections`);
        });
    }

    //cancel button function
    cancel(){
        this.props.history.push('/Section-Mgt/All-Sections');
    }

    render() {
        return (
            <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Update Section</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>Description :</label>
                                    <input placeholder="Description" name="description" className="form-control" 
                                       value={this.state.description} onChange={this.changeDescriptionHandler} />
                                </div>

                                <div className="form-group">
                                    <label>Status :</label>
                                    <input placeholder="Status" name="status" className="form-control" 
                                       value={this.state.status} onChange={this.changeStatusHandler} />
                                </div>

                                <div className="form-group">
                                    <label>Sort Key :</label>
                                    <input placeholder="Sort Key" name="sortKey" className="form-control" 
                                       value={this.state.sortKey} onChange={this.changeSortKeyHandler} />
                                </div>

                                <div className="form-group">
                                    <label>Remarks :</label>
                                    <input placeholder="Remarks" name="remarks" className="form-control" 
                                       value={this.state.remarks} onChange={this.changeRemarksHandler} />
                                </div>

                                <button className="btn btn-success" onClick={this.updateSection} >Save</button>
                                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default UpdateSectionComponent;