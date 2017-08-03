/* @flow */

/**
 * This will get the response from the proxy
 * @param  settings                   Object containing the settings for getting the response from the proxy
 * @param  settings.characterEncoding Optionally convert the response to UTF-8
 * @return                            The response from the targetted API
 */
export const getProxyResponse = ({characterEncoding = ''}: {characterEncoding?: string} = {characterEncoding: ''}): any => {
	const proxyResponse: string = characterEncoding === 'UTF-8' ? unescape(encodeURIComponent(context.proxyResponse.content)) : context.proxyResponse.content;

	try {
		return JSON.parse(proxyResponse);
	} catch (e) {
		return {};
	}
};

export default getProxyResponse;
