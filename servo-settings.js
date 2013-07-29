var servoInitialValue = 0;

module.exports = {
	drum: {
		servoRest: servoInitialValue,
		servoBeat: 10,
		restBeatDelay: 200
	},
	system: {
		active: 1,
		delayed: 0,
		mode: 'servo',
		frequency: 50,
		mcf: 16000,
		servo_max: 32,
		servo: servoInitialValue
	}
};
