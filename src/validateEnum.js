/* @flow */

/**
 * This will do a simple check if the passed value is one of the valid values
 * @param settings             An object containing the options for validation
 * @param settings.name        The name of the variable to check
 * @param settings.value       The value of the variable to check
 * @param settings.validValues The possible values
 * @param settings.required    Whether it's required (allow undefined values or not)
 * @return                     A default error message or an empty string
 */
export const validateEnum = ({
	name,
	value,
	required,
	validValues,
}: {
	name: string,
	value: string,
	required: boolean,
	validValues: Array<string>,
}): string =>
	(required && value === undefined) || (value !== undefined && !validValues.includes(value)) ? `Valid ${name} parameters are ${validValues.join(', ')}. You passed ${value}.` : '';

export default validateEnum;
