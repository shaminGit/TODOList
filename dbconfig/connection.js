var mysql = require('mysql');      //import mysql module

function Connection() {                           // defining connection function
 this.pool = null;

 this.init = function(){                          //initializing databse
  this.pool = mysql.createPool({
     connectionLimit: 10,
     host:'localhost',
     user: 'root',
     password: 'mysql2020$',
     database:'userInfo'
  });
 };

this.acquire = function(callback){
   this.pool.getConnection(function(err , connection){    
     callback(err, connection);
   });
 };
}

module.exports = new Connection();   // so that another module can export the connection function
