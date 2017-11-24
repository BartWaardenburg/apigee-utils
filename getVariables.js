'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


/**
 * This will get a set of values from the Apigee flow
 * @param  keys                   The keys the values to get are stored with
 * @param  settings               Object containing the settings for getting the variables
 * @param  settings.prefix        A prefix which is used to store the value with
 * @param  settings.defaultValues The value to return when no value is found. The keys of the default values should be identical to the variable keys.
 * @param  settings.parser        The parser is an object containing functions which take a value and transforms it to return something else. The keys of the parser should be identical to the variable keys.
 * @return                        The values parsed from the apigee flow
 */
var getVariables = exports.getVariables = function getVariables(keys) {
	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
		prefix: '',
		defaultValues: {},
		parser: {}
	},
	    _ref$prefix = _ref.prefix,
	    prefix = _ref$prefix === undefined ? '' : _ref$prefix,
	    _ref$defaultValues = _ref.defaultValues,
	    defaultValues = _ref$defaultValues === undefined ? {} : _ref$defaultValues,
	    _ref$parser = _ref.parser,
	    parser = _ref$parser === undefined ? {} : _ref$parser;

	return keys.reduce(function (variables, key) {
		var variable = context.getVariable(prefix + key);

		if (variable !== null) {
			variables[key] = parser[key] ? parser[key](variable) : variable;
		} else if (defaultValues[key]) {
			variables[key] = defaultValues[key];
		}

		return variables;
	}, {});
};

exports.default = getVariables;