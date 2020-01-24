const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');


const services = require('../Service');

var upcoming = require('../dateHelper');
const appliances = require('../Appliance');
const { ensureCustomer } = require('../config/authUser');




const Cart = require('../models/cart');
const User = require('../models/users');

//order route
router.get('/:name', ensureCustomer, (req,res)=>{

  if(appliances.some(el => el.name === req.params.name)){
    res.render('cart',{
      title: req.params.name,
      appliances,
      upcoming
    });

  } else if(services.some(el => el.name === req.params.name)){

    res.render('cart',{
      title: req.params.name,
      services,
      upcoming
    });
  }
  else{
    res.status(404).render('404');
  }


  });

//checkout at address route
router.post('/:name',[
  check('address', 'Address is required').not().isEmpty(),
  check('areacode', 'Area code is required').not().isEmpty()

], (req,res)=> {
    let errors = validationResult(req);

  let cart = new Cart();
  cart.repair = req.body.repair ? true : false;
  cart.service = req.body.service ? true : false;

  if(cart.service === true || cart.repair === true){
    cart.name = req.user.firstName+' '+req.user.lastName;
    cart.user = req.user.id;
    cart.address = req.body.address;
    cart.areacode = req.body.areacode;
    cart.work = req.params.name;
    cart.date = req.body.date;
    cart.time= req.body.time;
    cart.otp = Math.floor(Math.random()*(99999 - 10000 + 1));



    if(!errors.isEmpty()) {
      if(appliances.some(el => el.name === req.params.name)){
        res.render('cart',{
          title: req.params.name,
          appliances,
          upcoming,
          errors: errors.array()
        });

      } else if(services.some(el => el.name === req.params.name)){

        res.render('cart',{
          title: req.params.name,
          services: services,
          upcoming,
          month,
          errors: errors.array()
        });
      }
    } else {
      cart.save((err)=>{
        if(err){
          console.log(err);
        } else {
          req.flash('success', 'Order Confirmed')
          res.render('thankyou')
        }
      });


    }
  }else {
    req.flash('error', 'Select the type of service you need');
    if(appliances.some(el => el.name === req.params.name)){
      res.render('cart',{
        title: req.params.name,
        appliances,
        upcoming,
        month
      });

    } else if(services.some(el => el.name === req.params.name)){

      res.render('cart',{
        title: req.params.name,
        services: services,
        upcoming,
        month
      });
    }
  }


});



module.exports = router;
