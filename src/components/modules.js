import React from 'react';
import axios from 'axios';
import { API_ROOT } from "../constants";
import * as Icon from 'react-bootstrap-icons';
import {Link} from 'react-router-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';


export class Modules extends React.Component {

    constructor(){
        super()
    }

    state = {
        modules: []
    };

    componentDidMount() {
        axios.get(API_ROOT + 'modules')
            .then((response) => {
                this.setState({ modules: response.data.details })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onClickEditSelected(cell, row, rowIndex){
        console.log('Lecturer #', rowIndex);
        console.log(row);
        this.props.history.push("/updatemodule/" + row.mid);  
        window.location.reload();
    }

     onClickListSelected(cell, row, rowIndex){
        console.log('Module #', rowIndex);
        console.log(row);
        this.props.history.push("/liststudents/" + row.mid);  
        window.location.reload();
    }

    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <span><a onClick={() => 
                this.onClickEditSelected(cell, row, rowIndex)} title="click here to update this module"  
                className="btn btn-info btn-sm">
                <Icon.Pencil />
                </a> &nbsp;
                <a onClick={() => 
                this.onClickListSelected(cell, row, rowIndex)} title="click here to list the students on this module"  
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
                        <h2>Modules</h2>
                    </Col>
                </Row>
                <Row>
                    <Col  style={{display:'flex', justifyContent:'left'}}>
                        <a href="/addstudenttomodule" className="btn btn-info btn-sm my-3">Add Student To Module</a>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <BootstrapTable data={this.state.modules} version='4' pagination  options={ options }>
                            <TableHeaderColumn isKey dataField='mid' dataSort filter={ { type: 'TextFilter', delay: 1000 } }>ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='name' dataSort filter={ { type: 'TextFilter', delay: 1000 } }>Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='credits' dataSort filter={ { type: 'TextFilter', delay: 1000 } }>Credits</TableHeaderColumn>
                            <TableHeaderColumn dataField="button" dataFormat={this.cellButton.bind(this)}>Action</TableHeaderColumn>
                        </BootstrapTable>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Modules;
