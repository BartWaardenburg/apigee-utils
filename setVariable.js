'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


/**
 * This will store a value in the Apigee flow
 * @param  key                    The key the value should be stored in
 * @param  value                  The value to store
 * @param  settings               Object containing the settings for setting the variable
 * @param  settings.prefix        A prefix which is used to store the value with
 */
var setVariable = exports.setVariable = function setVariable(key, value) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    prefix: ''
  },
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === undefined ? '' : _ref$prefix;

  if (value !== undefined) {
    context.setVariable(prefix + key, value);
  }
};

exports.default = setVariable;