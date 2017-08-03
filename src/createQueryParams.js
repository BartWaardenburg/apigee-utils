/* @flow */

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

export default createQueryParams;
