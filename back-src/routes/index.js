let express = require('express');
let db = require('../db');
let router = express.Router();
let cors = require('cors');

router.use(cors());

/* GET home page. */
router.get('/', function(req, res, next) {
  db.query('SELECT * from Project', function (error, results, fields) {
    if (error)
      throw error;
    else
      res.send(JSON.stringify(results));
  });
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

module.exports = router;
