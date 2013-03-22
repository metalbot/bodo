var express = require('express');
var app = express();

app.use(express.static(__dirname));
//app.use(express.static(__dirname + '/externs/jquery'))
//app.use(express.static(__dirname + '/externs/bootstrap/css'));
//app.use(express.static(__dirname + '/externs/bootstrap/img'));
//app.use(express.static(__dirname + '/externs/bootstrap/js'));

//Heroku
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

