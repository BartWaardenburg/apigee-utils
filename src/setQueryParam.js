/* @flow */

/**
 * This will set a query parameter to the provided value
 * @param  key   The key of the queryparam to set
 * @param  value The value to set the queryparam to
 */
export const setQueryParam = (key: string, value: any): void => context.setVariable(`request.queryparam.${key}`, value);

export default setQueryParam;
