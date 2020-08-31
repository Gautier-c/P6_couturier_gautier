const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseHidden = require('mongoose-hidden')();

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true, hide: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator, mongooseHidden);

module.exports = mongoose.model('User', userSchema);