'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setVariables = undefined;

var _setVariable = require('./setVariable');

var _setVariable2 = _interopRequireDefault(_setVariable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This will store a set of values in the Apigee flow
 * @param  variables              An object containing key value pairs to store
 * @param  settings               Object containing the settings for setting the variables
 * @param  settings.prefix        A prefix which is used to store the value with
 */
var setVariables = exports.setVariables = function setVariables(variables) {
	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
		prefix: ''
	},
	    _ref$prefix = _ref.prefix,
	    prefix = _ref$prefix === undefined ? '' : _ref$prefix;

	return Object.keys(variables).forEach(function (key) {
		if (variables[key] !== undefined && variables[key] !== null) {
			(0, _setVariable2.default)(key, variables[key], {
				prefix: prefix
			});
		}
	});
};
exports.default = setVariables;