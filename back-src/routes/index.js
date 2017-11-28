const express = require('express');
const router = express.Router();
const cors = require('cors');
const models  = require('../models');
let session;

router.use(cors());

router.get('/', (req, res, next) => {
  res.send('Server live');
});

/*Connexion*/
router.post('/login', (req, res, next) => {

  models.users.findOne( {where: { email:req.body.email}}).
  then(user=>{
  if(user==null)
  res.send("user not found");
  else
  {
    if(user.password!=req.body.password)
    res.send("incorrect password");
   else
  {
      //Authentification
      req.login(user.firstname, (err) => {
        if (err) {
          console.log("err");
          return;
        }
        //sauvegarder la session
        session = req.session;
        session.username = user.firstname;
        res.send('succesLogin'); 
     })
   }
  }
  }).catch(err=> {res.send(err)})
});

//Déconnexion
router.get('/logout', (req, res, next) => {
  //Détruire la session
  req.logout();
  req.session.destroy();
  res.send('succesLogout'); 
});

//Protéger les routes
function authentificationMiddleware(req, res, next) {
  if (req.isAuthenticated())
    next();
  else
    res.send('notAuthenticated');
}

//Accéder au profil de l'utilisateur en utilisant authentificationMiddleware
router.get('/profile', authentificationMiddleware, (req, res, next) => {
  res.send('succesAuthenticatedProfile');
});

//Redirect a faire dans la partie front
module.exports = router;
