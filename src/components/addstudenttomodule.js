import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { API_ROOT } from "../constants";
import Form  from './form';
import InputField from './inputfield';
import Button from './button';
import { Row, Col, Alert} from 'react-bootstrap';


// Create Component
export class AddStudentToModule extends React.Component {

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeSid = this.onChangeSid.bind(this);
        this.onChangeMid = this.onChangeMid.bind(this);

        this.state = {
            sid: '',
            mid: '',
            error: ''
        }
    }

    componentDidMount(){
        console.log(this.props.match.params.id);
    }

   

    onChangeSid(e) {
        this.setState({
            sid: e.target.value
        });
    }

    onChangeMid(e) {
        this.setState({
            mid: e.target.value
        });
    }


    validateInput() {
        this.setState({error: ""});
        this.setState({success: false})
        if (this.state.sid == '') {
            return "Please enter an id for this student";
        }
        if (this.state.sid.length != 4) {
            return "The Student Id must be 4 characters";
        }
        if (this.state.mid == '') {
            return "Please enter an id for this module";
        }
        if (this.state.mid.length != 3) {
            return "The Module Id must be 3 characters";
        }
        return null;
    }

    onSubmit(e) {
        e.preventDefault();
        
        const isValid = this.validateInput();
        if (isValid != null) {
            this.setState({error: isValid});
            return;
        }
        
        const AddStudentToModule = {
            sid: this.state.sid,
            mid: this.state.mid
        }

        axios.post(API_ROOT + 'studenttomodule', AddStudentToModule)
        .then(res => {
            console.log(res.data)
            if (res.data.error) {
                if (res.data.details.sqlMessage) {
                    return this.setState({error: "Database error: " + res.data.details.sqlMessage})
                }
                return this.setState({error: res.data.details})
            }
            this.props.history.push("/liststudents/"+this.state.mid);
        })
        .catch((err)=> {
            console.log(err);
            this.setState({error: err})            
        })

    }

    render() {
        return (
            <Form title="Add Student to Module" onSubmit={this.onSubmit}>                
                <InputField type="text" label="Student Id" value = {this.state.sid} onChange={this.onChangeSid} />
                <InputField type="text" label="Module Id" value = {this.state.mid} onChange={this.onChangeMid} />

                {this.state.error != "" && <Row><Col></Col><Col><Alert className="my-3 p-0" variant="danger">{this.state.error}</Alert></Col></Row>}
                <Button label="" value ="Add Student to Module" />                
            </Form>

        );
    }
   
}

export default withRouter(AddStudentToModule);
