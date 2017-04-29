var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var reportSchema = mongoose.Schema({
  number: Number,
  country: String,
  location: String,
  town: String,
  injuries: String,
  deaths: String,
  lat: String,
  lon: String,
  bureau_id: String
});

var Report = mongoose.model('Report', reportSchema);

module.exports = Report;