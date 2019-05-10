var connection = require('../dbconfig/connection');

//var display = require('dom.js');
// declaring function // TODO:

function Todo() {
  this.get = function(res) {
    connection.acquire(function(err,con) {
      con.query('select * from list', function(err,result) {
        con.release();
        res.send(result);
        console.log("Get successful");
      });
    });
  };
  this.getByID = function(id,res) {
    connection.acquire(function(err,con) {
      con.query('select * from list where id = ?', id, function(err,result) {
        con.release();
        res.send(result);
        console.log("Get by ID successful");
      });
    });
  };
  this.fetchnote = function(todo,res){
        // console.log(todo.username);
         connection.acquire(function(err, con){

          con.query('select *from usernotes where username= ?',todo.username , function(err , result){
          con.release();


          var str = JSON.stringify(result);
        //var json = JSON.parse(str);
          res.send(str);    //
         console.log(str);   //
        });
    });
  };

  // this section will handle the login task..
  this.login = function(todo,res) {
    var username=todo.username;
    var pass = todo.pass;
  // estabilishing connectin for verifying login credentials..
    connection.acquire(function(err,con) {
        con.query('select *from list where username= ?', username , function(err,result) {
        //con.release();
        var string = JSON.stringify(result);   // to convert rowdatapacket into json object
        var json1 = JSON.parse(string);
        if (err) {
          res.send({status:1, message:'TODO creation fail'});
        }
        else {
          if(json1[0].pass == pass)
          {
            res.send('<h1>Login Successful!!</h1><button type="submit"><a href="http://localhost:5000/index.html"><b>Lets Start</a></button>');
            console.log("Login Successfull");
            // estabilishing connections for displaying notes..
          }
        else res.send('<h1>Login Failed!!</h1><button type="submit" ><a href="http://localhost:5000/login.html"><b>Try Again</a></button>');

          }

      });

   });
  }

  this.signup = function(todo,res) {
    connection.acquire(function(err,con) {
      var username = todo.username;
      var pass = todo.pass;
      con.query('insert into list (username,pass) values (? ,?)',[username,pass],function(err,result) {
        con.release();
        if (err) {
          res.send('<h1>Signup failed</h1>');
        } else {
          res.send('<h1>Signup Done</h1><button type="submit"><a href="http://localhost:5000/login.html"><b>Login to Begin</a></button>');
          console.log("signup successful");
        }
      });
    });
  };


  this.update = function(todo,res) {
      console.log(todo.node);
      console.log(todo.user);

      connection.acquire(function(err,con) {

      con.query('insert into usernotes(username,usernote) values (?,?)',[todo.user ,todo.node], function(err,result) {
        con.release();
        if (err) {
          res.send({status:1, message:'update fail'});
        } else {
          res.send({status:0, message:'update success'});
          console.log("update successful");
        }
      });
    });
  };

  this.delete = function(id,res) {
    connection.acquire(function(err,con) {
      con.query('delete from list where id = ?', id, function(err,result) {
        con.release();
        if (err) {
          res.send({status:1, message:'TODO delete fail'});
        } else {
          res.send({status:0, message:'TODO delete success'});
          console.log("Delete successful");
        }
      });
    });
  };
};



module.exports = new Todo();
