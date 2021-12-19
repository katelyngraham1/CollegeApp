import React from 'react';
import { Row, Col} from 'react-bootstrap';

export default class InputField extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
                <Row className="pb-1">
                    <Col className="float-right">
                        <label >{this.props.label}</label>
                    </Col>
                    <Col>
                        <input                    
                            type={this.props.type}
                            disabled={this.props.disabled}
                            className='form-control'
                            value={this.props.value}
                            onChange={this.props.onChange}>
                        </input>
                    </Col>                
                </Row>
        );
    }
}
