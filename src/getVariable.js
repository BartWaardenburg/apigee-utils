/* @flow */

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
}): any => {
	const rawVariable: ?string = context.getVariable(prefix + key);
	let variable: any;

	if (variable !== null) {
		variable = parser ? parser(rawVariable) : rawVariable;
	} else if (defaultValue) {
		variable = defaultValue;
	}

	return variable;
};

export default getVariable;
