var httprequest = require("request");
var config = require('../config/config.js');

module.exports = function(app) {
	app.all('/request', function(request, response) {
		httprequest(options(request), function(error, res, body){
			if (error) {
                response.json(500, {error : 'Internal Server Error'});
			} else if (res.statusCode >= 300){
				response.json(res.statusCode, res.body);
            } else {
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
				for (var key in res.headers) {
					if(key == 'set-cookie') {
						var cookie = res.headers[key][0].split(';');
						var nameValue = cookie[0].split('=');
						response.cookie(nameValue[0], nameValue[1]);
					}
				}
				if (typeof body == 'string') {
					response.json(res.statusCode, JSON.parse(body));
				} else {
					response.json(res.statusCode, body);
				}
            }
        });
    });

    function options (request) {
		var opts = {
            "method": request.method,
            "headers": {
                "Accept": request.headers.accept,
                "devkey": config.devkey
            },
            "url": config.context + request.headers.resource
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
