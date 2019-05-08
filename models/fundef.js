var connection = require('../dbconfig/connection');

// declaring function // TODO:

function Todo() {
  this.get = function(res) {
    connection.acquire(function(err,con){
      con.query('select *from list',function(err, result){
        con.release();
        res.send(result);
        console.log("Get Successful");
      });
    });
  };

  this.getByID = function(id , res){
    connection.acquire(function(err,con){
       con.query('select *from list where id = ?',id , function(err,result){
          con.release();
          res.send(result);
          console.log("Get By ID succussful");
       });

    });
  };
  this.create = function(todo, res){
    connection.acquire(function(err,con){
      con.query('insert into list set ?',todo ,function(err, result)
      {
        con.release();
        if(err) {
          res.send({status:1, message:'list creation fail'});
         } else {
          res.send({status:0,message:'list creation success'});
          console.log("post successful");
        }
      });
   });
 };
    this.update = function(todo,id,res) {
      connection.acquire(function(err,con) {
        con.query('update todo_list set name = ? where id = ?', [todo, id], function(err,result) {
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
        con.query('delete from todo_list where id = ?', id, function(err,result) {
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

  module.export = new Todo();
