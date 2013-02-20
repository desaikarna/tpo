var production = 'production';
var test = 'test';
var development = 'development';

module.exports = function () {
	if (process.env.NODE_ENV == development) {
		console.log(development);
		return {
			// The Environment
			environment:development,
			development:development,
			context:"http://localhost:5000",
			// Turn debugging on or off
			debug:true,
			// DEV_KEY
			devkey:process.env.DEV_KEY
		};
	} else if (process.env.NODE_ENV == test) {
		return {
			// The Environment
			environment:test,
			test:test,
			context:undefined,
			// Turn debugging on or off
			debug:false,
			// DEV_KEY
			devkey:process.env.DEV_KEY
		};
	} else if (process.env.NODE_ENV == production) {
		return {
			// The Environment
			environment:production,
			production:production,
			context:"http://api.thirdplanetout.com",
			// Turn debugging on or off
			debug:false,
			// DEV_KEY
			devkey:process.env.DEV_KEY
		};
	} else {
		return {
			// Return nothing if the environment is not set
			// The Environment
			environment:undefined,
			production:undefined,
			context:undefined,
			// Turn debugging on or off
			debug:undefined,
			// DEV_KEY
			devkey:undefined
		};
	}
}();
