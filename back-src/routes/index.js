let express = require('express');
let db = require('../db');
let router = express.Router();
let cors = require('cors');

router.use(cors());

router.get('/', function(req, res, next) {
      res.send("ok");
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

/*router.post('/users' , function(req, res, next) {
  db.query('SELECT * from User', function (error, results, fields) {
    if (error){
      throw error;
    }
    else {
      res.send(JSON.stringify(results));
    }
  });
});*/

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
router.post('/project' , function(req, res, next) {
  var user_post = req.body.user_post;
  db.query('INSERT INTO Project(name,describle,git) VALUES (?,?,?)',[req.body.name,req.body.describle,req.body.git], function (error, results, fields) {
    if (error){
      throw error;
    }
    else {
      res.send(JSON.stringify(results));
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

module.exports = router;
