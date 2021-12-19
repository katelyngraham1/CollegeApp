import React from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { API_ROOT } from "../constants";
import * as Icon from 'react-bootstrap-icons';
import {Link} from 'react-router-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, BootstrapButton} from 'react-bootstrap';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


export class Lecturers extends React.Component {
    state = {
        lecturers: []
    };

    constructor() {
        super();
    }

    componentDidMount() {
        axios.get(API_ROOT + 'lecturers')
            .then((response) => {
                this.setState({ lecturers:response.data.details })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    cellButton(cell, row, enumObject, rowIndex) {
        
     return (
            <span><a onClick={() => 
                this.onClickEditSelected(cell, row, rowIndex)} title="click here to update this lecturer"  
                className="btn btn-info btn-sm">
                <Icon.Pencil />
                </a> &nbsp;
                <a onClick={() => 
                    this.onClickListSelected(cell, row, rowIndex)} title="click here to list this lecturer"  
                    className="btn btn-info btn-sm ml-1">
                    <Icon.List />
                </a> 
            </span>
        )
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
                        <h2>Lecturers</h2>
                    </Col>
                </Row>
                <Row>
                    <Col  style={{display:'flex', justifyContent:'left'}}>
                        <a href="/addlecturer" className="btn btn-info btn-sm my-3">Add Lecturer</a>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <BootstrapTable data={this.state.lecturers} version='4' pagination  options={ options }>
                            <TableHeaderColumn isKey dataField='_id' dataSort filter={ { type: 'TextFilter', delay: 1000 } }>ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='name' dataSort filter={ { type: 'TextFilter', delay: 1000 } }>Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='dept' dataSort filter={ { type: 'TextFilter', delay: 1000 } }>Department</TableHeaderColumn>
                        </BootstrapTable>
                    </Col>
                </Row>
            </Container>
        );
    }
}

    function  buttonFormatter(cell, row){
        return '<BootstrapButton type="submit"></BootstrapButton>';
    }

export default withRouter(Lecturers);