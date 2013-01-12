var httprequest = require("request");

module.exports = function(app) {
  
    app.all('/request', function(request, response) {
        httprequest(options(request), function(error, res, body){
            if (res.headers.link){
                var data = {};
                var links = res.headers.link.split(',');
                for (var i = 0; i < links.length; i++) {
                    var link = links[i].split(';');
                    link[0] = link[0].slice(link[0].indexOf('<') +1, link[0].lastIndexOf('>'));
                    link[1] = link[1].slice(link[1].indexOf('"') +1, link[1].lastIndexOf('"'));
                    data[link[1]] = link[0];
                }
                response.links(data);
            }
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
