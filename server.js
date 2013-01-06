var node_static = require('node-static');
var fileServer = new node_static.Server('./views', {cache:0, serverInfo:'server.thirdplanetout.com'});

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response, function (error, res) {
            if (error && (error.status === 404)) {
                fileServer.serveFile('/not-found.html', 404, {}, request, response);
            }
        });
    });
}).listen(process.env.PORT);