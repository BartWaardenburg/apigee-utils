"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This will convert an object with key value pairs to a new object with key value pairs
 * @param  queryParams            An object containing key value pairs to be used as query parameters
 * @param  settings               Object containing the settings for creating the queryparams
 * @param  settings.renamer       The name of the keys to rename. In a format of oldname: newname
 * @param  settings.defaultValues The value to return when no value is found. The keys of the default values should be identical to the queryparam keys.
 * @param  settings.transformer   A transformer object contains functions which take a value and return a new value. The keys of the transformer should be identical to the queryparam keys.
 */
var createQueryParams = exports.createQueryParams = function createQueryParams(queryParams) {
	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
		renamer: {},
		defaultValues: {},
		transformer: {}
	},
	    _ref$renamer = _ref.renamer,
	    renamer = _ref$renamer === undefined ? {} : _ref$renamer,
	    _ref$defaultValues = _ref.defaultValues,
	    defaultValues = _ref$defaultValues === undefined ? {} : _ref$defaultValues,
	    _ref$transformer = _ref.transformer,
	    transformer = _ref$transformer === undefined ? {} : _ref$transformer;

	return Object.keys(queryParams).reduce(function (nextQueryParams, key) {
		return _extends({}, nextQueryParams, _defineProperty({}, renamer[key] || key, queryParams[key] !== undefined && queryParams[key] !== null ? transformer[key] ? transformer[key](queryParams[key]) : queryParams[key] : defaultValues[key]));
	}, defaultValues);
};

exports.default = createQueryParams;