var express = require('express'),
    mongo = require('mongodb'),
    ObjectID = require('mongodb').ObjectID;

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

function getCard(id, callback){
  mongo.Db.connect(mongoUri, function(err, db){
    if(err) return callback(err);

    db.collection('cards', function(err, collection){
      if(err) return callback(err);
      collection.findOne({_id:new ObjectID(id)},function(err, card){
        if(err){
          return callback(err);
        } else{
          return callback(card);
        }
    });
  });
});
}

//API

app.get('/v0/cards', function(req, res){
  getCards(function(err, cards){
    if(!err){
      res.send(cards);
    } else{
      res.send(404, 'No cards found');
    }
  });
});

app.get('/v0/cards/:id', function(req, res){
  getCard(req.params.id, function(err, card){
    if(!err){
      res.send(card);
    } else{
      res.send(404, 'Card not found');
    }
  })
});

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

