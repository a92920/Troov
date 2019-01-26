const express = require('express');
const path = require('path');
const mongoose = require('mongoose');




// Init app 
const app = express(); 

//load view engine => PUG 
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

//Home route 
app.get('/', function(req,res){
    let objects =[
        {
            id: 1, 
            type: 'wallet',
            author: 'Salim',
            info: "red etc..."
        },
        {
            id: 2, 
            type: 'Phone',
            author: 'Salim',
            info: "iPhone."
        },
        {
            id: 3, 
            type: 'Keys',
            author: 'Salim',
            info: "Keychain with a car that lights up, etc..."
        }
    ];
    res.render('index', {
        title: "Objets",
        objects: objects 
    });
});

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