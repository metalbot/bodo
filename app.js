var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var card = {"story":"As a user, I want a basic card layout"},
           {"tags":["card","story","tag","poc","layout","tasks"]};

app.get('/', function(req, res){
  res.render('index',card);
});

//Heroku
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

