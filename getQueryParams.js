'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueryParams = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _getQueryParam = require('./getQueryParam');

var _getQueryParam2 = _interopRequireDefault(_getQueryParam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This will get a set of queryParams from the passed url string
 * @param  possibleQueryParams    An array containing possible queryparams
 * @param  settings               Object containing the settings for getting the queryparams
 * @param  settings.defaultValues The value to return when no value is found. The keys of the default values should be identical to the queryparam keys.
 * @return                        An object containing values for the passed in queryparams
 */
var getQueryParams = exports.getQueryParams = function getQueryParams(possibleQueryParams) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    defaultValues: {}
  },
      _ref$defaultValues = _ref.defaultValues,
      defaultValues = _ref$defaultValues === undefined ? {} : _ref$defaultValues;

  return possibleQueryParams.reduce(function (queryParams, possibleQueryKey) {
    return _extends({}, queryParams, _defineProperty({}, possibleQueryKey, (0, _getQueryParam2.default)(possibleQueryKey, defaultValues[possibleQueryKey])));
  }, defaultValues);
};

exports.default = getQueryParams;