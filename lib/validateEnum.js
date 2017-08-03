'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


/**
 * This will do a simple check if the passed value is one of the valid values
 * @param settings             An object containing the options for validation
 * @param settings.name        The name of the variable to check
 * @param settings.value       The value of the variable to check
 * @param settings.validValues The possible values
 * @param settings.required    Whether it's required (allow undefined values or not)
 * @return                     A default error message or an empty string
 */
var validateEnum = exports.validateEnum = function validateEnum(_ref) {
	var name = _ref.name,
	    value = _ref.value,
	    required = _ref.required,
	    validValues = _ref.validValues;
	return required && value === undefined || value !== undefined && !(validValues.indexOf(value) !== -1) ? 'Valid ' + name + ' parameters are ' + validValues.join(', ') + '. You passed ' + value + '.' : '';
};

exports.default = validateEnum;