import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default class Form extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <Container>
                <form onSubmit={this.props.onSubmit}>
                    <Row className="mb-3"><Col><h2>{this.props.title}</h2></Col></Row>
                    {this.props.children}
                </form>
            </Container>
        );
    }
}

