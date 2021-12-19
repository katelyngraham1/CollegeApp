import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { API_ROOT } from "../constants";
import Form  from './form';
import InputField from './inputfield';
import Button from './button';
import { Row, Col, Alert} from 'react-bootstrap';


// Create Component
export class AddStudent extends React.Component {

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeSid = this.onChangeSid.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeGpa = this.onChangeGpa.bind(this);

        this.state = {
            sid: '',
            name: '',
            gpa: 0.0,
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

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeGpa(e) {
        this.setState({
            gpa: e.target.value
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
        if (this.state.name == '') {
            return "Please enter a name for this student";
        }
        if (this.state.name.length < 5) {
            return "The student name must be at least 5 characters";
        }
      
        if (this.state.gpa < 0 || this.state.gpa > 4) {
            return "The GPA must be between 0.0 and 4.0";
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
        
        const addStudent = {
            sid: this.state.sid,
            name: this.state.name,
            gpa: this.state.gpa
        }

        axios.post(API_ROOT + 'student', addStudent)
        .then(res => {
            console.log(res.data)
            if (res.data.error) {
                return this.setState({error: res.data.details})
            }
            this.props.history.push("/students");
        })
        .catch((err)=> {
            console.log(err);
            this.setState({error: err})            
        })

    }

    render() {
        return (
            <Form title="Add Student" onSubmit={this.onSubmit}>                
                <InputField type="text" label="Student Id" value = {this.state.sid} onChange={this.onChangeSid} />
                <InputField type="text" label="Name" value = {this.state.name} onChange={this.onChangeName} />
                <InputField step='0.1' type="number" label="GPA" value = {this.state.gpa} onChange={this.onChangeGpa} />

                {this.state.error != "" && <Row><Col></Col><Col><Alert className="my-3 p-0" variant="danger">{this.state.error}</Alert></Col></Row>}
                <Button label="" value ="Add Student" />                
            </Form>

        );
    }
   
}

export default withRouter(AddStudent);
