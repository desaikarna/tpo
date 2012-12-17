var httprequest = require("request");

module.exports = function(app) {
  
    app.all('/request', function(request, response) {
        httprequest(options(request), function(error, res, body){
            response.json(res.statusCode, body);
        });
    });
    
    function options (request) {
//        var url = "http://api.thirdplanetout.com";
        var url = "http://tpo-api.r-brian-amesbury.c9.io";
        var opts = {
            "method": request.method,
            "headers": {
                "Accept": request.headers.accept,
                "devkey": "1234"
            },
            "url": url + request.headers.resource,
        };
        if (Object.keys(request.query).length) {
            opts.qs = request.query;
        }
        if (Object.keys(request.body).length) {
            opts.json = request.body;
        }
        return opts;
    }
};