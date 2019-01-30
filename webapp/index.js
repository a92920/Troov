const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var passport = require('passport');
var flash = require("connect-flash");
var session = require('express-session');



// Init app 
const app = express(); 


//sessions set-up 
app.use(session({ cookie: { maxAge: 60000 }, 
    secret: 'woot',
    resave: false, 
    saveUninitialized: false}));

//load view engine => PUG 
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

app.use(flash());
app.use(passport.initialize());



//Object route 
var objectRouter = require('../webapp/routes/objectRouter');
app.use('/objects', objectRouter);

//User route 
var user = require('../webapp/routes/users');
app.use('/users', user);

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
    console.log('connected correctly to server');
})
