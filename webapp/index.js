const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');




// Init app 
const app = express(); 

//load view engine => PUG 
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');



//Object route 
var objectRouter = require('../webapp/routes/objectRouter');
app.use('/objects', objectRouter);

//set public folder 
app.use(express.static(path.join(__dirname, 'public')));

//start server
app.listen(3000, function(){
    console.log('Server started on port 3000...')
});

//connecting mongodb & mongoose 
const url = 'mongodb://localhost:27017/Troov';
const connect = mongoose.connect(url);

connect.then((db) =>{
    console.log('connected coorectly to server');
})
