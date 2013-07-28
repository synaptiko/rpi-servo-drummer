#!/usr/bin/env node
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var query = require('querystring');
var servoDrummer = require('./servo-drummer');

var app = http.createServer(function(request, response) {
	var parsedUrl = url.parse(request.url);

	if (parsedUrl.pathname === '/') {
		static('index.html')(request, response);
	}
	else if (parsedUrl.pathname === '/snare.wav') {
		static('snare.wav')(request, response);
	}
	else if (parsedUrl.pathname === '/hi-hat.wav') {
		static('hi-hat.wav')(request, response);
	}
	else if (parsedUrl.pathname === '/style.css') {
		static('style.css')(request, response);
	}
	else if (parsedUrl.pathname === '/beat') {
		var body = '';
		request.on('data', function (data) {
			body += data;
		});
		request.on('end', function () {
			var json = JSON.parse(body);
			servoDrummer.play(json);
			response.writeHead(200);
			response.end();
		});
	}
	else if (parsedUrl.pathname === '/end') {
		response.writeHead(200);
		response.end();
		process.nextTick(function() {
			process.exit();
		});
	}
	else {
		response.writeHead(404);
		response.end();
	}
});

function static(fileName) {
	return function(request, response) {
		response.writeHead(200);
		fs.readFile(path.join(__dirname, fileName), function(error, buffer) {
			response.write(buffer);
			response.end();
		});
	}
}

servoDrummer.init();
app.listen(8080);
