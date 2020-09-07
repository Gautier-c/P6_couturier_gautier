const mongoose = require('mongoose');   //Plugin mongoose
const uniqueValidator = require('mongoose-unique-validator'); //Plugin mongoose unique validator pour des adresses email unique

const validateEmail = function(email) {   //Controle sur l'adresse MAIL
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //regex email
  return re.test(email)
};

const userSchema = mongoose.Schema({      //Modéle User
  email: { type: String, required: true, unique: true, validate: [validateEmail] }, 
  password: { type: String, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);