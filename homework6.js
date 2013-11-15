/**
 * Created by sasha on 15.11.13.
 */
;
!function(){

	window.ifThisChanged = function(fieldName, originalFunction) {

		var field,
				newThis,
				newArguments;

		return function() {
			newThis = this;
			newArguments = arguments;
			if (field == this[fieldName]) return;
			field = this[fieldName];
			return originalFunction.call(newThis, arguments);
		};
	}

	window.limited = function limited(time, originalFunction) {

		if (typeof time === 'function') {
			originalFunction = time;
			time = 20;
		}
		var isTimerRunning = false,
				newThis,
				newArguments;

		return function() {
			newThis = this;
			newArguments = arguments;

			if (isTimerRunning) return;

			isTimerRunning = true;
			setTimeout(function() {
						isTimerRunning = false;
						return originalFunction.apply(newThis, newArguments);
					},
					time
			);
		};
	}
}();


var obj = {
	field: 1,
	test: ifThisChanged('field', function(name) {
		console.log(name)
	})
};

obj.test('first'); // first
obj.test('second');
obj.test('third');

obj.field = 2;

obj.test('fourth'); // fourth

document
		.getElementById('test')
		.addEventListener('keyup', ifThisChanged('value', limited(500, function() {
			console.log(this.value);
		})));