var express = require('express');
var routes = require('./routes.js');

var app = express();

routes(app);

var port = process.env.PORT || 5000;
app.listen(port);