/* @flow */
type QueryParams = {[key: string]: any};

/**
 * This will get a queryParam from the passed url string
 * @param  queryParamKey  The key for the queryParam
 * @return                The value of the queryParam
 */
export const getQueryParam = (queryParamKey: string): string => context.getVariable('request.queryparam.' + queryParamKey);

/**
 * This will get a set of queryParams from the passed url string
 * @param  possibleQueryParams  An array containing possible queryparams
 * @return                      An object containing values for the passed in queryparams
 */
export const getQueryParams = (possibleQueryParams: Array<string>): QueryParams =>
  possibleQueryParams.reduce((queryParams: QueryParams, possibleQueryKey: string): QueryParams => ({
    ...queryParams,
    [possibleQueryKey]: getQueryParam(possibleQueryKey),
  }), {});

/**
 * This will validate a set of query parameters and will set a error variable in the apigee with an errorpayload variable which can be send down to the client
 * It is advised to set up a raise on error policy which will return the payload when the error variable == true
 * @param  queryParams          The keys the values to get are stored with
 * @param  settings             Object containing the settings for getting the variables
 * @param  settings.validator   The validator is an object containing functions which take a value and tests whether the value matches to required format returning true for a valid parameter and false for invalid. Or it can return a custom error message as a string. The keys of the validator should be identical to the queryparam keys.
 * @return                      A boolean indicating whether an invalid query param was detected or not
 */
export const validateQueryParams = (queryParams: QueryParams, {
  validator = {},
}: {
  validator?: {[key: string]: (key: string) => boolean | string},
}) => {
  const error = {
    error: false,
    payload: {
      errors: [],
    },
  };

  Object.keys(queryParams).forEach((key: string): void => {
		if (queryParams[key] !== undefined && queryParams[key] !== null && validator[key]) {
      const validatorResponse: boolean | string = validator[key](queryParams[key]);

      if (validatorResponse === false || typeof validatorResponse === 'string' && validatorResponse !== '') {
        error.payload.errors = [...error.payload.errors, {
          title: `Invalid ${key} query parameter`,
          message: validatorResponse || `Invalid ${key} parameter. You passed "${queryParams[key]}".`,
          source: key,
        }];
      }
    }
	});

  if (error.payload.errors.length) {
    error.payload = {
      title: 'Invalid query parameter',
      message: 'One or more query parameters are invalid',
      statusCode: 400,
      errors: error.payload.errors,
    };
  }

  setVariables({
    error: error.error,
    errorpayload: JSON.stringify(error.payload),
  }, {
    prefix: '',
  });

  return error.error;
};

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
}) => {
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
}) => Object.keys(variables).forEach((key: string) => {
  if (variables[key] !== undefined && variables[key] !== null) {
    setVariable(key, variables[key], {
      prefix,
    });
  }
});
