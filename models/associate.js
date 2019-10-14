const mongoose = require('mongoose');

//user schema
let associateSchema = mongoose.Schema({
  firstName:{
    type : String,
    required: true
  },
  lastName:{
    type : String,
    required: true
  },

  email:{
    type : String,
    required: true
  },
  password:{
    type : String,
    required: true
  }
});

let Associate = module.exports = mongoose.models.associate || mongoose.model('associate', associateSchema);
