#!/usr/bin/env node
var miniHarp = require("../src/index.js");

var minimist = require('minimist');
var argv = minimist(process.argv.slice(2));


var port = argv.port || 4000;

console.log("Starting mini-harp on http://localhost:" + port);
var root = argv._[0] ?  argv._[0] : 'verify/assets';
var app = miniHarp(root);
	app.listen(port);