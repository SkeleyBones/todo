const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'admin',
    password : 'student',
    database : 'ninjatasker'
});

db.connect(function(err){
    if (err) throw err;
    console.log("DB is connected ...");
});


const urlEncoded = bodyParser.urlencoded({extended: false})

const dummyData = [{taskItem: "Work on my portfolio" },{taskItem: "Code and watch anime"},{taskItem: "Sleep"}];

// setting up
const app = express();

// setting template engine
app.set("view engine","ejs");

// use middle ware to serve static files
app.use(express.static('./public'));

// ############### ROUTES ##############

// Get for tasks: returns all tasks
app.get('/', (req, res) => {
    let sql = 'SELECT * FROM task';
    db.query(sql, function (err, results) {
        if (err) throw err;
        // rendering tasks view and passing taskToDo data
        res.render('tasks', {taskToDo: results});
    });
});




// Post for tasks: posting a task
app.post('/tasks', urlEncoded, (req, res) => {
    let task = req.body
    let sql = 'INSERT INTO task SET ?';
    db.query(sql, task, function (err, results) {
        if (err) throw err;
        // rendering tasks view and passing taskToDo data
        console.log(results)
        res.redirect('/')
    });
});

// Delete for task: deleting specify task
app.delete("/tasks/:id", (req, res) => {
    let sql = 'DELETE  FROM task WHERE ID=' + req.params.id;
       db.query(sql,(err, results) => {
           if(err) throw err;
           console.log(results);
           res.send(results)
       })
    });

app.listen(3000, (err) => {
    if (err)
        console.log(err)
    console.log('Server is live on port 3000')
})  