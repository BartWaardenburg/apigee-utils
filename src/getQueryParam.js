/* @flow */

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

export default getQueryParam;
