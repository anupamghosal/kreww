const mongoose = require('mongoose');

//order schema
let cartSchema = mongoose.Schema({
  name:{
    type : String,
    required: true
  },

  user: {
    type: String,
    ref: 'User',
  },

  address:{
    type : String,
    required: true
  },
  areacode:{
    type : Number,
    required: true
  },
  repair:{
    type : Boolean,
  },
  service:{
    type : Boolean,
  },
  work:{
    type:String
  },

  date: {
    type: String
  },

  time: {
    type: Number
  },
  paymentID: {
    type: String,
  },

  accepted: {
    type: String,
  },

  rejected: {
    type: Array,
  },

  otp: {
    type: Number,
  },

  delay: {
    type: Number
  },

  assoName: {
    type: String
  },

  done: {
    type: Boolean
  },

  chat: {
    type: Array
  }

});

//let Cart = module.exports = mongoose.model('order', cartSchema);
let Cart = module.exports = mongoose.models.order || mongoose.model('order', cartSchema);
