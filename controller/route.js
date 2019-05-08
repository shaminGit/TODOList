var todo = require('../models/fundef');    //fetching the function definitions into the todo variable

module.exports = {                                //now use export so that third party module can use it.
  configure: function(app) {
    app.get('/todo',function(req,res) {
      todo.get(res);
    });
    app.get('/todo/:id',function(req,res) {
      todo.getByID(req.params.id,res);
    });
    app.post('/todo',function(req,res) {
      todo.create(req.body,res);
    });
    app.put('/todo/:id',function(req,res) {
      todo.update(req.body.name,req.params.id,res);
    });
    app.delete('/todo/:id',function(req,res) {
      todo.delete(req.params.id,res);
    });
  }
};
