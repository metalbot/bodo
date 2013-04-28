var data = require('../lib/data');

exports.getCards = function(req, res){
  data.getCards(function(err, cards){
    if(!err){
      res.send(cards);
    } else{
      res.send(404, 'No cards found');
    }
  });
};

exports.getCardById = function(req, res){
  data.getCard(req.params.id, function(err, card){
    if(!err){
      res.send(card);
    } else{
      res.send(404, err);
    }
  })
};

exports.saveCard = function(req, res){
	console.log(req.body);
	data.saveCard(req.body, function(err, card) {
		if(!err) {
			console.log(card);
			res.send(card);
		} else {
			console.log(err);
			res.send(500, err);
		}
	});
};


