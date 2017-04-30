var express = require('express');
var bodyParser = require('body-parser'); 
var items = require('../database');
var request = require('request');
var Report = require('../database');
var moment = require('moment');

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
        console.log('error', err);
        
        let searchResults = JSON.parse(results);
        
        if(searchResults.status === 'OK' && searchResults.results[0].photos) {
          let photoReference = searchResults.results[0].photos[0].photo_reference;

          let record = new Report ({
            date: moment(strike.date).format('dddd, MMMM Do, YYYY'),
            country: strike.country,
            location: strike.location,
            town: strike.town,
            deaths: strike.deaths,
            photo_reference: photoReference
          });
          console.log('record:', record)
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

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

