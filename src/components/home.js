import React from 'react';
import axios from 'axios';
import { API_ROOT } from "../constants";
import { Container, Row, Col, ListGroup} from 'react-bootstrap';

// Read Component
export class Home extends React.Component {

    constructor(){
        super()
    }

    componentDidMount() {
        
    }


    render() {
        return (
            <Container fluid>
                <Row>
                    <Col style={{display:'flex', justifyContent:'left'}}>
                        <h1>Welcome</h1>
                    </Col>
                </Row>
                <Row>
                    <Col style={{display:'flex', justifyContent:'left'}}>
                        <p>Please select from the options below.</p>
                     </Col>
                </Row>
                <Row>
                    <Col style={{display:'flex', justifyContent:'left'}}>
                        <ListGroup>
                            <ListGroup.Item action href="/modules">List Modules</ListGroup.Item>
                            <ListGroup.Item action href="/students">List Students</ListGroup.Item>
                            <ListGroup.Item action href="/lecturers">List Lecturers</ListGroup.Item>
                        </ListGroup>                
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;
