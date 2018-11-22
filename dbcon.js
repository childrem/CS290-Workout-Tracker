var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host : 'classmysql.engr.oregonstate.edu',
  user : 'cs290_yyyy',
  password : 'xxxx',
  database : 'cs290_yyyy'
  dateStrings : 'date'
});

module.exports.pool = pool;
