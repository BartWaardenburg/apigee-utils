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

exports.default = logMessage;