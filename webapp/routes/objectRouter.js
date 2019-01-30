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
    });
});

objectRouter.route('/:id')
.get((req,res)=>{
    Object.findById(req.params.id,(err, objects)=>{
        res.render('object', {
            objects: objects
        });
    });
});

objectRouter.route('/edit/:id')
.get((req,res)=>{
    Object.findById(req.params.id,(err,objects)=>{
        res.render('edit_object', {
            objects: objects,
            title:'Edit Object'
        });
    });
        
})
.post((req,res)=>{
    let objet = {};

    objet.objet = req.body.objet
    objet.date_perdu = req.body.date_perdu
    objet.proprio = req.body.proprio
    objet.info = req.body.info
    objet.couleur = req.body.couleur

    let query = {_id:req.params.id}

    Object.update(query,objet,(err)=>{
        if(err){
            console.log(err);
            return;
        }else{
            res.redirect('/objects')
        }
    })
});

//GET est utiliser ici pour ne PAS faire un client-server, sinon j'aurais utiliser des request AJAX et jquery
objectRouter.route('/delete/:id')
.get((req,res,next)=>{
    Object.findByIdAndRemove(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
        res.redirect('/objects');
    }, (err) => next(err))
    .catch((err) => next(err));
    res.redirect('/objects');
});





module.exports = objectRouter;
