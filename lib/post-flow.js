'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This will log a message to the syslog variable
 */
var logMessage = exports.logMessage = function logMessage() {
  var apigeeVariables = ['client.port', 'client.received.start.time', 'client.received.start.timestamp', 'message.path', 'message.querystring', 'message.uri', 'message.verb', 'message.version', 'message.reason.phrase', 'message.status.code', 'proxy.basepath', 'proxy.client.ip', 'proxy.pathsuffix', 'proxy.url', 'request.path', 'request.querystring', 'request.uri', 'request.url', 'request.verb', 'request.version', 'servicecallout.requesturi', 'target.basepath', 'target.copy.pathsuffix', 'target.copy.queryparams', 'target.name', 'response.reason.phrase', 'response.status.code', 'target.received.end.time', 'target.received.end.timestamp', 'target.received.start.time', 'target.received.start.timestamp', 'target.host', 'target.ip', 'target.port', 'target.scheme', 'error.content', 'error.message', 'error.state', 'log.message', 'application.basepath', 'proxy.name', 'proxy.basepath', 'proxy.pathsuffix', 'target.basepath', 'target.url', 'organization.name', 'apiproxy.name', 'apiproxy.revision', 'environment.name', 'messageid'];
  var syslogMessage = apigeeVariables.reduce(function (message, key) {
    return _extends({}, message, _defineProperty({}, key, context.getVariable(key)));
  }, {});

  context.setVariable('log.syslog.message', JSON.stringify(syslogMessage));
};

/**
 * This will get the response from the proxy
 * @param  settings                   Object containing the settings for getting the response from the proxy
 * @param  settings.characterEncoding Optionally convert the response to UTF-8
 * @return                            The response from the targetted API
 */
// $FlowBug: Flow doesn't support default function parameter in combination with destructering
var getProxyResponse = exports.getProxyResponse = function getProxyResponse() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? { characterEncoding: '' } : arguments[0];

  var _ref$characterEncodin = _ref.characterEncoding;
  var characterEncoding = _ref$characterEncodin === undefined ? '' : _ref$characterEncodin;

  var proxyResponse = characterEncoding === 'UTF-8' ? unescape(encodeURIComponent(context.proxyResponse.content)) : context.proxyResponse.content;

  return JSON.parse(proxyResponse);
};
// {characterEncoding?: string}

/**
 * This will set the response to the provided content
 * @param  content              The response to set for the proxy
 * @param  settings             Object containing the settings for setting the response
 * @param  settings.contentType An optional contenttype header to set for the response
 */
// $FlowBug: Flow doesn't support default function parameter in combination with destructering
var setResponse = exports.setResponse = function setResponse(content) {
  var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? { contentType: undefined } : arguments[1];

  var _ref2$contentType = _ref2.contentType;
  var contentType = _ref2$contentType === undefined ? undefined : _ref2$contentType;

  context.proxyResponse.content = JSON.stringify(content);

  if (contentType) {
    context.setVariable('response.header.content-type', contentType);
  }
};
// {contentType: string}

/**
 * This will get a value from the Apigee flow
 * @param  key                    The key the value to get is stored with
 * @param  settings               Object containing the settings for getting the variable
 * @param  settings.prefix        A prefix which is used to store the value with
 * @param  settings.defaultValue  The value to return when no value is found
 * @param  settings.parser        The parser is a function which takes a value and transforms it to return something else
 * @return                        The value parsed from the apigee flow
 */
// $FlowBug: Flow doesn't support default function parameter in combination with destructering
var getVariable = exports.getVariable = function getVariable(key) {
  var _ref3 = arguments.length <= 1 || arguments[1] === undefined ? {
    prefix: '',
    defaultValue: undefined,
    parser: undefined
  } : arguments[1];

  var _ref3$prefix = _ref3.prefix;
  var prefix = _ref3$prefix === undefined ? '' : _ref3$prefix;
  var defaultValue = _ref3.defaultValue;
  var parser = _ref3.parser;

  var rawVariable = context.getVariable(prefix + key);
  var variable = void 0;

  if (variable !== null) {
    variable = parser ? parser(rawVariable) : rawVariable;
  } else if (defaultValue) {
    variable = defaultValue;
  }

  return variable;
};
// prefix?: string,
// defaultValue?: any,
// parser?: Function,

/**
 * This will get a set of values from the Apigee flow
 * @param  keys                   The keys the values to get are stored with
 * @param  settings               Object containing the settings for getting the variables
 * @param  settings.prefix        A prefix which is used to store the value with
 * @param  settings.defaultValues The value to return when no value is found. The keys of the default values should be identical to the variable keys.
 * @param  settings.parser        The parser is an object containing functions which take a value and transforms it to return something else. The keys of the parser should be identical to the variable keys.
 * @return                        The values parsed from the apigee flow
 */
// $FlowBug: Flow doesn't support default function parameter in combination with destructering
var getVariables = exports.getVariables = function getVariables(keys) {
  var _ref4 = arguments.length <= 1 || arguments[1] === undefined ? {
    prefix: '',
    defaultValues: {},
    parser: {}
  } : arguments[1];

  var _ref4$prefix = _ref4.prefix;
  var prefix = _ref4$prefix === undefined ? '' : _ref4$prefix;
  var _ref4$defaultValues = _ref4.defaultValues;
  var defaultValues = _ref4$defaultValues === undefined ? {} : _ref4$defaultValues;
  var _ref4$parser = _ref4.parser;
  var parser = _ref4$parser === undefined ? {} : _ref4$parser;
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
// prefix?: string,
// defaultValues: {[key: string]: any},
// parser?: {[key: string]: (value: any) => any},