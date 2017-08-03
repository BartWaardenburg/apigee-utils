/* @flow */
import getQueryParam from './getQueryParam';

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
}): {[key: string]: any} => possibleQueryParams.reduce((queryParams: {[key: string]: any}, possibleQueryKey: string): {[key: string]: any} => ({
		...queryParams,
		[possibleQueryKey]: getQueryParam(possibleQueryKey, defaultValues[possibleQueryKey]),
	}), defaultValues);

export default getQueryParams;
