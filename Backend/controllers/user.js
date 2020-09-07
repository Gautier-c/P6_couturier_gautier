const bcrypt = require('bcrypt');  //Plugin de cryptage du password
const jwt = require('jsonwebtoken'); //Token d'identifications
const User = require('../models/User'); //Appel du modele User

exports.signup = (req, res, next) => {  //Inscription d'un utilisateur
    bcrypt.hash(req.body.password, 10) //Salage du password
      .then(hash => {
        const user = new User({ 
          email: req.body.email,
          password: hash  //cryptage du password
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
  .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {   //Connexion d'un utilisateur
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur introuvable !' });
        }
        bcrypt.compare(req.body.password, user.password)  //Comparaison de Bcrypt avec la BDD et le formulaire
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'uMGhc6mojlX9l2bbeZRBZ39vzPoloRNp', //Verification du token d'authentification
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};