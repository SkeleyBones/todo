const express    = require('express');
const routes     = require('./routes');
const db         = require('./models/todo')

// starting up app
const app = express();

// adding context to our request
app.use( (req, res, next) => {
    req.context = { db: db }
    next();
});

// routing manager
app.use(routes);

// setting template engine
app.set("view engine","ejs");

// use middle ware to serve static files
app.use(express.static('./public'));

app.listen(3000, (err) => {
    if (err)
        console.log(err)
    console.log('Server is live on port 3000')
})  