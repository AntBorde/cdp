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

/* GET Users */
router.get('/users', function(req, res, next) {
  db.query('SELECT * from User',function (error, results, fields) {
    if (error){
      throw error;
    }
    else {
      res.send(JSON.stringify(results));
    }
  });
});

//create user account
router.post('/users', function(req, res, next) {
  db.query('SELECT * from User where pseudo = ?',[req.body.pseudo], function(error, results, fields) {
    if (error) {
      throw error;
    } else if (results.length != 0) {
      console.log("user already exist");
    } else {
      db.query('INSERT INTO User(pseudo,name,first_name,birth_date,password) VALUES (?,?,?,?,?)',
	       [req.body.pseudo, req.body.name, req.body.first_name, req.body.birth_day, req.body.password],
	       function(error, results, fields) {
                 if (error) {
                   throw error;
                 } else {
                   res.send(JSON.stringify(results));
                 }
               });
    }
  });
});


/* GET User by id */
router.get('/users/:id' , function(req, res, next) {
  db.query('SELECT * from User WHERE user_id = ?',[req.params.id], function (error, results, fields) {
    if (error){
      throw error;
    }
    else {
      res.send(JSON.stringify(results));
    }
  });
});


/*Connexion*/
router.post('/connexion', (req, res, next) => {
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
