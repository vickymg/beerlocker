// Get the packages needed
var express = require('express');

//Create the Express application
var app = express();

//Use environment defined port or 3000
var port = process.env.PORT || 3000;

//Create the Express route
var router = express.Router();

//Initial dummy route for testing
//http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'You are running dangerously low on beer!'});
});

//Register all routes with /api
app.use('/api, router');

//Start the server
app.listen(port);
console.log('Insert beer on port ' + port);
