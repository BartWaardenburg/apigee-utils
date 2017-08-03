/* @flow */

/**
 * This will store a value in the Apigee flow
 * @param  key                    The key the value should be stored in
 * @param  value                  The value to store
 * @param  settings               Object containing the settings for setting the variable
 * @param  settings.prefix        A prefix which is used to store the value with
 */
export const setVariable = (key: string, value: any, {
	prefix = '',
}: {
	prefix?: string,
} = {
	prefix: '',
}): void => {
	if (value !== undefined) {
		context.setVariable(prefix + key, value);
	}
};

export default setVariable;
