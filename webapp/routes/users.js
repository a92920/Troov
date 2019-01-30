var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

var router = express.Router();
router.use(bodyParser.json());

//body-parser middleware
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json());




router.get('/signup',(req,res)=>{
    res.render('signup');
});

router.post('/signup', (req, res, next) => {
  //passport register method on user model & Schema User.register(new User, req.body.password),
  User.register(new User({username: req.body.username}), 
  req.body.password, (err, user) => {
  if(err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.json({err: err});
  }
  else {
    if(req.body.firstname)
      user.firstname = req.body.firstname;
    
    if(req.body.lastname)
      user.lastname = req.body.lastname;
    user.save((err, user)=> {
      if (err){
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
      }
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    });
    
  }
});
});

router.get('/login',(req,res)=>{
    res.render('login');
});
router.post('/login',(req, res,next) => {
    passport.authenticate('local',{
        successRedirect:'/objects',
        failureRedirect:'/users/login',
        failureFlash: true
    })(req,res,next);
  });


router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/users/login');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});
module.exports = router;