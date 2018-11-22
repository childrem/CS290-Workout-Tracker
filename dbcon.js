var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host : 'classmysql.engr.oregonstate.edu',
  user : 'cs290_childrem',
  password : '2316',
  database : 'cs290_childrem',
  dateStrings : 'date'
});

module.exports.pool = pool;
