<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const cors = require('cors');


router.use(cors());

router.get('/', (req, res, next) => {
  res.send('Server live');
});


//Redirect a faire dans la partie front
module.exports = router;
