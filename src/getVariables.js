/* @flow */

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
}): {[key: string]: any} => keys.reduce((variables: {[key: string]: any}, key: string): {[key: string]: any} => {
	const variable: ?string = context.getVariable(prefix + key);

	if (variable !== null) {
		variables[key] = parser[key] ? parser[key](variable) : variable;
	} else if (defaultValues[key]) {
		variables[key] = defaultValues[key];
	}

	return variables;
}, {});

export default getVariables;
