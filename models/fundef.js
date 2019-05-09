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
            con.query('select *from usernotes where username= ?',username, function(err , result){
                 con.release();
                 var string = JSON.stringify(result);   // to convert rowdatapacket into json object
                 var json2 = JSON.parse(string);
                 if (err) {
                 //res.send({status:1, message:'fetching from database failed'});
                 }
                 else {
                 //  res.send({note:json2[0].usernote});
                  console.log(json2[0].usernote);      // fetching the uesrnote value from json object
                 }
               });
           }
        else res.send('<h1>Login Failed!!</h1><button type="submit"><a href="http://localhost:5000/login.html"><b>Try Again</a></button>');
         }

      });

   });
  }

  this.signup = function(todo,res) {
    connection.acquire(function(err,con) {
      con.query('insert into list set ?', todo, function(err,result) {
        con.release();
        if (err) {
          res.send({status:1, message:'TODO creation fail'});
        } else {
          res.send({status:0, message:'TODO create success'});
          console.log("Post successful");
        }
      });
    });
  };


  this.update = function(todo,id,res) {
    connection.acquire(function(err,con) {
      con.query('update list set username = ? where id = ?', [todo, id], function(err,result) {
        con.release();
        if (err) {
          res.send({status:1, message:'TODO update fail'});
        } else {
          res.send({status:0, message:'TODO update success'});
          console.log("Put successful");
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
