/* @flow */

/**
 * This will log a message to the syslog variable
 * @param additionalLogvalues Object containing additional key values to be logged
 */
export const logMessage = (additionalLogvalues: ?{[key: string]: string}): void => {
	const apigeeVariables: Array<string> = [
		'apiproxy.name',
		'apiproxy.revision',
		'client.received.start.time',
		'client.received.start.timestamp',
		'environment.name',
		'error.content',
		'error.message',
		'error.state',
		'log.message',
		'message.reason.phrase',
		'message.status.code',
		'messageid',
		'proxy.client.ip',
		'proxy.url',
		'request.url',
		'response.reason.phrase',
		'response.status.code',
		'servicecallout.requesturi',
		'target.ip',
		'target.name',
		'target.received.end.time',
		'target.received.end.timestamp',
		'target.received.start.time',
		'target.received.start.timestamp',
		'target.url',
	];
	let syslogMessage: Object = apigeeVariables.reduce((logMessage: Object, key: string): Object => {
		const value: * = context.getVariable(key);
		const nextLogMessage: Object = logMessage;

		key.split('.').reduce((nextLogMessage: Object, part: string, index: number, path: Array<string>): Object => {
			nextLogMessage[part] = index >= (path.length -1) ? value : (nextLogMessage[part] || {});

			return nextLogMessage[part];
		}, nextLogMessage);

		return nextLogMessage;
	}, {});

	if (additionalLogvalues) {
		syslogMessage = {
			...syslogMessage,
			...additionalLogvalues,
		};
	}

	context.setVariable('log.syslog.message', JSON.stringify(syslogMessage));
};

export default logMessage;
