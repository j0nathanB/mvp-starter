var express = require('express');
var bodyParser = require('body-parser'); 
var items = require('../database');
var request = require('request');
var Report = require('../database');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/items', function (req, res) {

  // Request JSON feed
  var url = 'http://api.dronestre.am/data'; 
  var rawData; 
  var strikes;

  request(url, function (err, resp, body) { 
    //console.log('error:', err); // Print the error if one occurred 
    //console.log('statusCode:', resp && resp.statusCode); // Print the response status code if a response was received 
    //console.log('body:', typeof JSON.parse(body)); 
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

    console.log("Records saved!");

  });

  // items.selectAll(function(err, data) {
  //   if(err) {
  //     res.sendStatus(500);
  //   } else {
  //     res.json(data);
  //     res.end();
  //   }
  // });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

