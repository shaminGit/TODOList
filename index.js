var express = require('express');             //acquiring express
var bodyParser = require('body-parser');       // acquiring bodyParser

var connection = require('./dbconfig/connection');
var routes = require('./controller/route');
var app = express();
express.json();
express.urlencoded();

app.use(express.static(__dirname + '/frontend'));    // to server static files to the client
app.set('port',(process.env.PORT || 4000));
app.set('views', __dirname +'/views');
app.set('view engine'  ,'ejs');

app.use(bodyParser.urlencoded({extended:true}));    //
app.use(bodyParser.json());           //
app.use(bodyParser());

app.get('/', function(req, res) {
    res.render('/index.html');
});

connection.init();                //to initialize the connection
routes.configure(app);            // to route the request from client

var server = app.listen(app.get('port'), function(){              //start the server at port 5000
  console.log('Server listening on port ' + app.get('port'));
});
