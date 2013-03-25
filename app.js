var express = require('express'),
    mongo = require('mongodb');

var app = express();

app.use(express.static(__dirname));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOLAB_URL || 'mongodb://localhost/mydb';

function getCards(callback) {
  mongo.Db.connect(mongoUri, function(err, db){
    if(err) return callback(err);

    db.collection('cards', function(err, collection){
      if(err) return callback(err);
      collection.find().toArray(callback);
    });
  });
}

app.get('/', function(req, res){
  getCards(function(err, cards){
    console.log(cards);
    res.render('index',cards[0]);
  });
});

//Heroku
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

