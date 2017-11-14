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
  db.query('SELECT * from User WHERE user_id ='+ req.params.id, function (error, results, fields) {
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
  db.query('INSERT INTO Project(name,describle,git) VALUES ('+'\''+req.body.name+'\''+','+'\''+req.body.describle+'\''+','+'\''+req.body.git+'\''+')', function (error, results, fields) {
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
  console.log(param);
  db.query('SELECT * from Project WHERE name = \'' + param + '\'', function (error, results, fields) {
    if (error){
      throw error;
    }
    else {
      res.send(JSON.stringify(results));
    }
  });
});

module.exports = router;
