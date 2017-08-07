"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
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