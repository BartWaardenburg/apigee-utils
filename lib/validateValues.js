'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.validateValues = undefined;

var _setVariables = require('./setVariables');

var _setVariables2 = _interopRequireDefault(_setVariables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * This will validate a set of query parameters and will set a error variable in the apigee with an errorpayload variable which can be send down to the client
 * It is advised to set up a raise on error policy which will return the payload when the error variable == true
 * @param  values          The keys the values to get are stored with
 * @param  settings             Object containing the settings for getting the variables
 * @param  settings.validator   The validator is an object containing functions which take a value and tests whether the value matches to required format returning true for a valid parameter and false for invalid. Or it can return a custom error message as a string. It is also possible to return mutliple error messages as an array of strings. The keys of the validator should be identical to the queryparam keys.
 * @param  settings.prefix      The prefix to use for the variables which will be used to set the potential error messages
 * @return                      A boolean indicating whether the query param were valid or not
 */
var validateValues = exports.validateValues = function validateValues(values) {
	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
		validator: {},
		prefix: ''
	},
	    _ref$validator = _ref.validator,
	    validator = _ref$validator === undefined ? {} : _ref$validator,
	    _ref$prefix = _ref.prefix,
	    prefix = _ref$prefix === undefined ? '' : _ref$prefix;

	var error = {
		error: false,
		payload: {
			errors: []
		}
	};

	Object.keys(values).forEach(function (key) {
		if (validator[key]) {
			var validatorResponse = validator[key](values[key]);
			var invalidResponse = validatorResponse === false || typeof validatorResponse === 'string' && validatorResponse !== '' || Array.isArray(validatorResponse) && !!validatorResponse.length;

			if (invalidResponse) {
				var errorMessage = typeof validatorResponse === 'boolean' ? '' : validatorResponse;

				error.payload.errors = !Array.isArray(errorMessage) ? [].concat(_toConsumableArray(error.payload.errors), [createErrorObject(key, values[key], errorMessage)]) : [].concat(_toConsumableArray(error.payload.errors), _toConsumableArray(errorMessage.map(function (singleErrorMessage) {
					return createErrorObject(key, values[key], singleErrorMessage);
				})));
			}
		}
	});

	if (error.payload.errors.length) {
		error.error = true;
		error.payload = {
			title: 'Invalid parameter',
			message: 'One or more parameters are invalid',
			statusCode: 400,
			errors: error.payload.errors
		};
	}

	(0, _setVariables2.default)({
		error: error.error,
		errorpayload: JSON.stringify(error.payload)
	}, {
		prefix: prefix
	});

	return !error.error;
};

/**
 * This will create the default error message
 * @param  key      The key of the query parameter
 * @param  value    The value of the query parameter
 * @param  message  The custom message to use
 * @return          A default error object
 */
var createErrorObject = function createErrorObject(key, value, message) {
	return {
		title: 'Invalid ' + key + ' query parameter',
		message: message === '' ? 'Invalid ' + key + ' parameter. You passed "' + value + '".' : message,
		source: key
	};
};

exports.default = validateValues;