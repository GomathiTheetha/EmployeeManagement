import React,{Component} from 'react';
import axios from 'axios';

class EmployeeID extends Component
{
    constructor(){
        super()
        this.state = {
            empid: 0,
            empDetailsRead:[]
        }
        this.handleOnChange =this.handleOnChange.bind(this);
        this.handleFetchEmpID = this.handleFetchEmpID.bind(this);
    }
    
    handleFetchEmpID(){
        console.log('empID',this.state.empid);
        if ( this.state.empid === '')
        {
            alert('Emp ID is required')            ;
        }
        else{
            console.log('Before get empi id');
            axios.get('/api/employee/getEmpID/',  {
                                'params': { 
                                        empid: this.state.empid
                                        }
                                })
                                .then(responseData => {console.log(responseData); return responseData;})
                                .then(Responsedata => {
                                    console.log('data Item: ', Responsedata.data.Item);
                                    console.log('email :', JSON.parse(Responsedata.data.Item.Email));

                                    this.setState({empDetailsRead : Responsedata.data.Item});   
                                console.log('empDetailsRead :',this.state.empDetailsRead);  
                                })
                    .catch(error => {
                        console.log(error);
                    });
            console.log('Empid.js file response data: ', this.state.empDetailsRead);
            this.props.readEmpDetail(this.state.empDetailsRead);
        }
    }

    handleOnChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render(){
        return(
            <div>
                <label 
                className="label" >Employee ID
                <input 
                    type="number" 
                    className="input"
                    name="empid"
                    value={this.state.empid} 
                    onChange={this.handleOnChange} />
                </label> 
                <button
                    className="button"
                    onClick={this.handleFetchEmpID}>
                    Read
                </button>   
            </div>
        );
    }
}

export default EmployeeID;