/* @flow */

/**
 * This will log a message to the syslog variable
 */
export const logMessage = (additionalLogvalues: ?{[key: string]: string}): void => {
	const apigeeVariables: Array<string> = [
		'client.port',
		'client.received.start.time',
		'client.received.start.timestamp',
		'message.path',
		'message.querystring',
		'message.uri',
		'message.verb',
		'message.version',
		'message.reason.phrase',
		'message.status.code',
		'proxy.basepath',
		'proxy.client.ip',
		'proxy.pathsuffix',
		'proxy.url',
		'request.path',
		'request.querystring',
		'request.uri',
		'request.url',
		'request.verb',
		'request.version',
		'servicecallout.requesturi',
		'target.basepath',
		'target.copy.pathsuffix',
		'target.copy.queryparams',
		'target.name',
		'response.reason.phrase',
		'response.status.code',
		'target.received.end.time',
		'target.received.end.timestamp',
		'target.received.start.time',
		'target.received.start.timestamp',
		'target.host',
		'target.ip',
		'target.port',
		'target.scheme',
		'error.content',
		'error.message',
		'error.state',
		'log.message',
		'application.basepath',
		'proxy.name',
		'proxy.basepath',
		'proxy.pathsuffix',
		'target.basepath',
		'target.url',
		'organization.name',
		'apiproxy.name',
		'apiproxy.revision',
		'environment.name',
		'messageid',
	];
	let syslogMessage: Object = apigeeVariables.reduce((message: Object, key: string): Object => ({
		...message,
		[key]: context.getVariable(key),
	}), {});

	if (additionalLogvalues) {
		syslogMessage = {
			...syslogMessage,
			...additionalLogvalues,
		};
	}

	context.setVariable('log.syslog.message', JSON.stringify(syslogMessage));
};

/**
 * This will get the response from the proxy
 * @param  settings                   Object containing the settings for getting the response from the proxy
 * @param  settings.characterEncoding Optionally convert the response to UTF-8
 * @return                            The response from the targetted API
 */
export const getProxyResponse = ({characterEncoding = ''}: {characterEncoding?: string} = {characterEncoding: ''}): any => {
	const proxyResponse: string = characterEncoding === 'UTF-8' ? unescape(encodeURIComponent(context.proxyResponse.content)) : context.proxyResponse.content;

	return JSON.parse(proxyResponse);
};

/**
 * This will set the response to the provided content
 * @param  content              The response to set for the proxy
 * @param  settings             Object containing the settings for setting the response
 * @param  settings.contentType An optional contenttype header to set for the response
 */
export const setResponse = (content: any, {
	contentType,
}: {
	contentType: ?string,
} = {
	contentType: undefined,
}): void => {
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
export const getVariable = (key: string, {
	prefix =  '',
	defaultValue,
	parser,
}: {
	prefix?: string,
	defaultValue?: any,
	parser?: Function,
} = {
	prefix: '',
	defaultValue: undefined,
	parser: undefined,
}) => {
	const rawVariable: ?string = context.getVariable(prefix + key);
	let variable: any;

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
export const getVariables = (keys: Array<string>, {
	prefix = '',
	defaultValues = {},
	parser = {},
}: {
	prefix?: string,
	defaultValues: {[key: string]: any},
	parser?: {[key: string]: (value: any) => any},
} = {
	prefix: '',
	defaultValues: {},
	parser: {},
}) => keys.reduce((variables: {[key: string]: any}, key: string): {[key: string]: any} => {
	const variable: ?string = context.getVariable(prefix + key);

	if (variable !== null) {
		variables[key] = parser[key] ? parser[key](variable) : variable;
	} else if (defaultValues[key]) {
		variables[key] = defaultValues[key];
	}

	return variables;
}, {});
