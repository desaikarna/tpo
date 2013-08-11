var express = require('express');
var app = express();
var fs = require('fs');
var mu2Express = require("mu2express");

var tpo_cdn = process.env.TPO_CDN;
var angular_cdn = process.env.ANGULAR_CDN;
var angular_ui_cdn = process.env.ANGULAR_UI_CDN;

var file = fs.readFileSync('./root/not-found.html');

app.use(function (request, response, next) {
    var HTTPStatus = { OK : { CODE : 200 } }
    if(request.headers["user-agent"] && (request.headers["user-agent"]).indexOf("Wgeet") === 0) {
        response.json(HTTPStatus.OK.CODE);
    } else {
        next();
    }
});
app.use(function (request, response, next) {
    var HTTPStatus = { OK : { CODE : 200 } }
    if(request.headers["user-agent"] && (request.headers["user-agent"]).indexOf("curl") === 0) {
        response.json(HTTPStatus.OK.CODE);
    } else {
        next();
    }
});
app.use(express.bodyParser());
app.use(express.cookieParser());

app.engine('mustache', mu2Express.engine);
app.set('view engine', 'mustache');
app.set('views', __dirname + '/root');
app.use(express.static('root'));

app.get('/heartbeat', function(request, response){
	response.json(200, {});
});

app.get('/', function(req, res) {
    res.render('index', {
        'locals' : {
            'tpo_cdn' : tpo_cdn,
            'angular_cdn' : angular_cdn,
            'angular_ui_cdn' : angular_ui_cdn
        }
    });
});

require('./request/request.js')(app);

app.get('*', function(request, response){
    response.writeHeader(404, {"Content-Type": "text/html"});  
    response.write(file);  
    response.end();
});

app.listen(process.env.PORT, function(){
    console.log("listening on " + process.env.PORT)
});
