import React,{Component} from 'react';
import { If, Then, ElseIf } from 'react-if-elseif-else-render';
import './employee.css';
import axios from 'axios';
class Employee extends Component{

    constructor(){
        super()
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phone:"",
            gender:"",
            empid: "",
            buttontext: "Create",
            isLoading: false
        }
        this.handleCreate = this.handleCreate.bind(this);
        this.handleRead = this.handleRead.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.FinalAction = this.FinalAction.bind(this);
        this.UpdateEmployeeDetails = this.UpdateEmployeeDetails.bind(this);
        this.DeleteEmployeeDetails = this.DeleteEmployeeDetails.bind(this);
        this.FetchEmpDetailsbyID = this.FetchEmpDetailsbyID.bind(this);
        this.CreateEmployeeDetails = this.CreateEmployeeDetails.bind(this);
        this.InitialiseControlstoNull = this.InitialiseControlstoNull.bind(this);
    }
    InitialiseControlstoNull(){
        this.setState({ 
            firstName : "",
            lastName: "",
            phone:"",
            gender:"",
            email: ""
                    });
    }
    handleCreate(){
        this.setState({
            buttontext :   "Create",
        });
        this.InitialiseControlstoNull();
    }
    handleRead(){
        this.setState({
            buttontext :   "Read",
            empid:""
        });
        this.InitialiseControlstoNull();
    }
    handleUpdate(){
        this.setState({
            buttontext :   "Update",
            empid:""
        });
        this.InitialiseControlstoNull();
    }
    handleDelete(){
        this.setState({
            buttontext :   "Delete",
            empid:""
        });
        this.InitialiseControlstoNull();
    }
    handleOnChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    CreateEmployeeDetails(){
        console.log('CreateEmployeeDetails Start');
        axios.put(`/api/employee/CreateEmpDetails/${this.state.firstName}/${this.state.lastName}/${this.state.email}/${this.state.phone}/${this.state.gender}`)
        .then(Response => {
            console.log('Create Response.status: ', Response.status);
            console.log('Create Response.statusText: ', Response.statusText);

            if (Response.status === 200 || Response.statusText.toLowerCase() === "ok"){
                return console.log("Create Employee Details Success");
            }else{
                return console.log('Create Employee Details Failed');
            }

        })
        .catch(error=> {
            return console.log('create Employee Details Failed with Error :', error);
        })
    }
    UpdateEmployeeDetails(){
        console.log('UpdateEmployeeDetails Start');
        axios.put(`/api/employee/UpdateEmpDetails/${this.state.empid}/${this.state.firstName}/${this.state.lastName}/${this.state.email}/${this.state.phone}/${this.state.gender}`)
        .then (function(response){
            console.log('Update Response.status: ', response.status);
            console.log('Update Response.statusText: ', response.statusText);

            if (response.status === 200 || response.statusText.toLowerCase() === "ok"){
                return console.log("Update Employee by Details Success");
            }else{
                return console.log('Update Employee Details Failed');
            }
        })
        .catch(error => {
            return console.log('UpdateEmployee By Details Failed with Error :', error);
        })
    }
    DeleteEmployeeDetails(){
        console.log('Deleting the Employee Details  Start');
        axios.delete(`/api/employee/DeleteEmpDetails/${this.state.empid}`)
        .then(function(response){
            console.log('Delete Response.status: ', response.status);
            console.log('Delete Response.statusText: ', response.statusText);

            if (response.status === 200 || response.statusText.toLowerCase() === "ok"){
                return console.log("Delete Employee by Details Success");
            }else{
                return console.log('Delete Employee Details Failed');
            }
        })
        .catch(error => {
            console.log('DeleteEmployee Failed with Error :',error);
        });
    }
    FetchEmpDetailsbyID(event){
        console.log('FetchEmpDetailsbyID Start empID',this.state.empid);
        this.setState({isLoading : true });
        if ( this.state.empid === '')
        {
            alert('Emp ID is required')            ;
        }
        else{
            axios.get('/api/employee/getEmpID/',  {
                                'params': { 
                                        empid: this.state.empid
                                        }
                                })
                                .then(Response => {
                                    console.log('Get Response.status: ', Response.status);
                                    console.log('Get Response.statusText: ', Response.statusText);

                                  if (Response.status === 200 || Response.statusText.toLowerCase() === "ok"){
                                        if(Response.data.Item != null)
                                        {
                                            this.setState({firstName :Response.data.Item.FirstName});
                                            this.setState({lastName :Response.data.Item.LastName});
                                            this.setState({email :Response.data.Item.Email});
                                            this.setState({phone :Response.data.Item.Phone});
                                            this.setState({gender :Response.data.Item.Gender});
                                            this.setState({isLoading : false });
                                        }
                                        else{
                                            alert('Record does not exist for given Emp id');
                                            this.setState({ empid:"" });
                                            this.InitialiseControlstoNull();
                                        }
                                    }
                                    if (Response.status === 500){
                                        console.log ('response.statusText: ', Response.statusText);
                                    }
                                    
                                })
                    .catch(error => {
                        console.log('FetchEmpDetailsbyID Failed with Error :',error);
                    });
        }
    }

    FinalAction(){
        return(
            <div>
                {
                    this.state.buttontext.toLocaleLowerCase() === "update"?this.UpdateEmployeeDetails() :
                    this.state.buttontext.toLocaleLowerCase() === "delete"?  this.DeleteEmployeeDetails() :
                    this.state.buttontext.toLocaleLowerCase() === "create"? this.CreateEmployeeDetails(): null
                }
            </div>
        );
    }
    render() {
       
        return(
           <div className="main">
                <h1 
                    className="heading1"> 
                    Employee Management 
                </h1>
                <h4 
                    className="heading4"> 
                    Open Book Assignment Submitted by Gomathi T
                </h4>
                <button 
                    className="button" 
                    onClick={this.handleCreate}>
                    Create
                </button>
                <button 
                    className="button" 
                    onClick={this.handleRead}>
                    Read
                </button>
                <button 
                    className="button" 
                    onClick={this.handleUpdate}>
                    Update
                </button>
                <button 
                    className="button" 
                    onClick={this.handleDelete}>
                    Delete
                </button>
                <hr/>
                <If condition={this.state.buttontext.toLocaleLowerCase() === "create"}>
                <Then>
                    <h2 className="heading2"> Create New Employee </h2>
                    <hr className="hr" />
                </Then>
                <ElseIf condition={this.state.buttontext.toLocaleLowerCase() === "read"}>
                <Then>
                    <h2 className="heading2"> Read Existing Employee </h2>
                    <hr className="hr" />
                    <label 
                        className="label" >Employee ID
                        <input 
                            type="text" 
                            className="input"
                            name="empid"
                            value={this.state.empid} 
                            onChange={this.handleOnChange} />
                        </label> 
                        <button
                            className="button"
                            onClick={this.FetchEmpDetailsbyID}>
                            Read
                        </button>  
                    <hr />
                </Then>
                </ElseIf>
                <ElseIf condition={this.state.buttontext.toLocaleLowerCase() === "update"}>
                <Then>
                    <h2 className="heading2"> Update Existing Employee </h2>
                    <hr className="hr" />
                    <label 
                        className="label" >Employee ID
                        <input 
                            type="text" 
                            className="input"
                            name="empid"
                            value={this.state.empid} 
                            onChange={this.handleOnChange} />
                        </label> 
                        <button
                            className="button"
                            onClick={this.FetchEmpDetailsbyID}>
                            Read
                        </button>  
                    <hr/>
                </Then>
                </ElseIf>
                <ElseIf condition={this.state.buttontext.toLocaleLowerCase() === "delete"}>
                <Then>
                    <h2 className="heading2"> Delete Existing Employee </h2>
                    <hr className="hr" />
                    <label 
                        className="label" >Employee ID
                        <input 
                            type="text" 
                            className="input"
                            name="empid"
                            value={this.state.empid} 
                            onChange={this.handleOnChange} />
                        </label> 
                        <button
                            className="button"
                            onClick={this.FetchEmpDetailsbyID}>
                            Read
                        </button>  
                    <hr />
                </Then>
                </ElseIf>

                </If>
                    
                                    
                
                    <label 
                        className="label" >First Name 
                        <input 
                            type="text" 
                            className="input"
                            name="firstName" 
                            value={this.state.firstName} 
                            onChange={this.handleOnChange} />
                    </label>
                    <br />
                    <label 
                        className="label">Last Name   
                        <input 
                            type="text" 
                            name="lastName" 
                            className="input"
                            value={this.state.lastName} 
                            onChange={this.handleOnChange} />
                    </label>
                    <br />
                    <label 
                        className="label">Email  
                        <input 
                            type="email" 
                            name="email" 
                            className="input"
                            value={this.state.email} 
                            onChange={this.handleOnChange} />
                    </label>
                    <br />
                    <label 
                        className="label">Phone  
                        <input 
                            type="tel" 
                            name="phone" 
                            className="input"
                            value={this.state.phone} 
                            onChange={this.handleOnChange} />
                    </label>
                    <br />
                    <label 
                        className="label">Gender  </label>
                    <label
                        className="label">    
                        <input 
                            type="radio" 
                            name="gender" 
                            className="radio"
                            value="male" 
                            checked={this.state.gender.toLocaleLowerCase() === "male"}
                            onChange={this.handleOnChange}/> Male
                    </label>
                    <label
                        className="label">    
                        <input 
                            type="radio" 
                            name="gender" 
                            className="radio"
                            value="female" 
                            checked={this.state.gender.toLocaleLowerCase() === "female"}
                            onChange={this.handleOnChange}/> Female
                    </label>
                <br />
                <If condition ={this.state.buttontext.toLocaleLowerCase() !== "read"}>
                <Then>
                {
                    <button 
                        className="button"
                        onClick={this.FinalAction}>{this.state.buttontext}
                    </button>
                }
                </Then>
                </If>
           </div> 
        );
    }
}


export default Employee;