var express = require('express');
var app = express();

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/bootstrap/css'));
app.use(express.static(__dirname + '/bootstrap/img'));
app.use(express.static(__dirname + '/bootstrap/js'));


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});