var httprequest = require("request");

module.exports = function(app) {
  
    app.all('/request', function(request, response) {
        httprequest(options(request), function(error, res, body){
            if (!error && res.statusCode < 300){
                response.send(body);
            }
        });
    });
    
    function options (request) {
        var opts = {
            
            "method": request.method,
            "headers": {
                "Accept": request.headers.accept,
                "devkey": "1234"
            },
            "url": request.headers.uri,
        };
        if (Object.keys(request.query).length) {
            opts.qs = request.query;
        }
        if (Object.keys(request.body).length) {
            opts.json = request.body;
        }
        console.log(opts);
        return opts;
    }
    
};