'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setQueryParams = undefined;

var _setQueryParam = require('./setQueryParam');

var _setQueryParam2 = _interopRequireDefault(_setQueryParam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This will convert an object with key value pairs to query parameters
 * @param  queryParams   An object containing key value pairs to be used as query parameters
 */
var setQueryParams = exports.setQueryParams = function setQueryParams(queryParams) {
  return Object.keys(queryParams).forEach(function (key) {
    return (0, _setQueryParam2.default)(key, queryParams[key]);
  });
};
exports.default = setQueryParams;