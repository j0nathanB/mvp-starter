var express = require('express');
var bodyParser = require('body-parser'); 
var items = require('../database');
var request = require('request');
var Report = require('../database');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/items', function (req, res) {

  // Request JSON feed
  let url = 'http://api.dronestre.am/data'; 
  let rawData; 
  let strikes;

  request(url, function (err, resp, body) { 

    rawData = JSON.parse(body);
    strikes = rawData.strike;
    
    strikes.forEach( strike => {
      let record = new Report ({
        number: strike.number,
        country: strike.country,
        location: strike.location,
        town: strike.town,
        injuries: strike.injuries,
        deaths: strike.deaths,
        lat: strike.lat,
        lon: strike.lon,
        bureau_id: strike.bureau_id
      });
      record.save();
     } 
    );

    console.log("Records saved.");
    res.end()
  });
});

app.get('/records', function (req, res) {
  Report.find().distinct('town', function (err, data) {
    if (err) {
        return "ERROR";
      return;
    } else {
      res.writeHead(200);
      res.end(JSON.stringify(data));
    } 
  });
});

app.get('/location', function (req, res) {
  let testQuery = "Makeen,Pakistan";
  let apiKey = "AIzaSyAWh923QwLcLQGjH1w4OYOG0_CX8jGHbmE";
  let searchURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + testQuery + "&key=" +apiKey;

  request(searchURL, function (err, resp, body) {
    res.end(body);
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

