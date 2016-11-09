var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var todos = require('./data/todos.json');


// middlewares
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); 


app.get('/', function(req, res) {
    res.json({ message: "Hello from paul's api"});
});


app.get('/api/todos', function(req, res) {
    res.json(todos);
});

app.get('/api/todos/:id', function (req, res) {
    var id = req.params.id;
    var todo = todos[id];

    res.json(todo);
});

app.post('/api/todos', function(req, res) {
    req.body.createdAt = new Date();
    var todo = req.body;
    todos.unshift(todo);

    // Write data to file
    fs.writeFile('./data/todos.json', JSON.stringify(todos), 
        function (err) {
          if (err) throw err;
          console.log('It\'s saved!');
    });
    res.json(todos);
});


app.delete('/api/todos/:id', function(req, res) {
    var id = req.params.id; // get pass param
    todos.splice(id, 1);

    // Write data to file
    fs.writeFile('./data/todos.json', JSON.stringify(todos), 
        function (err) {
          if (err) throw err;
          console.log('It\'s saved!');
    });
    res.json(todos);
});


app.listen(3000, function(){
    console.log("Listening on port 3000");
});
