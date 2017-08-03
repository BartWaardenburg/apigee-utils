/* @flow */

/**
 * This will set the response to the provided content
 * @param  content              The response to set for the proxy
 * @param  settings             Object containing the settings for setting the response
 * @param  settings.contentType An optional contenttype header to set for the response
 */
export const setResponse = (content: any, {
	contentType,
}: {
	contentType: ?string,
} = {
	contentType: undefined,
}): void => {
	context.proxyResponse.content = JSON.stringify(content);

	if (contentType) {
		context.setVariable('response.header.content-type', contentType);
	}
};

export default setResponse;
