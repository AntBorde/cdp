let express = require('express');
let db = require('../db');
let router = express.Router();
let cors = require('cors');

router.use(cors());

router.get('/', function(req, res, next) {
      res.send("ok");
});

router.get('/users' , function(req, res, next) {
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


router.post('/project' , function(req, res, next) {
  console.log("=================================================================================================================================================================================================================================");
  console.log(req.body.Name);
  /*db.query('INSERT INTO Project(name,describle,git) VALUES (req.body.name,req.body.describle,req.body.git)', function (error, results, fields) {
    if (error){
      throw error;
    }
    else {
      res.send(JSON.stringify(results));
    }
  });*/
});


router.get('/project/:nom' , function(req, res, next) {
  db.query('SELECT * from Project WHERE name =' + req.params.nom, function (error, results, fields) {
    if (error){
      throw error;
    }
    else {
      res.send(JSON.stringify(results));
    }
  });
});

module.exports = router;
