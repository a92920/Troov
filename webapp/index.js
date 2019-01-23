const express = require('express');
const path = require('path');

const app = express(); 

//load view engine => PUG 

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');


app.get('/', function(req,res){
    res.render('index', {
        title: "Objets:"
    });
});
app.listen(3000, function(){
    console.log('Server started on port 3000...')
});

