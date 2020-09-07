const express = require('express');             //module express
const router = express.Router();

const userCtrl = require('../controllers/user');        //Appel controlleur user.js

router.post('/signup', userCtrl.signup);            //Route inscription utilisateur
router.post('/login', userCtrl.login);              //Route connexion utilisateur

module.exports = router;