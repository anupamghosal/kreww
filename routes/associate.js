const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const flash = require('connect-flash');


const { ensureAssociate } = require('../config/authAssociate');

//passport config
require('../config/associatePassport')(passport);


//Bring in model
let Cart = require('../models/cart');
let User = require('../models/users');


//register form
router.get('/register' , (req,res)=> {
  res.render('associateSide/register', {
    title: 'Register'
  });
});


//registeration process
router.post('/register',[
  check('firstName', 'First Name is required').not().isEmpty(),
  check('lastName', 'Last Name is required').not().isEmpty(),
  check('email', 'Email is required').not().isEmpty(),
  check('email', 'Email is not valid').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  check('password2', 'password does not match').custom((value, { req }) => value === req.body.password),

], (req,res)=> {
  const { firstName, lastName, email, password, password2 } = req.body;


  let errors = validationResult(req);

  if(!errors.isEmpty()) {
    res.render('associateSide/register', {
      errors : errors.array()
    });
  } else {
    User.findOne({email: email}).then(user => {
      if(user) {
        req.flash('error', 'Email is already registered. Try logging in')
        res.render('associateSide/register', {
          errors : errors.array(),
        });

      } else {
        let newAssociate = new User({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          role: "associate"
        });

        bcrypt.genSalt(10, (err, salt)=> {
          bcrypt.hash(newAssociate.password, salt, (err,hash)=>{
            if(err){
              console.log(err);
              return;
            }
            newAssociate.password = hash;
            newAssociate.save((err)=> {
              if(err){
                console.log(err);
                return;
              } else {
                req.flash('success', 'You are now successfully registerated.');
                req.flash('success', 'Login to continue.');
                res.redirect('/associate/login');
              }
            })
          });
        });
      }
    });
  }
});

//login form
router.get('/login' , (req,res)=> {
  res.render('associateSide/login');
});


//login process
router.post('/login', (req, res, next)=> {
  passport.authenticate('local-user', {
    successRedirect: '/associate/dashboard',
    failureRedirect: '/associate/login',
    failureFlash: true
  })(req,res,next);

});



//profile page
router.get('/profile',ensureAssociate, (req, res)=> {
  res.render('associateSide/profile', {
    associate: req.user
  });
});


router.get('/logout', (req,res)=> {
  req.logout();
  req.flash('success', 'successfully logged out');
  res.redirect('/login');
});

//dashboard
router.get('/dashboard',ensureAssociate, (req,res)=> {
  Cart.find({accepted: req.user.id},(err, cart)=> {
    if (err) throw err;
    else{
      res.render('associateSide/dashboard', {
        associate: req.user,
        orders: cart.reverse()
      });
    }
  });
});


//get work
router.get('/todo',ensureAssociate, (req, res)=> {
  Cart.find({rejected: {$ne: req.user.id}}, (err, cart)=> {
    if(err){
      console.log('error');
    } else {

      res.render('associateSide/todo', {
        title: 'Appointments',
        orders: cart.reverse(),
        user: req.user
      });
    }
  });
});

//detail of appoinment
router.get('/:id',ensureAssociate, (req,res)=>{
  Cart.findById(req.params.id, (err, cart)=> {
    res.render('associateSide/todoDetail', {
      order : cart,
      user: req.user
    });
  });
});

router.post('/orders/:id', (req,res)=> {
  const id = req.user.id;
  const resp = req.body.respon;
  const delay = req.body.delay;
  const assoName = req.user.firstName +' '+ req.user.lastName;
  const otp = req.body.otp;
  if(resp === 'accepted'){
    Cart.findOneAndUpdate({_id: req.body.orderID}, {accepted: id, assoName: assoName}, (err)=>{
      if (err) throw err;
      else {
        req.flash('success', 'Appointment has been accepted');
      }
    });
  } else if (resp === 'rejected') {
    Cart.findOneAndUpdate({_id: req.body.orderID}, {$push: {rejected: id}}, (err)=> {
      if(err) throw err;
      else {
        req.flash('success', 'Appointment has been rejected');
      }
    });
  } else if(resp === 'delay') {
    Cart.findOneAndUpdate({_id: req.body.orderID}, {delay: delay}, (err)=>{
      if (err) throw err;
      else {
        req.flash('success', 'Delay notice has been sent successfully');
      }
    });
  }  else if(resp === 'done'){
      Cart.findOne({_id: req.body.orderID}, (err,cart)=>{
        if(err) throw err;
        else {
          if(cart.otp == otp){
            let order = {};
            order.done = true;
            Cart.updateOne({_id: req.body.orderID}, {done: 'true'}, (err)=> {
              if (err) throw err;
              else {
                req.flash('success', 'Order completed');
              }
            });
          } else {
            req.flash('error', 'The OTP entered is incorrect!');
            Cart.findOne({_id: req.body.orderID},(err,cart)=> {
              if (err) throw err;
              else {
                res.render('todoDetail', {
                  cart
                });
              }
            });
          }
        }
      });
  }


});


router.get('/profile/edit',ensureAssociate, (req,res)=>{
    res.render('associateSide/edit_profile', {
      user: req.user
    });
});


router.post('/profile/edit',ensureAssociate, (req,res)=>{
  let user = {};
  user.name = req.body.name;
  user.address = req.body.address;
  user.number = req.body.number;
  user.email = req.body.email;

  let query = {_id:req.user.id};

  User.updateOne(query, user, (err)=> {
    if(err) throw err;
    else{
      res.redirect('/associate/profile');
    }
  });
});

router.get('/work/done', (req, res)=> {
  res.render('done');
});


module.exports = router;
