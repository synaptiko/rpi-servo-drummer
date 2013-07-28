var fs = require('fs');
var path = require('path');
var basePath = (process.env.TEST ? path.join(__dirname, 'test-pwm0') : '/sys/class/rpi-pwm/pwm0/');
var settings = require('./servo-settings');

function set(name, value) {
	value = value + '';
	fs.writeFileSync(path.join(basePath, name), value, { encoding: 'ascii' });
}

function init() {
	var system = settings.system;

	Object.keys(system).forEach(function(name) {
		set(name, system[name]);
	});
}

function play(data) {
	var eighthNoteTime = (60 / data.tempo) / 2;
	var ticks = data.ticks;
	var i, time;

	for (i = 0; i < ticks.length * data.repeat; i++) {
		time = i * eighthNoteTime;
		if (ticks[i % ticks.length]) {
			setTimeout(tick, time * 1000);
		}
	}
}

function tick() {
	var drum = settings.drum;

	console.log('tick');
	// TODO
	// 1. create fd for 'servo' file
	// 2. try if \n is working as separator of values
	// 3. if so, use one stream for whole play method
	// 4. close it after last tick
}

module.exports = {
	init: init,
	play: play
};
