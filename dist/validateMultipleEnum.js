'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


/**
 * This will do a simple check if the passed string of values contains one or more valid values
 * @param settings             An object containing the options for validation
 * @param settings.name        The name of the variable to check
 * @param settings.values      The values of the variable to check (must be a string seperated by commas)
 * @param settings.required    Whether it's required (allow undefined values or not)
 * @param settings.validValues The possible values
 * @return                     A default error message or an empty string
 */
var validateMultipleEnum = exports.validateMultipleEnum = function validateMultipleEnum(_ref) {
	var name = _ref.name,
	    values = _ref.values,
	    required = _ref.required,
	    validValues = _ref.validValues;
	return required && values === undefined || values !== undefined && !values.split(',').every(function (value) {
		return validValues.indexOf(value) !== -1;
	}) ? 'Valid ' + name + ' parameters are ' + validValues.join(', ') + ' seperated by just a ,. You passed ' + values + '.' : '';
};

exports.default = validateMultipleEnum;