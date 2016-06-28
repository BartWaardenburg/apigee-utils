'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

/**
 * This will get a set of queryParams from the passed url string
 * @param  possibleQueryParams    An array containing possible queryparams
 * @param  settings               Object containing the settings for getting the queryparams
 * @param  settings.defaultValues The value to return when no value is found. The keys of the default values should be identical to the queryparam keys.
 * @return                        An object containing values for the passed in queryparams
 */
// $FlowBug: Flow doesn't support default function parameter in combination with destructering
var getQueryParams = exports.getQueryParams = function getQueryParams(possibleQueryParams) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {
    defaultValues: {}
  } : arguments[1];

  var _ref$defaultValues = _ref.defaultValues;
  var defaultValues = _ref$defaultValues === undefined ? {} : _ref$defaultValues;
  return possibleQueryParams.reduce(function (queryParams, possibleQueryKey) {
    return _extends({}, queryParams, _defineProperty({}, possibleQueryKey, getQueryParam(possibleQueryKey, defaultValues[possibleQueryKey])));
  }, defaultValues);
};
// defaultValues: {[key: string]: string}

/**
 * This will convert an object with key value pairs to a new object with key value pairs
 * @param  queryParams            An object containing key value pairs to be used as query parameters
 * @param  settings               Object containing the settings for creating the queryparams
 * @param  settings.renamer       The name of the keys to rename. In a format of oldname: newname
 * @param  settings.defaultValues The value to return when no value is found. The keys of the default values should be identical to the queryparam keys.
 * @param  settings.transformer   A transformer object contains functions which take a value and return a new value. The keys of the transformer should be identical to the queryparam keys.
 */
// $FlowBug: Flow doesn't support default function parameter in combination with destructering
var createQueryParams = exports.createQueryParams = function createQueryParams(queryParams) {
  var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {
    renamer: {},
    defaultValues: {},
    transformer: {}
  } : arguments[1];

  var _ref2$renamer = _ref2.renamer;
  var renamer = _ref2$renamer === undefined ? {} : _ref2$renamer;
  var _ref2$defaultValues = _ref2.defaultValues;
  var defaultValues = _ref2$defaultValues === undefined ? {} : _ref2$defaultValues;
  var _ref2$transformer = _ref2.transformer;
  var transformer = _ref2$transformer === undefined ? {} : _ref2$transformer;
  return Object.keys(queryParams).reduce(function (nextQueryParams, key) {
    return _extends({}, nextQueryParams, _defineProperty({}, renamer[key] || key, queryParams[key] !== undefined && queryParams[key] !== null ? transformer[key] ? transformer[key](queryParams[key]) : queryParams[key] : defaultValues[key]));
  }, defaultValues);
};
//   renamer: {[key: string]: string},
//   defaultValues: {[key: string]: string},
//   transformer: {[key: string]: any},

/**
 * This will set a query parameter to the provided value
 * @param  key   The key of the queryparam to set
 * @param  value The value to set the queryparam to
 */
var setQueryParam = exports.setQueryParam = function setQueryParam(key, value) {
  return context.setVariable('request.queryparam.' + key, value);
};

/**
 * This will convert an object with key value pairs to query parameters
 * @param  queryParams   An object containing key value pairs to be used as query parameters
 */
var setQueryParams = exports.setQueryParams = function setQueryParams(queryParams) {
  return Object.keys(queryParams).forEach(function (key) {
    return setQueryParam(key, queryParams[key]);
  });
};

/**
 * This will validate a set of query parameters and will set a error variable in the apigee with an errorpayload variable which can be send down to the client
 * It is advised to set up a raise on error policy which will return the payload when the error variable == true
 * @param  queryParams          The keys the values to get are stored with
 * @param  settings             Object containing the settings for getting the variables
 * @param  settings.validator   The validator is an object containing functions which take a value and tests whether the value matches to required format returning true for a valid parameter and false for invalid. Or it can return a custom error message as a string. It is also possible to return mutliple error messages as an array of strings. The keys of the validator should be identical to the queryparam keys.
 * @return                      A boolean indicating whether the query param were valid or not
 */
