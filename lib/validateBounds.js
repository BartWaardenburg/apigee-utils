'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


/**
 * This will do a simple check if the passed string of values is a valid latitude and longitude map bounds
 * @param settings             An object containing the options for validation
 * @param settings.name        The name of the variable to check
 * @param settings.value       The bounds value
 * @param settings.required    Whether it's required (allow undefined values or not)
 * @return                     A default error message or an empty array
 */
var validateBounds = exports.validateBounds = function validateBounds(_ref) {
	var name = _ref.name,
	    value = _ref.value,
	    required = _ref.required;

	var errorMessages = [];
	var baseMessage = 'Valid ' + name + ' parameters are of the following format lat,lon:lat,lon. You passed ' + value + '.';

	if (!value && required) {
		errorMessages.push(baseMessage + ' ' + name + ' is required.');
	}

	if (value) {
		// The string has to include a location seperator in the form of a semicolon
		if (!(value.indexOf(':') !== -1)) {
			errorMessages.push(baseMessage + ' ' + name + ' should be seperated by a ":".');
		}

		var splitBounds = value.split(':');

		// It should always include both a northwest and southeast location
		if (splitBounds.length !== 2) {
			errorMessages.push(baseMessage + ' It should include 2 locations: The northwest and southeast latitude longitude pairs. You passed "' + splitBounds.length + '" values.');
		}

		splitBounds.forEach(function (location) {
			// A location should include a lat lon seperator in the form of a comma
			if (!(location.indexOf(',') !== -1)) {
				errorMessages.push(baseMessage + ' Latitude and longitude should be seperated by a ",".');
			}

			var splitLocation = location.split(',');

			// It should always include both a latitude and a longitude
			if (splitLocation.length !== 2) {
				errorMessages.push(baseMessage + ' It should contain only a latitude and longitude. You passed "' + splitLocation.length + '" values.');
			}

			splitLocation.forEach(function (locationPart) {
				var point = parseFloat(locationPart);

				// The latitude or longitude has to be a valid number and has to be between -180 and 180
				if (isNaN(point) || point > 180 || point < -180) {
					errorMessages.push(baseMessage + ' The value for the latitude and longitude should be between -180 and 180. You passed "' + point + '".');
				}
			});
		});
	}

	return errorMessages;
};

exports.default = validateBounds;