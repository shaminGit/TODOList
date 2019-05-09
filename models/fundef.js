var connection = require('../dbconfig/connection');

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
    connection.acquire(function(err,con) {
      var username=todo.username;
      var pass = todo.pass;

      con.query('select *from list where username= ?', username , function(err,result) {
        con.release();
        var string = JSON.stringify(result);   // to convert rowdatapacket into json object
        var json = JSON.parse(string);
        if (err) {
          res.send({status:1, message:'TODO creation fail'});
        }
        else {
          if(json[0].pass == pass)
          {
            res.send({status:0,message:"Login Successful"});
            console.log("Login Successfull");
          }
        else res.send({status:0, message:'Enter correct Password'});
         }
      });
    });
  };
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
