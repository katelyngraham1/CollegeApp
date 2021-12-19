import React from 'react';
import axios from 'axios';
import { API_ROOT } from "../constants";
import * as Icon from 'react-bootstrap-icons';
import {Link} from 'react-router-dom';
import { Container, Row, Col, Alert} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { withRouter } from 'react-router-dom';

export class Students extends React.Component {

    constructor(){
        super()
    }

    state = {
        students: [],
        error: ""
    };

    componentDidMount() {
        axios.get(API_ROOT + 'students')
            .then((response) => {
                this.setState({ students: response.data.details })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onClickDeleteSelected(cell, row, rowIndex){
        console.log('Student #', rowIndex);
        this.setState({ error: "" });
        axios.get(API_ROOT + 'student/delete/' + row.sid)
        .then((response) => {
            if(response.data.error) {
                this.setState({ error: response.data.details })
            } else {
                window.location.reload();
            }
        })
        .catch((error) => {
            console.log(error);
        });

    
    }

    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <span><a onClick={() => 
                this.onClickDeleteSelected(cell, row, rowIndex)} title="click here to delete this Student"  
                className="btn btn-danger btn-sm">
                <Icon.Trash />
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
                        <h2>Students</h2>
                    </Col>
                </Row>
                {this.state.error != "" && <Row><Col><Alert className="my-3 p-0" variant="danger">{this.state.error}</Alert></Col></Row>}
                <Row>
                    <Col  style={{display:'flex', justifyContent:'left'}}>
                        <a href="/addstudent" className="btn btn-info btn-sm my-3">Add Students</a>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <BootstrapTable data={this.state.students} version='4' pagination  options={ options }>
                            <TableHeaderColumn isKey dataField='sid' dataSort filter={ { type: 'TextFilter', delay: 1000 } }>ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='name' dataSort filter={ { type: 'TextFilter', delay: 1000 } }>Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='gpa' dataSort filter={ { type: 'TextFilter', delay: 1000 } }>GPA</TableHeaderColumn>
                            <TableHeaderColumn dataField="button" dataFormat={this.cellButton.bind(this)}>Action</TableHeaderColumn>
                        </BootstrapTable>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Students;