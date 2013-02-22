var express = require('express');
var app = express();
var fs = require('fs');

var file = fs.readFileSync('./root/not-found.html');

app.use(express.static('root'));
app.use(express.bodyParser());
app.use(express.cookieParser());

app.get('/heartbeat', function(reqquest, response){
	response.json(200, {});
});

require('./request/request.js')(app);

app.get('*', function(request, response){
    response.writeHeader(404, {"Content-Type": "text/html"});  
    response.write(file);  
    response.end();
});

app.listen(process.env.PORT);
