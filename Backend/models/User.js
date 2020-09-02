const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseHidden = require('mongoose-hidden')();


const validateEmail = function(email) {   //Controle sur l'adresse MAIL
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true, validate: [validateEmail], hide: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(mongooseHidden);

module.exports = mongoose.model('User', userSchema);