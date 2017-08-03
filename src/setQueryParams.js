/* @flow */
import setQueryParam from './setQueryParam';

/**
 * This will convert an object with key value pairs to query parameters
 * @param  queryParams   An object containing key value pairs to be used as query parameters
 */
export const setQueryParams = (queryParams: {[key: string]: any}): void =>
	Object.keys(queryParams).forEach((key: string): void => setQueryParam(key, queryParams[key]));
