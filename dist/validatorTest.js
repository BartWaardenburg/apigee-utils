"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});


/**
 * This will generate jest tests to validate of a certain function of a validator works as expected
 * @param  settings           The settings used to generate the tests
 * @param  settings.valid     An array of values which should validate succesfully
 * @param  settings.invalid   An array of values which should fail the validaton
 * @param  settings.name      The name of the function to test (as a key for the validator object)
 * @param  settings.validator The validator object with the validation functions as it's keys
 */
var validatorTest = exports.validatorTest = function validatorTest(_ref) {
	var valid = _ref.valid,
	    invalid = _ref.invalid,
	    name = _ref.name,
	    validator = _ref.validator;

	test("The " + name + " validation should work as expected", function () {
		valid.forEach(function (value) {
			var result = validator[name](value);

			Array.isArray(result) ? expect(result).toHaveLength(0) : expect(result).toBeFalsy();
		});
		invalid.forEach(function (value) {
			var result = validator[name](value);

			Array.isArray(result) ? expect(result.length).toBeGreaterThan(0) : expect(result).toBeTruthy();
		});
	});
};

exports.default = validatorTest;