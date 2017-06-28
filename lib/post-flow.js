'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * This will log a message to the syslog variable
 * @param additionalLogvalues Object containing additional key values to be logged
 */
var logMessage = exports.logMessage = function logMessage(additionalLogvalues) {
	var apigeeVariables = ['apiproxy.name', 'apiproxy.revision', 'client.received.start.time', 'client.received.start.timestamp', 'environment.name', 'error.content', 'error.message', 'error.state', 'log.message', 'message.reason.phrase', 'message.status.code', 'messageid', 'proxy.client.ip', 'proxy.url', 'request.url', 'response.reason.phrase', 'response.status.code', 'servicecallout.requesturi', 'target.ip', 'target.name', 'target.received.end.time', 'target.received.end.timestamp', 'target.received.start.time', 'target.received.start.timestamp', 'target.url'];
	var syslogMessage = apigeeVariables.reduce(function (logMessage, key) {
		var value = context.getVariable(key);
		var nextLogMessage = logMessage;

		key.split('.').reduce(function (nextLogMessage, part, index, path) {
			nextLogMessage[part] = index >= path.length - 1 ? value : nextLogMessage[part] || {};

			return nextLogMessage[part];
		}, nextLogMessage);

		return nextLogMessage;
	}, {});

	if (additionalLogvalues) {
		syslogMessage = _extends({}, syslogMessage, additionalLogvalues);
	}

	context.setVariable('log.syslog.message', JSON.stringify(syslogMessage));
};

/**
 * This will get the response from the proxy
 * @param  settings                   Object containing the settings for getting the response from the proxy
 * @param  settings.characterEncoding Optionally convert the response to UTF-8
 * @return                            The response from the targetted API
 */
var getProxyResponse = exports.getProxyResponse = function getProxyResponse() {
	var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { characterEncoding: '' },
	    _ref$characterEncodin = _ref.characterEncoding,
	    characterEncoding = _ref$characterEncodin === undefined ? '' : _ref$characterEncodin;

	var proxyResponse = characterEncoding === 'UTF-8' ? unescape(encodeURIComponent(context.proxyResponse.content)) : context.proxyResponse.content;

	try {
		return JSON.parse(proxyResponse);
	} catch (e) {
		return {};
	}
};

/**
 * This will set the response to the provided content
 * @param  content              The response to set for the proxy
 * @param  settings             Object containing the settings for setting the response
 * @param  settings.contentType An optional contenttype header to set for the response
 */
var setResponse = exports.setResponse = function setResponse(content) {
	var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
		contentType: undefined
	},
	    contentType = _ref2.contentType;

	context.proxyResponse.content = JSON.stringify(content);

	if (contentType) {
		context.setVariable('response.header.content-type', contentType);
	}
};

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
	var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
		prefix: '',
		defaultValue: undefined,
		parser: undefined
	},
	    _ref3$prefix = _ref3.prefix,
	    prefix = _ref3$prefix === undefined ? '' : _ref3$prefix,
	    defaultValue = _ref3.defaultValue,
	    parser = _ref3.parser;

	var rawVariable = context.getVariable(prefix + key);
	var variable = void 0;

	if (variable !== null) {
		variable = parser ? parser(rawVariable) : rawVariable;
	} else if (defaultValue) {
		variable = defaultValue;
	}

	return variable;
};

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
	var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
		prefix: '',
		defaultValues: {},
		parser: {}
	},
	    _ref4$prefix = _ref4.prefix,
	    prefix = _ref4$prefix === undefined ? '' : _ref4$prefix,
	    _ref4$defaultValues = _ref4.defaultValues,
	    defaultValues = _ref4$defaultValues === undefined ? {} : _ref4$defaultValues,
	    _ref4$parser = _ref4.parser,
	    parser = _ref4$parser === undefined ? {} : _ref4$parser;

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