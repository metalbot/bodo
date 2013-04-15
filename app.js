var express = require('express'),
    mongo = require('mongodb'),
    ObjectID = require('mongodb').ObjectID;

var app = express();
app.use(express.bodyParser());
app.use(express.static(__dirname));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOLAB_URL || 'mongodb://localhost/mydb';

function saveCard(card,callback) {
	mongo.Db.connect(mongoUri, function(err, db){
		if(err) return callback(err);

		db.collection('cards', function(err, collection) {
			if(err) return callback(err);

			collection.insert(card, function(err, newCard) {
				if(err) {
					return callback(err);
				} else {
					return callback(newCard);
				}
			});
		});
	});
}
			
function getCards(callback) {
  mongo.Db.connect(mongoUri, function(err, db){
    if(err) return callback(err);

    db.collection('cards', function(err, collection){
      if(err) return callback(err);
      collection.find().toArray(callback);
    });
  });
}

function getBoards(callback) {
  mongo.Db.connect(mongoUri, function(err, db){
    if(err) return callback(err);

    db.collection('boards', function(err, collection){
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
      collection.findOne({_id: ObjectID.createFromHexString(id)},function(err, card){
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
      res.send(404, err);
    }
  })
});

app.post('/v0/cards', function(req, res){
	console.log(req.body);
	saveCard(req.body, function(err, card) {
		if(!err) {
			console.log(card);
			res.send(card);
		} else {
			console.log(err);
			res.send(500, err);
		}
	});
});

app.get('/', function(req, res){
	getBoards(function(err, boards){
		getCards(function(err, cards){
			res.render('index',{board: boards[0], cards: cards});
		});
	});
});

//Heroku
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

