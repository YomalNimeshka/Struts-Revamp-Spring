import React, { Component } from 'react'
import SectionMgtService from '../../services/SectionMgtService';

class AddSectionComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
           sectionCode:'',
           description:'',
           status:'',
           sortKey:'',
           remarks:''
        }

        this.changeSectionCodeHandler = this.changeSectionCodeHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeStatusnHandler = this.changeStatusnHandler.bind(this);
        this.changeSortKeyHandler = this.changeSortKeyHandler.bind(this);
        this.changeRemarksHandler = this.changeRemarksHandler.bind(this);

        this.saveSection = this.saveSection.bind(this);
    }

    changeSectionCodeHandler=(event)=>{
        this.setState({sectionCode: event.target.value});
    }
    changeDescriptionHandler=(event)=>{
        this.setState({description: event.target.value});
    }
    changeStatusnHandler=(event)=>{
        this.setState({status: event.target.value});
    }
    changeSortKeyHandler=(event)=>{
        this.setState({sortKey: event.target.value});
    }

    
    changeRemarksHandler=(event)=>{
        this.setState({remarks: event.target.value});
    }

    //save button function
    saveSection = (e)=>{
        e.preventDefault();
            
           
            let section = {sectionCode: this.state.sectionCode, description: this.state.description, 
                status: this.state.status,
                sortKey: this.state.sortKey, remarks: this.state.remarks};
    
            console.log("Emp object ==> " +JSON.stringify(section));
        
        

        SectionMgtService.addSection(section).then(res =>{
            this.props.history.push('/Section-Mgt/All-Sections');
        })
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
                            <h3 className="text-center">Add Section</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Section Code :</label>
                                        <input placeholder="Section Code" name="sectionCode" className="form-control" 
                                           value={this.state.sectionCode} onChange={this.changeSectionCodeHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label>Description :</label>
                                        <input placeholder="Description" name="description" className="form-control" 
                                           value={this.state.description} onChange={this.changeDescriptionHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label>Status :</label>
                                        <input placeholder="Status" name="status" className="form-control" 
                                           value={this.state.status} onChange={this.changeStatusnHandler} />
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

                                    <button className="btn btn-success" onClick={this.saveSection} >Save</button>
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
export default AddSectionComponent;
