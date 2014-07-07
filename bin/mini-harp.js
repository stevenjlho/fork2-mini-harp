#!/usr/bin/env node

var createMiniHarp = require("../index.js")
	  , app = createMiniHarp();

console.log("Starting mini-harp on http://localhost:4000");
	app.listen(4000);