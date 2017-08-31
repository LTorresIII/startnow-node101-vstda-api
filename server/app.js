const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json

//This is my mock data array
var intData = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];


// Status message from server/ Respond with a generic object
app.get('/',(req, res) => {
    
    res.json({status:'ok'});
});

//Read All Todo Items from List/ GET[array]--not sure on res.json below
app.get('/api/TodoItems', (req, res) =>{

     res.json(intData);
 });

//Read Single Todo Item from List/Use a route params to respond
app.get('/api/TodoItems/:number', (req, res) =>{
    intData.forEach(function (currentIndex){  
        if (parseInt(req.params.number) === currentIndex.todoItemId){
            console.log(currentIndex);
            res.json(currentIndex);
        };
    });   
    res.status(500).send('Request not found');  
});

//Create a single Todo Item/ Add an item to the dataset/DELETE here
app.post('/api/TodoItems/', function (req, res, next) {
  intData.push(req.body);
  console.log(req.body);
  res.status(201).json(req.body);
});


app.delete('/api/TodoItems/:number', function (req, res) {
        intData.forEach(function (currentIndex, index){  
        if (parseInt(req.params.number) === currentIndex.todoItemId){
            console.log(currentIndex);
            var removed = intData.splice(index, 1)
            console.log({removed})
            return res.json(removed[0]);
        };
    });   
    res.status(500).send('Request not found');
});

module.exports = app;


