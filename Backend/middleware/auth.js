const jwt = require('jsonwebtoken');   //Appel plugin pour le Token d'authentification

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];    //Extraction du token de la requete entrante
    const decodedToken = jwt.verify(token, 'uMGhc6mojlX9l2bbeZRBZ39vzPoloRNp'); //verification du token
    const userId = decodedToken.userId;           //Extraction de l'ID user
    if (req.body.userId && req.body.userId !== userId) {  //Comparaison ID user et ID token
      throw 'User ID invalide';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête invalide')
    });
  }
};