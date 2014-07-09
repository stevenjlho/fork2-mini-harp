var path = require('path');

module.exports = rejectRequest;

function rejectRequest(root) {
	var reject = function(req,res,next) {
		var extname = path.extname(req.url);
		if(extname === '.jade' || extname === '.less') {
			res.statusCode = 404;
		}
		next();
	};

	return reject;
}