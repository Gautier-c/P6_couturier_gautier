const express = require('express'); //Module express
const bodyparser = require('body-parser'); //module body parser
const mongoose = require('mongoose'); //module mongoose
const saucesRoutes = require('./routes/sauces'); // route sauces
const userRoutes = require('./routes/user'); // route user
const path = require('path');
const mongoMask = require('mongo-mask'); //module mongomask masque les données
const helmet = require("helmet"); // contre les attaque sur les cookies

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

mongoose.connect('mongodb+srv://gautier:gautier@cluster0.uj5ln.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(bodyparser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

const map =
  { id: '_id' }

app.get('/item', (req, res, next) => {
  const fields = req.query.fields ? mongoMask(req.query.fields, { map }) : null
  mongoCollection.findOne({}, fields, (err, doc) => {
    if (err) return next(err)
    doc.id = doc._id
    delete doc._id
    res.json(doc)
  })
})

app.use(helmet());

module.exports = app;