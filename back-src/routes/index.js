let express = require('express');
let db = require('../db');
let passport = require('passport');
let router = express.Router();
let cors = require('cors');

var session;

router.use(cors());

router.get('/', (req, res, next) => {
  res.send('Server live');
});

/*Connexion*/
router.post('/login', (req, res, next) => {
  var username = req.body.pseudo;
  var password = req.body.password;

  function handle_query(error, results, fields) {
    if (error) {
      console.log("err connexion");
      return;
    }
    //pseudo n'existe pas dans la bd
    if (results.length == 0) {
      console.log("pseudo n'existe pas dans la bd");
    } else if (results[0].password != password) {
      console.log("mot de passe incorrecte");
    } else {
      //Authentification
      req.login(username, (err) => {
	if (err) {
	  console.log("err");
	  return;
	}
	//sauvegarder la session
	session = req.session;
	session.username = username;
	//rediriger vers sa page de profil
	res.redirect('/profile');
      });
    }
  }

  db.query("select * from User where pseudo = ?", [username], handle_query);
});

//Déconnexion
router.get('/logout', (req, res, next) => {
  //Détruire la session
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

passport.serializeUser((username, done) => done(null, username));
passport.deserializeUser((username, done) => done(null, username));

//Protéger les routes
function authentificationMiddleware(req, res, next) {
  if (req.isAuthenticated())
    next();
  else
    res.redirect('/');
}

//Accéder au profil de l'utilisateur en utilisant authentificationMiddleware
router.get('/profile', authentificationMiddleware, (req, res, next) => {
  res.render('profile');
});

module.exports = router;
