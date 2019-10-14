const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Associate = require('../models/associate');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
  //local strategy
  passport.use('associate-local', new LocalStrategy({usernameField: 'email'}, (email,password, done)=> {
    //matching username

    Associate.findOne({email:email} , (err, associate)=> {
      if(err) {
        return done(err);
      }
      if(!associate){
        return done(null, false, {message: 'No user found with the email address'});
      }
      //match the password
      bcrypt.compare(password, associate.password, (err, isMatch)=> {
        if(err) throw err;
        if(isMatch){
          return done(null, associate);
        } else {
          return done(null, false, {message: 'Wrong password'});
        }
      });
    });
  }));


  passport.serializeUser(function(associate, done) {
  done(null, associate._id);
});

  passport.deserializeUser(function(id, done) {
    Associate.findById(id, function(err, associate) {
      done(err, associate);
    });
  });

}
