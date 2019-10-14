const mongoose = require('mongoose');

//user schema
let userSchema = mongoose.Schema({
  firstName:{
    type : String,
    required: true
  },
  lastName:{
    type : String,
    required: true
  },
  address:{
    type : String,

  },
  email:{
    type : String,
    required: true
  },
  password:{
    type : String,
    required: true
  },
  phone:{
    type : Number,
  },

  role:{
    type: String
  }
});

//let Cart = module.exports = mongoose.model('order', cartSchema);
let User = module.exports = mongoose.models.user || mongoose.model('user', userSchema);
