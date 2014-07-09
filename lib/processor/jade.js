var fs = require('fs');
var jade = require('jade');
var path = require('path');

module.exports = makeJade;

function makeJade(root) {
	var generate = function(req,res,next) {
        var filePath = root + req.url;
        var extname = path.extname(req.url);

        if (extname === '.html') {
            var regex = /bar.html$/.test(filePath);
            if(regex) {
                fs.readFile(filePath, {encoding: 'utf8'}, function(err, data) {
                    if(!err) {
                        res.end(data);
                    }
                });
            } else {
                filePath = filePath.replace(/.html$/, '.jade');
                renderJade(filePath, res, next);
            }
        } else if (extname === '.jade') {
            renderJade(filePath, res, next);
        } else {
            next();
        }
	}
	return generate;
}

function renderJade(filePath, res, next) {
    fs.readFile(filePath, {encoding: 'utf8'}, function(err, data) {
        if(!err) {
            var html = jade.render(data);
            res.end(html);
        } else {
            next();
        }
    });
}

