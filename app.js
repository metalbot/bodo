var express = require('express');
var app = express();

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/bootstrap/css'));
app.use(express.static(__dirname + '/bootstrap/img'));
app.use(express.static(__dirname + '/bootstrap/js'));


app.listen(3000);