'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


/**
 * This will get a value from the Apigee flow
 * @param  key                    The key the value to get is stored with
 * @param  settings               Object containing the settings for getting the variable
 * @param  settings.prefix        A prefix which is used to store the value with
 * @param  settings.defaultValue  The value to return when no value is found
 * @param  settings.parser        The parser is a function which takes a value and transforms it to return something else
 * @return                        The value parsed from the apigee flow
 */
var getVariable = exports.getVariable = function getVariable(key) {
	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
		prefix: '',
		defaultValue: undefined,
		parser: undefined
	},
	    _ref$prefix = _ref.prefix,
	    prefix = _ref$prefix === undefined ? '' : _ref$prefix,
	    defaultValue = _ref.defaultValue,
	    parser = _ref.parser;

	var rawVariable = context.getVariable(prefix + key);
	var variable = void 0;

	if (variable !== null) {
		variable = parser ? parser(rawVariable) : rawVariable;
	} else if (defaultValue) {
		variable = defaultValue;
	}

	return variable;
};

exports.default = getVariable;