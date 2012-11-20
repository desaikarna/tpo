var express = require('express');

var app = express();

app.get('/', function(request, response) {
    response.send('Hello Core!');
    response.r
});

var port = process.env.PORT || 5000;
app.listen(port);