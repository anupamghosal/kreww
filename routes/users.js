const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const flash = require('connect-flash');


let upcoming = require('../dateHelper');

const { ensureCustomer } = require('../config/authUser');

//passport config
require('../config/userPassport')(passport);


//Bring in model
let User = require('../models/users');
let Cart = require('../models/cart');


//register form
router.get('/register' , (req,res)=> {
  res.render('userSide/register');
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
    errors=errors.array();
    res.render('userSide/register', {
      errors : errors,
    });
  } else {
    User.findOne({email: email}).then(user => {
      if(user) {
        req.flash('error', 'Email is already registered. Try logging in')
        res.render('userSide/register', {
          errors : errors.array(),
        });

      } else {
        let newUser = new User({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          role: "customer"
        });

        bcrypt.genSalt(10, (err, salt)=> {
          bcrypt.hash(newUser.password, salt, (err,hash)=>{
            if(err){
              console.log(err);
              return;
            }
            newUser.password = hash;
            newUser.save((err)=> {
              if(err){
                console.log(err);
                return;
              } else {
                req.flash('success', 'You are now successfully registerated.');
                req.flash('success', 'Login to continue.');
                res.redirect('/users/login');
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
  res.render('userSide/login');
});


//login process
router.post('/login', (req, res, next)=> {
  passport.authenticate('local-user', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req,res,next);
});



//profile page
router.get('/profile', ensureCustomer , (req, res)=> {
  res.render('userSide/profile', {
    user: req.user
  });
});

//logout
router.get('/logout', (req,res)=> {
  req.logout();
  req.flash('success', 'successfully logged out');
  res.redirect('/users/login');
});

router.get('/orders',ensureCustomer, (req,res)=> {
      Cart.find({user: req.user.id}, (err, orders)=>{
        if (err) throw err;
        else {
          res.render('userSide/userOrders', {
            orders: orders.reverse(),
            user: req.user
          });
        }
      });
  });


router.get('/orders/:id',ensureCustomer, (req,res)=>{
  Cart.findById(req.params.id, (err, order)=> {
    res.render('userSide/edit_order', {
      title: 'Edit Order',
      order: order,
      upcoming,
      username: req.user.id
    });
  });
});

router.post('/orders/:id',ensureCustomer, (req,res)=>{
  let order = {};
  order.date = req.body.date;
  order.time = req.body.time;
  order.repair = req.body.repair ? true : false;
  order.service = req.body.service ? true : false;

  let query ={_id:req.params.id};

  Cart.updateOne(query, order, (err)=> {
    if(err) throw err;
    else{
      res.redirect('/users/orders');
    }
  });
});


router.get('/profile/edit',ensureCustomer, (req,res)=>{
    res.render('userSide/edit_profile', {
      user: req.user
    });
});


router.post('/profile/edit',ensureCustomer, (req,res)=>{
  let user = {};
  user.name = req.body.name;
  user.address = req.body.address;
  user.number = req.body.number;
  user.email = req.body.email;

  let query = {_id:req.user.id};

  User.updateOne(query, order, (err)=> {
    if(err) throw err;
    else{
      res.redirect('/users/profile');
    }
  });
});

router.delete('/orders/:id',ensureCustomer, (req,res)=> {
  const id = req.params.id;
  let query = {_id:id};


  Cart.deleteOne(query, (err)=> {
    if(err) throw err;
    else{
      req.flash('success', 'The order has been cancelled');
    }
});
});

module.exports = router;
