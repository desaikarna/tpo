var httprequest = require("request");

module.exports = function(app) {
  
    app.all('/request', function(request, response) {
        httprequest(options(request), function(error, res, body){
            if (!error && res.statusCode < 300){
                response.send(body);
            }
        });
    });
    
//    app.post('/request', function(request, response) {
//        httprequest.post(options(request), function(error, res, body){
//            if (!error && res.statusCode < 300){
//                response.send(body);
//            }
//        });
//    });
//    
//    app.put('/request', function(request, response) {
//        httprequest.put(options(request), function(error, res, body){
//            if (!error && res.statusCode < 300){
//                response.send(body);
//            }
//        });
//    });
//    
//    app.dele('/request', function(request, response) {
//        console.log("POST");
//        httprequest.post(options(request), function(error, res, body){
//            if (!error && res.statusCode < 300){
//                response.send(body);
//            }
//        });
//    });
//    
    
    
    function options (request) {
        var opts = {
            
            "method": request.method,
            "headers": {
                "Accept": request.headers.accept,
                "dev-key": "1234"
            },
            "url": request.headers.uri,
        };
        if (Object.keys(request.query).length) {
            opts.qs = request.query;
        }
        if (Object.keys(request.body).length) {
            opts.body = JSON.stringify(request.body);
        }
        console.log(opts);
        return opts;
    }
    
};