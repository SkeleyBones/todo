const express = require('express')
const bodyParser = require('body-parser')
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
app.get('/tasks', function (req, res) {
    console.log("hitting get route");
    res.render('tasks', {taskToDo: dummyData});
});

// Post for tasks: posting a task
app.post('/tasks', urlEncoded, function(req, res){
  console.log("hitting Post route");
  let incomingItem = {}
  incomingItem.taskItem = req.body.task
  dummyData.push(incomingItem)
  console.log(dummyData)
  res.redirect('/tasks')
});
app.delete("/destroyer", function(){
    console.log(req.params.id);
    dummyData.splice(req.params.id, 1)
    console.log("hitting delete route");
    res.redirect('/tasks')
});

app.delete("/tasks/:id", function(req, res){
    // console.log(req.params.id);
    dummyData.splice(req.params.id, 1);
    // console.log(dummyData);
    res.redirect('/tasks')
});

app.listen(3000, function(err){
    if (err)
        console.log(err)
    console.log('Server is live on port 3000')
})  