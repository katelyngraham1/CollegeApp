import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { API_ROOT } from "../constants";
import Form  from './form';
import InputField from './inputfield';
import Button from './button';
import { Row, Col, Alert} from 'react-bootstrap';


// Create Component
export class AddLecturer extends React.Component {

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeId = this.onChangeId.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDept = this.onChangeDept.bind(this);

        this.state = {
            id: '',
            name: '',
            dept: '',
            error: ''
        }
    }

    componentDidMount(){
        console.log(this.props.match.params.id);
    }

   

    onChangeId(e) {
        this.setState({
            id: e.target.value
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDept(e) {
        this.setState({
            dept: e.target.value
        });
    }

    validateInput() {
        this.setState({error: ""});
        this.setState({success: false})
        if (this.state.id == '') {
            return "Please enter an id for this lecturer";
        }
        if (this.state.id.length != 4) {
            return "The lecturer Id must be 4 characters";
        }
        if (this.state.name == '') {
            return "Please enter a name for this lecturer";
        }
        if (this.state.name.length < 5) {
            return "The lecturer name must be at least 5 characters";
        }
      
        if (this.state.dept == '') {
            return "Please enter a department for this lecturer";
        }
        if (this.state.dept.length != 3) {
            return "The department must be 3 characters";
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
        
        const addLecturer = {
            id: this.state.id,
            name: this.state.name,
            dept: this.state.dept
        }

        axios.post(API_ROOT + 'lecturer', addLecturer)
        .then(res => {
            console.log(res.data)
            if (res.data.error) {
                return this.setState({error: res.data.details})
            }
            this.props.history.push("/lecturers");
        })
        .catch((err)=> {
            console.log(err);
            this.setState({error: err})            
        })

    }

    render() {
        return (
            <Form title="Add Lecturer" onSubmit={this.onSubmit}>                
                <InputField type="text" label="Lecturer Id" value = {this.state.id} onChange={this.onChangeId} />
                <InputField type="text" label="Name" value = {this.state.name} onChange={this.onChangeName} />
                <InputField type="text" label="Dept" value = {this.state.dept} onChange={this.onChangeDept} />

                {this.state.error != "" && <Row><Col></Col><Col><Alert className="my-3 p-0" variant="danger">{this.state.error}</Alert></Col></Row>}
                <Button label="" value ="Add Lecturer" />                
            </Form>

        );
    }
   
}

export default withRouter(AddLecturer);
