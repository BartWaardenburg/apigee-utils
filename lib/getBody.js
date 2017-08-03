'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


/**
 * This will get the post body from the request
 * @return The body of the request
 */
var getBody = exports.getBody = function getBody() {
  var body = context.getVariable('request.content');

  return body ? JSON.parse(body) : undefined;
};

exports.default = getBody;