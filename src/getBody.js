/* @flow */

/**
 * This will get the post body from the request
 * @return The body of the request
 */
export const getBody = (): any => {
	const body = context.getVariable('request.content');

	return body ? JSON.parse(body) : undefined;
};

export default getBody;
