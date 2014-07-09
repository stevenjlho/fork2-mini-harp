var fs = require('fs');
var path = require('path');

module.exports = serverRoot;

function serverRoot(root) {
	var generate = function(req,res,next) {
		if(req.url === '/'){
			req.url = "/index.html";
		}
		next();
	};

	return generate;
}