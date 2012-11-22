var express = require('express');
var engine = require('ejs-locals')
var routes = require(__dirname +'/routes/routes.js');

var app = express();

app.engine('ejs', engine);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use("/styles", express.static(__dirname + '/assets/stylesheets'));
app.use("/js", express.static(__dirname + '/assets/javascript'));
app.use("/img", express.static(__dirname + '/assets/images'));

routes(app);

var port = process.env.PORT || 5000;

app.listen(port);
