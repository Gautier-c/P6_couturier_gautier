const express = require('express'); //Module express
const bodyparser = require('body-parser'); //module body parser
const mongoose = require('mongoose'); //module mongoose
const saucesRoutes = require('./routes/sauces'); // route sauces
const userRoutes = require('./routes/user'); // route user
const path = require('path');

const helmet = require("helmet"); // contre les attaque sur les cookies
const rateLimit = require('express-rate-limit');  //Limite le nombre de connexion possible
const mongoSanitize = require('express-mongo-sanitize');  //Contre l'injection
const xss = require('xss-clean');       //Contre les attaques XSS

const app = express();

app.use(helmet());
// Rate Limiting
const limit = rateLimit({
  max: 20,// max requests
  windowMs: 60 * 60 * 1000, // 1 Hour of 'ban' / lockout 
  message: 'Too many requests' // message to send
});
app.use('./routes/user', limit); // Setting limiter on specific route
// Data Sanitization against NoSQL Injection Attacks
app.use(mongoSanitize());
// Data Sanitization against XSS attacks
app.use(xss());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

mongoose.connect('mongodb+srv://devOfApp:devofapp@cluster0.uj5ln.mongodb.net/Cluster0?retryWrites=true&w=majority',  //Pour se connecter à mongoDB
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(bodyparser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;