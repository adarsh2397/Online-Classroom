const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'uploads')));
// Launch Connection to the Database

var mysql = require('mysql');

var db_config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'Online-Classroom',
    connectionLimit: 10
};

var pool = mysql.createPool(db_config);

require('./src/login.module.js')(app, pool);
require('./src/user.module.js')(app, pool);



// Local Functions and Request Handlers
app.get('/', function(req, res) {
    res.send('Hello World');
    res.end();
});

app.listen(3000, function() {
    console.log('App Listening on port 3000');
});