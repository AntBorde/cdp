let express = require('express');
let router = express.Router();
let cors = require('cors');
var models  = require('../models');
var jwt = require('jsonwebtoken');

router.use(cors());

router.get('/', (req, res, next) => {
  res.send('Server live');
});

/*Connexion*/
router.post('/login', (req, res) => {
  models.users.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (user == null) {
	res.send("user not found");
      } else if (user.password != req.body.password) {
	res.send("incorrect password");
      } else {
	// Authentification
	let secret = "toto";
	let token = jwt.sign({ username: user.email }, secret);
	res.send({ token: token });
      }
    }).catch(err => res.send(err));
});

//Déconnexion
router.get('/logout', (req, res, next) => {
  res.send('TODO Revoke JWT\n');
});

//Redirect a faire dans la partie front
module.exports = router;
