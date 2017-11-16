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

/* GET projects */
router.get('/project' , function(req, res, next) {
  db.query('SELECT * from Project', function (error, results, fields) {
    if (error){
      throw error;
    }
    else {
      res.send(JSON.stringify(results));
    }
  });
});

/* POST project */
router.post('/project', function(req, res, next) {
  db.query('SELECT * from Project WHERE name = ?', [req.body.name],
	   function(error, results, fields) {
	     if (error) {
	       throw error;
	     } else if (results.length != 0) {
	       console.log("project already exist");
	     } else {
	       db.query('INSERT INTO Project(name,describle,git) VALUES (?,?,?)',
			[req.body.name, req.body.describle, req.body.git],
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

/* GET Project by name */
router.get('/project/:name' , function(req, res, next) {
  var param = req.params.name;
  db.query('SELECT * from Project WHERE name = ?', [param], function (error, results, fields) {
    if (error){
      throw error;
    }
    else {
      res.send(JSON.stringify(results));
    }
  });
});

/* GET Users to Project_team */
router.get('/project/:id/users' , function(req, res, next) {
  db.query('SELECT * from Project_team WHERE project_id = ?',[req.params.id], function (error, results, fields) {
    if (error){
      throw error;
    }
    else {
      res.send(JSON.stringify(results));
    }
  });
});
/*-----------------------------------------------------------*/
/* POST add user to the Project_team */
router.post('/project/:id/users/' , function(req, res, next) {
  db.query('INSERT INTO Project_team (project_id,user_id,status) VALUES (?,?,?) ',[req.params.id,req.body.user_id,req.body.role], function (error, results, fields) {
    if (error){
      throw error;
    }
    else {
      res.send(JSON.stringify(results));
    }
  });
});

/* GET Issue to Project */
router.get('/project/:id/issues' , function(req, res, next) {
  console.log(req.body.user_id);
  console.log(req.body.role);
  db.query('SELECT * from Issue WHERE project_id = ?',[req.params.id], function (error, results, fields) {
    if (error){
      throw error;
    }
    else {
      res.send(JSON.stringify(results));
    }
  });
});

/* GET Issue by id */
router.get('/project/:id/issues/:issue' , function(req, res, next) {
  db.query('SELECT * from Issue WHERE project_id = ? AND issue_id = ?',[req.params.id,req.params.issue], function (error, results, fields) {
    if (error){
      throw error;
    }
    else {
      res.send(JSON.stringify(results));
    }
  });
});

/* POST Issue to project */    /*Petit soucis de valeur non nul a régler sur les diff et les prio  */
router.post('/project/:id/issues/' , function(req, res, next) {
  console.log(req.body.storie);
  db.query('INSERT INTO Issue (storie,project_id,difficulty,priority,state) VALUES (?,?,?,?,?) ',[req.body.storie.user,req.params.id,req.body.difficulty,req.body.priority,req.body.state], function (error, results, fields) {
    if (error){
      throw error;
    }
    else {
      res.send(JSON.stringify(results));
    }
  });
});

/* PUT Change Issue */
router.put('/project/:id/issues/:issue' , function(req, res, next) {
  console.log(req.params.issue);
  db.query('UPDATE Issue SET storie = ? , difficulty = ? , priority = ? , state = ? WHERE Issue_id = ? ',[req.body.storie,req.body.difficulty,req.body.priority,req.body.state,req.params.issue], function (error, results, fields) {
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
