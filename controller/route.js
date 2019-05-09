var todo = require('../models/fundef');    //fetching the function definitions into the todo variable
var path = require('path');
module.exports = {                                //now use export so that third party module can use it.
  configure: function(app) {

    app.get('/index.html', function (req, res) {
       //res.sendFile('index.html', { root: '/Users/lenovo/Qphi/nodeapp/frontend/'});
       res.sendFile(path.resolve('/Users/lenovo/Qphi/nodeapp/frontend/index.html'));
    });

    app.get('/todo',function(req,res) {
      todo.get(res);
    });
    app.get('/todo/:id',function(req,res) {
      todo.getByID(req.params.id,res);
    });
    app.post('/login',function(req,res) {
      todo.login(req.body,res);
    });
    app.post('/signup',function(req,res){
      todo.signup(req.body,res);
    });

    app.put('/todo/:id',function(req,res) {
      todo.update(req.body.username,req.params.id,res);
    });
    app.delete('/todo/:id',function(req,res) {
      todo.delete(req.params.id,res);
    });

  }
};
