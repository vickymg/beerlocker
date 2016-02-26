// Get the packages needed
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Beer = require('./models/beer');

//Connect to the beerlocker MongoDV
mongoose.connect('mongodb://localhost:27017/beerlocker');

//Create the Express application
var app = express();

//Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

//Use environment defined port or 3000
var port = process.env.PORT || 3000;

//Create the Express route
var router = express.Router();

//Initial dummy route for testing
//http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'You are running dangerously low on beer!'});
});

//create a new route with the prefix /beers
var beersRoute = router.route('/beers');

// Create endpoint /api/beers for POSTS
beersRoute.post(function(req, res) {
  // create a new instance of the Beer model
  var beer = new Beer();

  // set the beer properties that came from the POST data
  beer.name = req.body.name;
  beer.type = req.body.type;
  beer.quantity = req.body.quantity;

  // Save the beer and check for errors
  beer.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Beer added to the locker!', data: beer });
  });
});

//Create endpoint /api/beers for get
beersRoute.get(function(req, res){
  //Use the Beer model to find all beerRoute
  Beer.find(function(err, beers) {
    if (err)
      res.send(err);

    res.json(beers);
  });
});

var beerRoute = router.route('/beers/:beer_id');

// create endpoint /api/beers/:beer_id for GET
beerRoute.get(function(req, res){
  Beer.findById(req.params.beer_id, function(err, beer) {
    if (err)
      res.send(err);

    res.json(beer);
  });
});

// create endpoint /api/beers/:beer_id for PUT
beerRoute.put(function(req, res){
  Beer.findById(req.params.beer_id, function(err, beer) {
    if (err)
      res.send(err);

      // Update the existing beer quantity
      beer.quantity = req.body.quantity;

      //Save the beer and check for errors
      beer.save(function(err) {
        if (err)
          res.send(err);

      res.json(beer);
    });
  });
});

// create endpoint /api/beers/:beer_id for DELETE
beerRoute.delete(function(req, res) {
  // use the Beer model to find a specific beer and remove it
  Beer.findByIdAndRemove(req.params.beer_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Beer removed from the locker!'});
  });
});

//Register all routes with /api
app.use('/api', router);

//Start the server
app.listen(port);
console.log('Insert beer on port ' + port);
