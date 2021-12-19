const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const mysql      = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'collegedb'
});
 
connection.connect();

app.use(cors());
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", 
    "Origin, x-Requested-Width, Content-Type, Accept");
    next();
})

// parse application/ x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}))

// parse application/json
app.use(bodyParser.json())

const serverAddress = 'localhost';
const portNumber = 4000;

const ConnectionString = 'mongodb+srv://katelyngraham:ZqcMzZ$8@cluster0.nqnxy.mongodb.net/lecturersDB?retryWrites=true&w=majority';

mongoose.connect(ConnectionString, {useNewUrlParser: true});

const Schema = mongoose.Schema;

var lectSchema = new Schema({
    _id:String,
    name:String,
    dept:String
});

var LectModel = mongoose.model("Lecturers", lectSchema);

//get lecturer list
app.get('/api/lecturers', (req, res) => {

    console.log("Lecturer List called");
    LectModel.find((err, data) => {
        if(err) {
            return res.json(error(err));
        }
        res.json(success(data));
    })
})

//get a lecturer with id
app.get('/api/lecturer/:id', (req, res)=>{
    console.log(req.params.id);

    LectModel.findById(req.params.id, (err, data) => {
        if(err) {
            return res.json(error(err));
        }
        res.json(success(data));
    })
})

//add lecturer
app.post('/api/lecturer', async (req, res) => {
    console.log('Add Lecturer!');
    console.log(req.body);
    LectModel.findById(req.body.id, (err, data) => {
        if(err) {
            return res.json(error(err));
        }

        console.log(data);
        if (data != null) {
            return res.send(error("A lecturer with this id already exists"))
        }

         // let object_id = new MongoId(req.body.id);
        // create the lecturer in mongodb
        LectModel.create({
            _id:req.body.id,
            name:req.body.name,
            dept:req.body.dept
        }, (err, lecturer) => {
            if (err) {
                return res.send(error(err));
            }            
            res.send(success(lecturer) );
        });
    })
  
})

//get departments
app.get('/api/departments', (req, res) => {

    console.log("Departments List called");
    connection.query('SELECT * from dept', function (err, results, fields) {
        if (err) {
            return res.send(error(err))
        }
        console.log('The solution is: ', results);
        console.log('The solution is: ', fields);
        res.json(success(results));
    });
    
})

//get module list
app.get('/api/modules', (req, res) => {

    console.log("Modules List called");
    connection.query('SELECT * from module', function (err, results, fields) {
        if (err) {
            return res.send(error(err))
        }
        console.log('The solution is: ', results);
        console.log('The solution is: ', fields);
        res.json(success(results));
    });
})

//get certain module with id
app.get('/api/module/:id', (req, res) => {

    console.log("Get Module");
    let sql = "SELECT * from module where mid = '" + req.params.id + "'";
    console.log(sql);
    connection.query(sql, function (err, results, fields) {
       
        if (err) {
            return res.send(error(err));
        }
        console.log(results)
        if (results.length < 1) {
            return res.json(error("No such module"))
        }
        res.json(success(results[0]));
    });
})

//get a list of students in a module
app.get('/api/module/:id/students', (req, res) => {

    console.log("Student List of certain module called");
    let sql = "SELECT s.* FROM student s join `student_module` sm on s.sid = sm.sid where sm.mid = '"
     + req.params.id + "'";

    console.log(sql);
    connection.query(sql, function (err, results) {
       
        if (err) {
            return res.send(error(err));
        }
        console.log(results)
        res.json(success(results));
    });
})

// Update Module
app.put('/api/module/:id', (req, res) => {
    console.log("Update Module");
    let sql = "UPDATE module SET name='" + req.body.name + "', credits='" + req.body.credits + 
            "' where mid = '" + req.params.id + "'";
    console.log(sql); 

    connection.query(sql, function(err, results) {
        if (err) {
            return res.send(error(err));
        }
        console.log("1 record inserted");
        console.log(results)
        res.send(success(results));
    });
})

//get student list
app.get('/api/students', (req, res) => {

    console.log("Student List called");
    connection.query('SELECT * from student', function (err, results, fields) {
        if (err) {
            return res.send(error(err))
        }
        console.log('The solution is: ', results);
        console.log('The solution is: ', fields);
        res.json(success(results));
    });
})

//add a student
app.post('/api/student', (req, res) => {
    console.log("Add Student");
    let sql = "INSERT INTO student (sid, name, gpa) VALUES ('"
        + req.body.sid + "', '" + req.body.name + "',"+req.body.gpa+")";
    console.log(sql); 

    connection.query(sql, function(err, results, fields) {
        if (err) {
            return res.send(error(err));
        }
        console.log("1 record inserted");
        console.log(results)
        console.log('The field is: ', fields);
        res.send(success(results));
    });
})

// delete student
//app.delete('/api/student/:id', (req, res) => {
app.get('/api/student/delete/:id', (req, res) => {
    console.log("Student delete called");
    let sql = "Select * from student_module where sid ='" + req.params.id + "'";
    console.log(sql);
    connection.query(sql, function(err, results) {
        console.log(results);
        if(results.length == 0) {
            // the student has no modules assigned
            console.log("Delete Student");
            let sql = "Delete from student where sid ='" + req.params.id + "'";
            connection.query(sql, function(err, results){ 
                if(err) {
                    return res.send(error(err));
                }
                console.log(results)
                res.send(success(results));
            })
        }
        else {
            // the student has still got some modules assigned
            res.send(error(req.params.id + " has associated modules he/she cannot be deleted"));
        }
    })
})

//get a certain student using idpost
app.get('/api/student/:id', (req, res) => {

    console.log("Student List called");
    let sql = "SELECT * from student where sid = '" + req.params.id + "'";
    console.log(sql);
    connection.query(sql, function (err, results, fields) {
       
        if (err) {
            return res.send(error(err));
        }
        console.log(results)
        res.json(success(results));
    });
})

// add a student to a module
app.post('/api/studenttomodule', (req, res) => {

    // make sure that the student and module exists
    let sql = "SELECT * from student where sid = '" + req.body.sid + "'";
    console.log(sql);
    connection.query(sql, function (err, results, fields) {
        if (err) {
            return res.send(error(err));
        }
        if (results.length == 0) {
            return res.send(error("Student does not exist"))
        }

        sql = "SELECT * from module where mid = '" + req.body.mid + "'";
        console.log(sql);
        connection.query(sql, function (err, results, fields) {
                if (err) {
                    return res.send(error(err));
                }
                if (results.length == 0) {
                    return res.send(error("Module does not exist"))
                }

                console.log("Add Student to Module");
                let sql = "INSERT INTO student_module (sid, mid) VALUES ('"
                    + req.body.sid + "', '" + req.body.mid + "')";
                console.log(sql); 
    
                connection.query(sql, function(err, results, fields) {
                    if (err) {
                        return res.send(error(err));
                    }
                    console.log("1 record inserted");
                    console.log(results)
                    console.log('The field is: ', fields);
                    res.send(success(results));
                });

         });
         
        });
    });

//get student module list
app.get('/api/students_modules', (req, res) => {

    console.log("Student_Module List called");
    connection.query('SELECT * from student_module', function (err, results, fields) {
        if (err) {
            return res.send(error(err))
        }
        console.log('The solution is: ', results);
        console.log('The solution is: ', fields);
        res.json(success(results));
    });
})


function error(details) {
    return {
        error: true,
        details: details
    };
}

function success(details) {
    return {
        error: false,
        details: details
    };
}

app.listen(port, () => {
    console.log("Planner Server listening at http://localhost:"+port)
})