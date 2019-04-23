// importing packages required

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql =require('mysql');
var Chart = require('chart.js');
//var myChart = new Chart(ctx, {...});

//Creating Connection to Database
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Node_db"
});

var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Checking the Connection is Establishe or not
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

//Redirecting to html file
app.get('/', function (req, res) {
  //var name='hello';
   res.sendFile( __dirname + "/" + "bargraph.html");
});

//QUERY TO RETRIEVE FROM DB
app.post('/process_get', function (req, res) {

	 var sql = "SELECT player_name,score FROM score ORDER BY playerid";
	   var query = conn.query(sql, (err, results) => {
	     if(err) throw err;

    //   res.setHeader('Access-Control-Allow-Origin', 'http://process_get.com');
      // res.setHeader('Access-Control-Allow-Methods', 'POST');

      // console.log('sai');
      // console.log(results);
      //res.json(results);

  	   res.send(JSON.stringify({results}));
      // next();
});
});


//SERVER PORT

var server = app.listen(9000, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
});
