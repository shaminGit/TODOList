var express = require('express');             //acquiring express
var bodyParser = require('body-parser');       // acquiring bodyParser

var connection = require('./dbconfig/connection');
var routes = require('./controller/route');

var app = express();
app.use(bodyParser.urlencoded({extended:true}));    //
app.use(bodyParser.json());           //

connection.init();                //to initialize the connection
routes.configure(app);            // to route the request from client

var server = app.listen(5000, function(){              //start the server at port 8000
  console.log('Server listening on port ' + server.address().port);
});
