var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var mysql = require('./dbcon.js');

app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5840);

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

app.get('/', function(req, res, next){
  var context = {};
  
  console.log("GET Request Received By Server!");
  
  mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if (err){
      next(err);
      return;
    }
    
    
    res.render('home');
    res.send(JSON.stringify(rows));
    
  });
  
});

app.post('/', function(req,res,next){
  var context = {};
  //context.results = "You've sent a POST request";
  
  console.log("POST Request Received By Server!");
  console.log(req.body);
  
  if(req.body.addExerciseButton){   // We came in from the add exercise form so need to add a row to the database table
    mysql.pool.query('INSERT INTO workouts (name, reps, weight, date, lbs) VALUES (?,?,?,?,?)', [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs], function(err, result){
        if (err) {
            next(err);
            return;
        }
      
        else {
            mysql.pool.query('SELECT * FROM workouts', function (err, rows, fields) {
                if (err) {
                    next(err);
                    return;
                }

                else {
                  res.send(JSON.stringify(rows));
                  
                  //context.results = JSON.stringify(rows);
                  //res.render('home', context);
                }
            });
        }
        
    });
  }
  
 /*
    // Get updated table after a change in the table occurs
    mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
      if (err){
        next(err);
        return;
      }
    
    context.results = JSON.stringify(rows);
  
    res.render('home',context);
    });
    */
   
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
