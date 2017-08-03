/* @flow */
import setVariable from './setVariable';

/**
 * This will store a set of values in the Apigee flow
 * @param  variables              An object containing key value pairs to store
 * @param  settings               Object containing the settings for setting the variables
 * @param  settings.prefix        A prefix which is used to store the value with
 */
export const setVariables = (variables: {[key: string]: any}, {
	prefix = '',
}: {
	prefix?: string,
} = {
	prefix: '',
}): void => Object.keys(variables).forEach((key: string) => {
	if (variables[key] !== undefined && variables[key] !== null) {
		setVariable(key, variables[key], {
			prefix,
		});
	}
});

export default setVariables;
