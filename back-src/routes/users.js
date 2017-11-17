let express = require('express');
let db = require('../db');
let router = express.Router();

/* GET Users */
router.get('/', function(req, res, next) {
  db.query('SELECT * from User',function (error, results, fields) {
    if (error){
      throw error;
    }
    else {
      res.send(JSON.stringify(results));
    }
  });
});

//Create user account
router.post('/', function(req, res, next) {
  db.query('SELECT * from User where pseudo = ?', [req.body.pseudo], function(error, results, fields) {
    if (error) {
      throw error;
    } else if (results.length != 0) {
      console.log("user already exist");
    } else {
      db.query('INSERT INTO User(email,name,birth_date,password) VALUES (?,?,?,?)',
	       [req.body.email, req.body.name, req.body.first_name, req.body.birth_day, req.body.password],
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
router.get('/:id' , function(req, res, next) {
  db.query('SELECT * from User WHERE user_id = ?',[req.params.id], function (error, results, fields) {
    if (error){
      throw error;
    } else {
      res.send(JSON.stringify(results));
    }
  });
});

module.exports = router;
