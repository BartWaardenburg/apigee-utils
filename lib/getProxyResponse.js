'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


/**
 * This will get the response from the proxy
 * @param  settings                   Object containing the settings for getting the response from the proxy
 * @param  settings.characterEncoding Optionally convert the response to UTF-8
 * @return                            The response from the targetted API
 */
var getProxyResponse = exports.getProxyResponse = function getProxyResponse() {
	var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { characterEncoding: '' },
	    _ref$characterEncodin = _ref.characterEncoding,
	    characterEncoding = _ref$characterEncodin === undefined ? '' : _ref$characterEncodin;

	var proxyResponse = characterEncoding === 'UTF-8' ? unescape(encodeURIComponent(context.proxyResponse.content)) : context.proxyResponse.content;

	try {
		return JSON.parse(proxyResponse);
	} catch (e) {
		return {};
	}
};

exports.default = getProxyResponse;