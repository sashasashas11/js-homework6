/**
 * Created by sasha on 15.11.13.
 */
;!function(){

}();




var obj = {
	field: 1,
	test: ifThisChanged('field', function(name){ console.log(name) })
};

obj.test('first'); // first
obj.test('second');
obj.test('third');

obj.field = 2;

obj.test('fourth'); // fourth
