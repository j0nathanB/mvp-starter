var mongoose = require('mongoose');
var random = require('mongoose-random');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var reportSchema = mongoose.Schema({
  date: String,
  country: String,
  location: String,
  town: {type: String, unique: true, dropDups: true}, 
  injuries: String,
  deaths: String,
  photo_reference: String
});

reportSchema.plugin(random, { path: 'r' }); // by default `path` is `random`. It's used internally to store a random value on each doc. 

var Report = mongoose.model('Report', reportSchema);

module.exports = Report;