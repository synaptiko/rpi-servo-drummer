var fs = require('fs');
var path = require('path');
var basePath = (process.env.TEST ? path.join(__dirname, 'test-pwm0') : '/sys/class/rpi-pwm/pwm0/');
var settings = require('./servo-settings');
var servoStream;

function set(name, value) {
	value = value + '';
	fs.writeFileSync(path.join(basePath, name), value, { encoding: 'ascii' });
}

function init() {
	var system = settings.system;

	Object.keys(system).forEach(function(name) {
		if (name !== 'active') { // active has to be last
			set(name, system[name]);
		}
	});
	set('active', system['active']);
	servoStream = fs.createWriteStream(path.join(basePath, 'servo'));
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
	servoStream.write(settings.drum.servoBeat + '');
	setTimeout(function() {
		servoStream.write(settings.drum.servoBeat + '');
	}, settings.drum.restBeatDelay);
}

module.exports = {
	init: init,
	play: play
};
