/* @flow */
type QueryParams = {[key: string]: any};

/**
 * This will get the post body from the request
 * @return The body of the request
 */
export const getBody = (): any => {
	const body = context.getVariable('request.content');

	return body ? JSON.parse(body) : undefined;
};

/**
 * This will get a queryParam from the passed url string
 * @param  queryParamKey  The key for the queryParam
 * @param  defaultValue   The default value to return when nothing is available
 * @return                The value of the queryParam
 */
export const getQueryParam = (queryParamKey: string, defaultValue: ?string): ?string => {
	const queryParam = context.getVariable('request.queryparam.' + queryParamKey);

	return queryParam === undefined || queryParam === null ? defaultValue : queryParam;
};

/**
 * This will get a set of queryParams from the passed url string
 * @param  possibleQueryParams    An array containing possible queryparams
 * @param  settings               Object containing the settings for getting the queryparams
 * @param  settings.defaultValues The value to return when no value is found. The keys of the default values should be identical to the queryparam keys.
 * @return                        An object containing values for the passed in queryparams
 */
export const getQueryParams = (possibleQueryParams: Array<string>, {
	defaultValues = {},
}: {
	defaultValues: {[key: string]: string},
} = {
	defaultValues: {},
}): {[key: string]: any} => possibleQueryParams.reduce((queryParams: QueryParams, possibleQueryKey: string): QueryParams => ({
		...queryParams,
		[possibleQueryKey]: getQueryParam(possibleQueryKey, defaultValues[possibleQueryKey]),
	}), defaultValues);

/**
 * This will convert an object with key value pairs to a new object with key value pairs
 * @param  queryParams            An object containing key value pairs to be used as query parameters
 * @param  settings               Object containing the settings for creating the queryparams
 * @param  settings.renamer       The name of the keys to rename. In a format of oldname: newname
 * @param  settings.defaultValues The value to return when no value is found. The keys of the default values should be identical to the queryparam keys.
 * @param  settings.transformer   A transformer object contains functions which take a value and return a new value. The keys of the transformer should be identical to the queryparam keys.
 */
export const createQueryParams = (queryParams: {[key: string]: any}, {
	renamer = {},
	defaultValues = {},
	transformer = {},
}: {
	renamer: {[key: string]: string},
	defaultValues: {[key: string]: string},
	transformer: {[key: string]: any},
} = {
	renamer: {},
	defaultValues: {},
	transformer: {},
}): {[key: string]: any} => Object.keys(queryParams).reduce((nextQueryParams, key) => ({
	...nextQueryParams,
	[renamer[key] || key]: queryParams[key] !== undefined && queryParams[key] !== null ?
		transformer[key] ?
			transformer[key](queryParams[key]) :
			queryParams[key] :
		defaultValues[key],
}), defaultValues);

/**
 * This will set a query parameter to the provided value
 * @param  key   The key of the queryparam to set
 * @param  value The value to set the queryparam to
 */
export const setQueryParam = (key: string, value: any): void => context.setVariable(`request.queryparam.${key}`, value);

/**
 * This will convert an object with key value pairs to query parameters
 * @param  queryParams   An object containing key value pairs to be used as query parameters
 */
export const setQueryParams = (queryParams: {[key: string]: any}): void =>
	Object.keys(queryParams).forEach((key: string): void => setQueryParam(key, queryParams[key]));

/**
 * This will validate a set of query parameters and will set a error variable in the apigee with an errorpayload variable which can be send down to the client
 * It is advised to set up a raise on error policy which will return the payload when the error variable == true
 * @param  queryParams          The keys the values to get are stored with
 * @param  settings             Object containing the settings for getting the variables
 * @param  settings.validator   The validator is an object containing functions which take a value and tests whether the value matches to required format returning true for a valid parameter and false for invalid. Or it can return a custom error message as a string. It is also possible to return mutliple error messages as an array of strings. The keys of the validator should be identical to the queryparam keys.
 * @param  settings.prefix      The prefix to use for the variables which will be used to set the potential error messages
 * @return                      A boolean indicating whether the query param were valid or not
 */
export const validateQueryParams = (queryParams: QueryParams, {
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

	Object.keys(queryParams).forEach((key: string): void => {
		if (validator[key]) {
			const validatorResponse: boolean | string | Array<string> = validator[key](queryParams[key]);
			const invalidResponse: boolean = validatorResponse === false ||
				typeof validatorResponse === 'string' && validatorResponse !== '' ||
				Array.isArray(validatorResponse) && !!validatorResponse.length;

			if (invalidResponse) {
				const errorMessage: string | Array<string> = typeof validatorResponse === 'boolean' ? '' : validatorResponse;

				error.payload.errors = !Array.isArray(errorMessage) ?
					[...error.payload.errors, createErrorObject(key, queryParams[key], errorMessage)] :
					[...error.payload.errors, ...errorMessage.map((singleErrorMessage: string) => createErrorObject(key, queryParams[key], singleErrorMessage))];
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
 * Works just like validateQueryParams but has a more generic name
 */
export const validateValues = validateQueryParams;

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

/**
 * This will do a simple check if the passed string is a stringified boolean or not
 * @param settings          An object containing the options for validation
 * @param settings.name     The name of the variable to check
 * @param settings.value    The value of the variable to check
 * @param settings.required Whether it's required (allow undefined values or not)
 * @return                  A default error message or an empty string
 */
export const validateBoolean = ({
	name,
	value,
	required,
}: {
	name: string,
	value: string,
	required: boolean,
}): string =>
	(required && value === undefined) || (value !== undefined && value !== 'true' && value !== 'false') ? `Valid ${name} parameters are "true" and "false". You passed "${value}".` : '';

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
