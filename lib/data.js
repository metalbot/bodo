var mongo = require('mongodb'),
    ObjectID = require('mongodb').ObjectID;

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOLAB_URL || 'mongodb://localhost/mydb';

exports.saveCard = function saveCard(card,callback) {
	mongo.Db.connect(mongoUri, function(err, db){
		if(err) return callback(err);

		db.collection('cards', function(err, collection) {
			if(err) return callback(err);

			collection.save(card, function(err, newCard) {
				if(err) {
					return callback(err);
				} else {
					return callback(newCard);
				}
			}); });
	});
}
			
exports.getCards = function getCards(callback) {
  mongo.Db.connect(mongoUri, function(err, db){
    if(err) return callback(err);

    db.collection('cards', function(err, collection){
      if(err) return callback(err);
      collection.find().toArray(callback);
    });
  });
}

exports.getBoards = function getBoards(callback) {
  mongo.Db.connect(mongoUri, function(err, db){
    if(err) return callback(err);

    db.collection('boards', function(err, collection){
      if(err) return callback(err);
      collection.find().toArray(callback);
    });
  });
}

exports.getCard = function getCard(id, callback){
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
