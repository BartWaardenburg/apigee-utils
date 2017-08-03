/* @flow */
import setVariables from './setVariables';

/**
 * This will validate a set of query parameters and will set a error variable in the apigee with an errorpayload variable which can be send down to the client
 * It is advised to set up a raise on error policy which will return the payload when the error variable == true
 * @param  values          The keys the values to get are stored with
 * @param  settings             Object containing the settings for getting the variables
 * @param  settings.validator   The validator is an object containing functions which take a value and tests whether the value matches to required format returning true for a valid parameter and false for invalid. Or it can return a custom error message as a string. It is also possible to return mutliple error messages as an array of strings. The keys of the validator should be identical to the queryparam keys.
 * @param  settings.prefix      The prefix to use for the variables which will be used to set the potential error messages
 * @return                      A boolean indicating whether the query param were valid or not
 */
export const validateValues = (values: {[key: string]: any}, {
	validator = {},
	prefix = '',
}: {
	validator?: {[key: string]: (value: string) => boolean | string | Array<string>},
	prefix?: string,
} = {
	validator: {},
	prefix: '',
}): boolean => {
	const error = {
		error: false,
		payload: {
			errors: [],
		},
	};

	Object.keys(values).forEach((key: string): void => {
		if (validator[key]) {
			const validatorResponse: boolean | string | Array<string> = validator[key](values[key]);
			const invalidResponse: boolean = validatorResponse === false ||
				typeof validatorResponse === 'string' && validatorResponse !== '' ||
				Array.isArray(validatorResponse) && !!validatorResponse.length;

			if (invalidResponse) {
				const errorMessage: string | Array<string> = typeof validatorResponse === 'boolean' ? '' : validatorResponse;

				error.payload.errors = !Array.isArray(errorMessage) ?
					[...error.payload.errors, createErrorObject(key, values[key], errorMessage)] :
					[...error.payload.errors, ...errorMessage.map((singleErrorMessage: string) => createErrorObject(key, values[key], singleErrorMessage))];
			}
		}
	});

	if (error.payload.errors.length) {
		error.error = true;
		error.payload = {
			title: 'Invalid parameter',
			message: 'One or more parameters are invalid',
			statusCode: 400,
			errors: error.payload.errors,
		};
	}

	setVariables({
		error: error.error,
		errorpayload: JSON.stringify(error.payload),
	}, {
		prefix,
	});

	return !error.error;
};

/**
 * This will create the default error message
 * @param  key      The key of the query parameter
 * @param  value    The value of the query parameter
 * @param  message  The custom message to use
 * @return          A default error object
 */
const createErrorObject = (key: string, value: any, message: string): {
	title: string,
	message: string,
	source: string,
} => ({
	title: `Invalid ${key} query parameter`,
	message: message === '' ? `Invalid ${key} parameter. You passed "${value}".` : message,
	source: key,
});

export default validateValues;
