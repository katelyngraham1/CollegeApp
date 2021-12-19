import './App.css';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Modules } from './components/modules';
import  Home  from './components/home';
import { Students } from './components/students';
import { Lecturers } from './components/lecturers';
import { ListStudents } from './components/liststudents';
import { UpdateModule } from './components/updatemodule';
import { AddStudent } from './components/addstudent';
import { AddStudentToModule } from './components/addstudenttomodule';
import { AddLecturer } from './components/addlecturer';


// localStorage.removeItem(LOGIN_TOKEN_NAME);
// localStorage.removeItem(LOGIN_TOKEN_ID);


class App extends Component {
  render() {
    
    return (
      <Router>
        <div className="App">

          <Navbar bg="info" variant="light" className="pl-1">
            <Navbar.Brand className="ml-1" href="#home">&nbsp; College App</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/modules">Modules</Nav.Link>
              <Nav.Link href="/students">Students</Nav.Link>
              <Nav.Link href="/lecturers">Lecturers</Nav.Link>
            </Nav>
          </Navbar>

          <br />
          <div className="container">
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/modules' component={Modules}/>
            <Route path='/students' component={Students}/>
            <Route path='/lecturers' component={Lecturers}/>
            <Route path='/liststudents/:id' component={ListStudents}/>
            <Route path='/updatemodule/:id' component={UpdateModule}/>
            <Route path='/addstudent' component={AddStudent}/>
            <Route path='/addstudenttomodule' component={AddStudentToModule}/>
            <Route path='/addlecturer' component={AddLecturer}/>
          </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
