var express = require('express');
var engine = require('ejs-locals')
var routes = require('./routes/routes.js');

var app = express();

app.engine('ejs', engine);

app.set('views', './views');
app.set('view engine', 'ejs');

routes(app);

var port = process.env.PORT || 5000;

app.listen(port);
