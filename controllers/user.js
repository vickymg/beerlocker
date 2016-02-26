//The view users implementation will be helpful for this tutorial,
//but is something you should consider not doing for applications you create.
//You don’t want to provide a list of all usernames nor do you want to expose
//the hashed passwords.

// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  var user = new User ({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'New beer drinker added to the locker room!'});
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res){
  User.find(function(err, users) {
    if (err)
    res.send(err);

  res.json(users);
  });
};
