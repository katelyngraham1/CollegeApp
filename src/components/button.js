import React from 'react';
import { Row, Col} from 'react-bootstrap';

export default class Button extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
                <Row className="pb-1">
                    <Col className="float-right">
                        
                    </Col>
                    <Col style={{"text-align": "right"}}>
                        <input type="submit"
                        className='btn btn-info'
                        value={this.props.value}>
                        </input>
                    </Col>                
                </Row>
        );
    }
}
