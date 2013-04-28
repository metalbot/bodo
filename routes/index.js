var data = require('../lib/data');

exports.index = function(req, res) {
	data.getBoards(function(err, boards){
		data.getCards(function(err, cards){
			res.render('index', {boards: boards, cards: cards});
		});
	});
};

exports.partials = function(req, res) {
	var name = req.params.name;
	res.render('partials/' + name);
};
