var connect = require('connect');
var serveStatic = require('serve-static');
var makeJade = require('../lib/processor/jade.js')
var makeLess = require('../lib/processor/less.js')

module.exports = function(path) {
	// create a connect app
	var app = connect();
	app.use(function(request,response,next) {
		if(request.url === '/current-time') {
			// 如果没有newline,zsh默认会显示%
			response.end((new Date()).toISOString() + '\n')
		} else {
			next();
		}
	})
	.use(makeJade(path))
	.use(makeLess(path))
	.use(serveStatic(path))
	return app;
}