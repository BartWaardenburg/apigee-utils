'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


/**
 * This will get a queryParam from the passed url string
 * @param  queryParamKey  The key for the queryParam
 * @param  defaultValue   The default value to return when nothing is available
 * @return                The value of the queryParam
 */
var getQueryParam = exports.getQueryParam = function getQueryParam(queryParamKey, defaultValue) {
  var queryParam = context.getVariable('request.queryparam.' + queryParamKey);

  return queryParam === undefined || queryParam === null ? defaultValue : queryParam;
};

exports.default = getQueryParam;