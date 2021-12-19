import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { API_ROOT } from "../constants";
import Form  from './form';
import InputField from './inputfield';
import Button from './button';
import { Row, Col, Alert} from 'react-bootstrap';


// Create Component
export class UpdateModule extends React.Component {

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeMid = this.onChangeMid.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCredits = this.onChangeCredits.bind(this);

        this.state = {
            mid: '',
            name: '',
            credits: '',
            error: '',
            success: false
        }
    }

    componentDidMount(){
        console.log(this.props.match.params.id);
        this.loadModule()
    }

    loadModule() {
        let _this = this;
        axios.get(API_ROOT + 'module/' + this.props.match.params.id)
        .then(response => {
            console.log("Loading module " + this.props.match.params.id);
            console.log(response.data.details);
            _this.setState({
                mid:response.data.details.mid,
                name:response.data.details.name,
                credits:response.data.details.credits
            })
        }).catch((error)=> {
            console.log(error);
        })
    }

    onChangeMid(e) {
        this.setState({
            mid: e.target.value
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeCredits(e) {
        this.setState({
            credits: e.target.value
        });
    }

    validateInput() {
        this.setState({error: ""});
        this.setState({success: false})
        if (this.state.mid == '') {
            return "Please enter an id for this module";
        }
        if (this.state.name == '') {
            return "Please enter a name for this module";
        }
        if (this.state.name.length < 5) {
            return "The module name must be at least 5 characters";
        }
        if (this.state.credits == '') {
            return "Please enter the cedits for this module";
        }
        if (!(this.state.credits == 5 || this.state.credits == 10 || this.state.credits == 15)) {
            return "You can only use one of 3 values for Credits, i.e. 5, 10 or 15";
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
        
        const updateModule = {
            mid: this.state.mid,
            name: this.state.name,
            credits: this.state.credits
        }

        axios.put(API_ROOT + 'module/' + this.state.mid, updateModule)
        .then(res => {
            console.log(res.data)
            if (res.data.error) {
                return this.setState({error: res.data.details})
            }
            // this.setState({success:true});
            this.props.history.push("/modules");
        })
        .catch((err)=> {
            console.log(err);
            this.setState({error: err})            
        })

    }

    render() {
        return (
            <Form title="Update Module" onSubmit={this.onSubmit}>                
                <InputField disabled={'disabled'} type="text" label="Module Id" value = {this.state.mid} onChange={this.onChangeMid} />
                <InputField type="text" label="Name" value = {this.state.name} onChange={this.onChangeName} />
                <InputField type="number" label="Credits" value = {this.state.credits} onChange={this.onChangeCredits} />

                {this.state.error != "" && <Row><Col></Col><Col><Alert className="my-3 p-0" variant="danger">{this.state.error}</Alert></Col></Row>}
                <Button label="" value ="Save Changes" />                
                {this.state.success != "" && <Row><Col></Col><Col><Alert className="my-3 p-0" variant="success">Module Updated</Alert></Col></Row>}
            </Form>

        );
    }
   
}

export default withRouter(UpdateModule);
