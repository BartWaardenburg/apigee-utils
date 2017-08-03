"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


/**
 * This will set a query parameter to the provided value
 * @param  key   The key of the queryparam to set
 * @param  value The value to set the queryparam to
 */
var setQueryParam = exports.setQueryParam = function setQueryParam(key, value) {
  return context.setVariable("request.queryparam." + key, value);
};

exports.default = setQueryParam;