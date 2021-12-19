import React from 'react';
import axios from 'axios';
import { API_ROOT } from "../constants";
import * as Icon from 'react-bootstrap-icons';
import {Link} from 'react-router-dom';
import { Container, Row, Col, Alert} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { withRouter } from 'react-router-dom';

export class ListStudents extends React.Component {

    constructor(){
        super()
    }

    state = {
        students: []
    };

    componentDidMount() {
        console.log("Getting students " + this.props.match.params.id)
        axios.get(API_ROOT + 'module/' + this.props.match.params.id + '/students')
            .then((response) => {
                this.setState({ students: response.data.details })
            })
            .catch((error) => {
                console.log(error);
            });
    }

   
    render() {
        const options = {
            sizePerPageList: [ ], // you can change the dropdown list for size per page
            sizePerPage: 10
        };

        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h2>Students in module {this.props.match.params.id}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <BootstrapTable data={this.state.students} version='4' pagination  options={ options }>
                            <TableHeaderColumn isKey dataField='sid' dataSort filter={ { type: 'TextFilter', delay: 1000 } }>ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='name' dataSort filter={ { type: 'TextFilter', delay: 1000 } }>Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='gpa' dataSort filter={ { type: 'TextFilter', delay: 1000 } }>GPA</TableHeaderColumn>
                        </BootstrapTable>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ListStudents;