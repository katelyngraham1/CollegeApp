# Introduction

This is the project submission for Katelyn Graham and is implemented as an ExpressJS web application that queries and updates a MySQL database and
a Mongo database.


# Installation
To install the application run the command `npm install` from the project root folder.

# Solution Overview
## Back End
This server provides a REST API to the Front End Application allowing it to perform CRUD like operations on the different resources stored in MySQL and MongoDB. 
To start the server you can run the following command from within the project root folder.

`node BackEnd\server.js`

_NOTE_:
For the backend server to work it needs the connection details of your mysql database. Currently this information can be found in the Server.js file at line 9.

```
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'collegedb'
});
```
If your database connection details are different then please edit this file accordingly.

## Front End
The front end web application is implemented using React and the initial skeleton of code was created using the utility `Create React App`.
The source code for the web application is located within the `src` directory and to launch it you can run the command `npm start` from within the project root folder. 
