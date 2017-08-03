/* @flow */

/**
 * This will do a simple check if the passed string of values contains one or more valid values
 * @param settings             An object containing the options for validation
 * @param settings.name        The name of the variable to check
 * @param settings.values      The values of the variable to check (must be a string seperated by commas)
 * @param settings.required    Whether it's required (allow undefined values or not)
 * @param settings.validValues The possible values
 * @return                     A default error message or an empty string
 */
export const validateMultipleEnum = ({
	name,
	values,
	required,
	validValues,
}: {
	name: string,
	values: string,
	required: boolean,
	validValues: Array<string>,
}): string =>
	(required && values === undefined) || (values !== undefined && !values.split(',').every((value: string): boolean => validValues.includes(value))) ?
		`Valid ${name} parameters are ${validValues.join(', ')} seperated by just a ,. You passed ${values}.` : '';

export default validateMultipleEnum;
