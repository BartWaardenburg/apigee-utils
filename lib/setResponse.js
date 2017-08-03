'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


/**
 * This will set the response to the provided content
 * @param  content              The response to set for the proxy
 * @param  settings             Object containing the settings for setting the response
 * @param  settings.contentType An optional contenttype header to set for the response
 */
var setResponse = exports.setResponse = function setResponse(content) {
	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
		contentType: undefined
	},
	    contentType = _ref.contentType;

	context.proxyResponse.content = JSON.stringify(content);

	if (contentType) {
		context.setVariable('response.header.content-type', contentType);
	}
};

exports.default = setResponse;