const multer = require('multer');  //appel plugin multer pour le téléchargement de fichiers

const MIME_TYPES = {      //Bibliotheque des fichiers acceptés
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {  //Indique ou enregistrer les fichiers
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); //Remplace les "espaces" par des "_"
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);  //Donne un nom de fichier avec la date précise et l'extension voulu dans la bibliothéque
  }
});

module.exports = multer({storage: storage}).single('image');  //Exportation pour gerer uniquement le "storage" (le telechargement des fichiers)