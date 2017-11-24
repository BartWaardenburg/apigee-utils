'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


/**
 * This will do a simple check if the passed string is a stringified boolean or not
 * @param settings          An object containing the options for validation
 * @param settings.name     The name of the variable to check
 * @param settings.value    The value of the variable to check
 * @param settings.required Whether it's required (allow undefined values or not)
 * @return                  A default error message or an empty string
 */
var validateBoolean = exports.validateBoolean = function validateBoolean(_ref) {
  var name = _ref.name,
      value = _ref.value,
      required = _ref.required;
  return required && value === undefined || value !== undefined && value !== 'true' && value !== 'false' ? 'Valid ' + name + ' parameters are "true" and "false". You passed "' + value + '".' : '';
};

exports.default = validateBoolean;