// $FlowBug: Flow doesn't support default function parameter in combination with destructering
var validateQueryParams = exports.validateQueryParams = function validateQueryParams(queryParams) {
  var _ref3 = arguments.length <= 1 || arguments[1] === undefined ? {
    validator: {},
    prefix: ''
  } : arguments[1];

  var _ref3$validator = _ref3.validator;
  var validator = _ref3$validator === undefined ? {} : _ref3$validator;
  var _ref3$prefix = _ref3.prefix;
  var prefix = _ref3$prefix === undefined ? '' : _ref3$prefix;

  var error = {
    error: false,
    payload: {
      errors: []
    }
  };

  Object.keys(queryParams).forEach(function (key) {
    if (queryParams[key] !== undefined && queryParams[key] !== null && validator[key]) {
      var validatorResponse = validator[key](queryParams[key]);
      var invalidResponse = validatorResponse === false || typeof validatorResponse === 'string' && validatorResponse !== '' || Array.isArray(validatorResponse) && !!validatorResponse.length;

      if (invalidResponse) {
        var errorMessage = typeof validatorResponse === 'boolean' ? '' : validatorResponse;

        error.payload.errors = !Array.isArray(errorMessage) ? [].concat(_toConsumableArray(error.payload.errors), [createErrorObject(key, queryParams[key], errorMessage)]) : [].concat(_toConsumableArray(error.payload.errors), _toConsumableArray(errorMessage.map(function (singleErrorMessage) {
          return createErrorObject(key, queryParams[key], singleErrorMessage);
        })));
      }
    }
  });

  if (error.payload.errors.length) {
    error.error = true;
    error.payload = {
      title: 'Invalid query parameter',
      message: 'One or more query parameters are invalid',
      statusCode: 400,
      errors: error.payload.errors
    };
  }

  setVariables({
    error: error.error,
    errorpayload: JSON.stringify(error.payload)
  }, {
    prefix: prefix
  });

  return !error.error;
};
// validator?: {[key: string]: (value: string) => boolean | string | Array<string>},

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

/**
 * This will do a simple check if the passed string is a stringified boolean or not
 * @param name	The name of the variable to check
 * @param value	The value of the variable to check
 * @return      A default error message or an empty string
 */
var validateBoolean = exports.validateBoolean = function validateBoolean(name, value) {
  return value !== 'true' && value !== 'false' ? 'Valid ' + name + ' parameters are "true" and "false". You passed "' + value + '".' : '';
};

/**
 * This will do a simple check if the passed value is one of the valid values
 * @param name	      The name of the variable to check
 * @param value	      The value of the variable to check
 * @param validValues	The options for value
 * @return            A default error message or an empty string
 */
var validateEnum = exports.validateEnum = function validateEnum(name, value, validValues) {
  return validValues.indexOf(value) !== -1 ? 'Valid ' + name + ' parameters are ' + validValues.join(', ') + '. You passed "' + value + '".' : '';
};

/**
 * This will do a simple check if the passed string of values contains one or more valid values
 * @param name	      The name of the variable to check
 * @param values	    The values of the variable to check (must be a string seperated by commas)
 * @param validValues	The options for value
 * @return            A default error message or an empty string
 */
var validateMultipleEnum = exports.validateMultipleEnum = function validateMultipleEnum(name, values, validValues) {
  return !values.split(',').every(function (value) {
    return validValues.indexOf(value) !== -1;
  }) ? 'Valid ' + name + ' parameters are ' + validValues.join(', ') + ' seperated by just a ",". You passed "' + values + '".' : '';
};

/**
 * This will store a value in the Apigee flow
 * @param  key                    The key the value should be stored in
 * @param  value                  The value to store
 * @param  settings               Object containing the settings for setting the variable
 * @param  settings.prefix        A prefix which is used to store the value with
 */
// $FlowBug: Flow doesn't support default function parameter in combination with destructering
var setVariable = exports.setVariable = function setVariable(key, value) {
  var _ref4 = arguments.length <= 2 || arguments[2] === undefined ? {
    prefix: ''
  } : arguments[2];

  var _ref4$prefix = _ref4.prefix;
  var prefix = _ref4$prefix === undefined ? '' : _ref4$prefix;

  if (value !== undefined) {
    context.setVariable(prefix + key, value);
  }
};
// prefix?: string,

/**
 * This will store a set of values in the Apigee flow
 * @param  variables              An object containing key value pairs to store
 * @param  settings               Object containing the settings for setting the variables
 * @param  settings.prefix        A prefix which is used to store the value with
 */
// $FlowBug: Flow doesn't support default function parameter in combination with destructering
var setVariables = exports.setVariables = function setVariables(variables) {
  var _ref5 = arguments.length <= 1 || arguments[1] === undefined ? {
    prefix: ''
  } : arguments[1];

  var _ref5$prefix = _ref5.prefix;
  var prefix = _ref5$prefix === undefined ? '' : _ref5$prefix;
  return Object.keys(variables).forEach(function (key) {
    if (variables[key] !== undefined && variables[key] !== null) {
      setVariable(key, variables[key], {
        prefix: prefix
      });
    }
  });
};
// prefix?: string,