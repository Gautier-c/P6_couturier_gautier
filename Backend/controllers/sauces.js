const Sauce = require('../models/Sauce'); //recup modèle sauce
const fs = require('fs');

exports.createSauce = (req, res, next) => { //Création d'une sauce
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce ({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    sauce.save()
    .then(() => res.status(201).json({ message : "Sauce créée !"}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => { //Modification d'une sauce
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => { //Suppression d'une sauce
    Sauce.findOne({ _id:req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
          .catch(error => res.status(400).json({ error }));
      })
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => { //Affichage d'une sauce en particulier
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};

exports.getAllSauce = (req, res, next) => { //Affichage de toutes les sauces
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => { //Ajout Like/Dislike
  const user = req.body.userId;
  const sauceId = req.params.id;
  const like = req.body.like;

  if (like === 1){ //User like
    Sauce.findOne({ _id: sauceId })
    .then((sauce) => {
      Sauce.updateOne(
        { _id: sauceId },
        {
          $push: { usersLiked: user },
          $inc: { likes: like },
        }
      )
      .then(() => res.status(200).json({ message: 'sauce liké !' }))
      .catch((error) => res.status(400).json({ error }))
    })    
  }
  if (like === -1){ //User dislike
    Sauce.findOne({ _id: sauceId })
    .then((sauce) => {
      Sauce.updateOne(
        { _id: sauceId },
        {
          $push : {usersDisliked: user },
          $inc: { dislikes: -like},
        }
      )
      .then(() => res.status(200).json({ message: 'sauce disliké !' }))
      .catch((error) => res.status(400).json({ error }))
    })
  }
  if (like === 0) //User annule un like/dislike
    Sauce.findOne({ _id: sauceId })
    .then((sauce) => {
      if (sauce.usersLiked.includes(user)){ //Annule like
        Sauce.updateOne(
          { _id: sauceId },
          {
            $pull: { usersLiked: user },
            $inc: { likes: -1 },
          }
        )
        .then(() => res.status(200).json({ message: 'Un like en moins !' }))
        .catch((error) => res.status(400).json({ error }))
      }
      if (sauce.usersDisliked.includes(user)){ //Annule dislike
        Sauce.updateOne(
          { _id: sauceId },
          {
            $pull: { usersDisliked: user },
            $inc: { dislikes: -1 },
          }
        )
        .then(() => res.status(200).json({ message: 'Un dislike en moins !' }))
        .catch((error) => res.status(400).json({ error }))
      }
    })
    .catch((error) => res.status(404).json({ error }));
};