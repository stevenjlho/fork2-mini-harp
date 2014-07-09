var fs = require('fs');
var less = require('less');
var path = require('path');

module.exports = makeLess;

function makeLess(root) {
	var generate = function(req,res,next) {
        var filePath = root + req.url;
        var extname = path.extname(req.url);

        if (extname === '.css') {
            var regex = /bar.css$/.test(filePath);
            if(regex) {
                fs.readFile(filePath, {encoding: 'utf8'}, function(err, data) {
                    if(!err) {
                        res.end(data);
                    }
                });
            } else {
                filePath = filePath.replace(/.css$/, '.less');
                renderLess(filePath, res, next);
            }
        } else if (extname === '.less') {
            renderLess(filePath, res, next);
        } else {
            next();
        }
	}
	return generate;
}

function renderLess(filePath, res, next) {
    fs.readFile(filePath, {encoding: 'utf8'}, function(err, data) {
        if(!err) {
            less.render(data, function(e, css) {
                res.end(css);
            })
        } else {
            next();
        }
    });
}

