const express = require('express');   //plugin Express
const router = express.Router();      

const sauceCtrl = require('../controllers/sauces');         //Appel du controlleur sauces.js
const auth = require('../middleware/auth');                 //Appel middleware auth.js
const multer = require('../middleware/multer-config');      //appel middleware multer-config.js


router.post('/', auth, multer, sauceCtrl.createSauce);      //Route création d'une sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);            //Route voir UNE sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce);    //Route modifier une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);         //Route supprimer une sauce
router.get('/', auth, sauceCtrl.getAllSauce);               //Route affichage de TOUTES les sauces

router.post('/:id/like', auth, sauceCtrl.likeSauce);        //Route like/dislike une sauce

module.exports = router;