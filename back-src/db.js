var mysql = require('mysql');

// Global handle to the database
module.exports = mysql.createConnection({
  host     : 'db',
  user     : 'root',
  password : 'password',
  database : 'cdp'
});
