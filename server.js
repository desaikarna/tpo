var node_static = require('node-static');
var cache = 3600;
if (!process.env.NODE_ENV){
    cache = 'no-cache, must-revalidate';
}
var fileServer = new node_static.Server('./root', {cache:cache, serverInfo:'server.thirdplanetout.com'});
var errorMode = false;
var errorHandler = function (request, response) {
    response.writeHead(302, {'Location': 'http://error.thirdplanetout.com'});
    response.end();   
};

require('http').createServer(function (request, response) {
    if (errorMode) {
        errorHandler(request, response);    
    } else {
        request.addListener('end', function () {
            fileServer.serve(request, response, function (error, result) {
                if (error){
                    console.error("WARN: url=" + request.url + " status=" + error.status + " message=" + error.message);
                    if (error.status === 404) {
                        fileServer.serveFile('/not-found.html', 404, {}, request, response);
                    } else {
                        errorMode = true;
                        errorHandler(request, response);
                    }
                }
            });
        });
    }
}).listen(process.env.PORT);