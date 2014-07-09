var connect = require('connect');
var serveStatic = require('serve-static');
var makeJade = require('../lib/processor/jade.js')
var makeLess = require('../lib/processor/less.js')
var serverRoot = require('../lib/processor/root.js')
var rejectRequest = require('../lib/processor/reject.js')

module.exports = function(root) {
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
	.use(rejectRequest(root))
	.use(serverRoot(root))
	.use(makeJade(root))
	.use(makeLess(root))
	.use(serveStatic(root))
	return app;
}