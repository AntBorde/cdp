let express = require('express');
let router = express.Router();
let cors = require('cors');

router.use(cors());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Server live');
});

module.exports = router;
