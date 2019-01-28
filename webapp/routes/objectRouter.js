const express = require('express');
const bodyParser = require('body-parser');
const Object = require('../models/objects.js');
const authenticate = require('../authenticate');
const mongoose = require('mongoose');

const objectRouter = express.Router(); 
objectRouter.use(bodyParser.json());

objectRouter.route('/')
.get((req,res,next) => {
    Object.find({}, (err,objets)=>{
        res.render('index', {
            title: 'Objets Perdu',
            objet: objets
        });
    });

})
.post(authenticate.verifyUser,(req,res,next) =>{
    req.body.proprio = req.body.user_id
    Object.create(req.body)
    .then((objets)=> {
        console.log('objé créé', objets);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(objets);
    },(err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /exercises');
})
.delete((req, res, next) => {
    Object.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

objectRouter.route('/:objectId')
.get((req,res,next) => {
    Object.findById(req.params.objectId)
    .populate()
    .then((objet) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(objet);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /exercises/'+ req.params.objectId);
})
.put((req, res, next) => {
    Object.findByIdAndUpdate(req.params.objectId, {
        $set: req.body
    }, { new: true })
    .then((exercise) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(exercise);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Object.findByIdAndRemove(req.params.objectId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});



module.exports = objectRouter;