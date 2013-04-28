var express = require('express'),
	routes = require('./routes'),
	api = require('./routes/api');

var app = module.exports = express();

// Configuration

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/public'));
	app.use(express.static(__dirname + '/components'));
	app.use(app.router);
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/v0/cards', api.getCards);
app.get('v0/cards/:id', api.getCardById);
app.post('v0/cards', api.saveCard);

//Heroku
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
