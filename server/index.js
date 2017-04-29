var express = require('express');
var bodyParser = require('body-parser'); 
var items = require('../database');
var request = require('request');
var Report = require('../database');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/items', function (req, res) {
  let droneApiUrl = 'http://api.dronestre.am/data'; 
  let placesApiUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="; 
  let placesApiKey = "AIzaSyAWh923QwLcLQGjH1w4OYOG0_CX8jGHbmE";

  // Request JSON feed
  request(droneApiUrl, function (err, resp, data) { 
    let rawData = JSON.parse(data);
    let strikes = rawData.strike;

    strikes.forEach( strike => {
      let placesQuery = strike.town + "," + strike.country;
      
      // Request Places photo_reference
      request (placesApiUrl + placesQuery + "&key=" + placesApiKey, function (err, rsp, results) {
        let searchResults = JSON.parse(results);
        
        if(searchResults.status === 'OK' && searchResults.results[0].photos) {
          let photoReference = searchResults.results[0].photos[0].photo_reference;

          let record = new Report ({
            number: strike.number,
            date: strike.date,
            country: strike.country,
            location: strike.location,
            town: strike.town,
            injuries: strike.injuries,
            deaths: strike.deaths,
            photo_reference: photoReference
          });
          
          record.save();
        }
      });
     });

    console.log("Records queried.");
  
    res.end()
  });
});

app.get('/records', function (req, res) {
  Report.findRandom(null, null, {limit:1}, function (err, data) { 
      res.end(JSON.stringify(data));
    });     
  //Report.remove({}, function() {res.end("All records deleted")});

});

app.get('/location', function (req, res) {
  let testQuery = "Makeen,Pakistan";
  let apiKey = "AIzaSyAWh923QwLcLQGjH1w4OYOG0_CX8jGHbmE";
  let searchURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + testQuery + "&key=" + apiKey;

  request(searchURL, function (err, resp, body) {
    res.end(body);
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

