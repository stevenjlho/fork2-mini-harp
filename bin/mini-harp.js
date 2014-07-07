#!/usr/bin/env node

var createMiniHarp = require("../index.js")
	  , app = createMiniHarp();

var minimist = require('minimist');
var argv = minimist(process.argv.slice(2));

var port = argv.port || 4000;
console.log(argv);
console.log("Starting mini-harp on http://localhost:" + port);
	app.listen(port);