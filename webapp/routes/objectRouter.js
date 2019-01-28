const express = require('express');
const bodyParser = require('body-parser');
const Object = require('../models/objects');
const mongoose = require('mongoose');

const objectRouter = express.Router(); 

//body-parser middleware
objectRouter.use(bodyParser.urlencoded({extended: false}))
objectRouter.use(bodyParser.json());

objectRouter.route('/')
.get((req,res)=>{
    Object.find({}, (error, objects)=>{
        res.render('index', {
            title: "Objets Perdu: ",
            objects: objects 
        });
    });
});

objectRouter.route('/add')
.get((req,res)=>{
    res.render('add_object', {
        title:'Add Object'
    });
})
.post((req,res)=>{
    let objet = new Object;
    objet.objet = req.body.objet
    objet.date_perdu = req.body.date_perdu
    objet.proprio = req.body.proprio
    objet.info = req.body.info
    objet.couleur = req.body.couleur

    objet.save(function(err){
        if(err){
            console.log(err);
            return;             
        }else{
            res.redirect('/objects')
        }
    })
});

module.exports = objectRouter;
