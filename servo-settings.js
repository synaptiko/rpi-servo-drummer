var servoInitialValue = 0;

module.exports = {
	drum: {
		servo_rest: servoInitialValue,
		servo_beat: 10
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
