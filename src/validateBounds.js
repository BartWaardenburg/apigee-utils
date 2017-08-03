/* @flow */

/**
 * This will do a simple check if the passed string of values is a valid latitude and longitude map bounds
 * @param settings             An object containing the options for validation
 * @param settings.name        The name of the variable to check
 * @param settings.value       The bounds value
 * @param settings.required    Whether it's required (allow undefined values or not)
 * @return                     A default error message or an empty array
 */
export const validateBounds = ({
	name,
	value,
	required,
}: {
	name: string,
	value: string,
	required: boolean,
}) => {
	const errorMessages: Array<string> = [];
	const baseMessage: string = `Valid ${name} parameters are of the following format lat,lon:lat,lon. You passed ${value}.`;

	if (!value && required) {
		errorMessages.push(`${baseMessage} ${name} is required.`);
	}

	if (value) {
		// The string has to include a location seperator in the form of a semicolon
		if (!value.includes(':')) {
			errorMessages.push(`${baseMessage} ${name} should be seperated by a ":".`);
		}

		const splitBounds: Array<string> = value.split(':');

		// It should always include both a northwest and southeast location
		if (splitBounds.length !== 2) {
			errorMessages.push(`${baseMessage} It should include 2 locations: The northwest and southeast latitude longitude pairs. You passed "${splitBounds.length}" values.`);
		}

		splitBounds.forEach((location: string): void => {
			// A location should include a lat lon seperator in the form of a comma
			if (!location.includes(',')) {
				errorMessages.push(`${baseMessage} Latitude and longitude should be seperated by a ",".`);
			}

			const splitLocation = location.split(',');

			// It should always include both a latitude and a longitude
			if (splitLocation.length !== 2) {
				errorMessages.push(`${baseMessage} It should contain only a latitude and longitude. You passed "${splitLocation.length}" values.`);
			}

			splitLocation.forEach((locationPart: string): void => {
				const point: number = parseFloat(locationPart);

				// The latitude or longitude has to be a valid number and has to be between -180 and 180
				if (isNaN(point) || point > 180 || point < -180) {
					errorMessages.push(`${baseMessage} The value for the latitude and longitude should be between -180 and 180. You passed "${point}".`);
				}
			});
		});
	}

	return errorMessages;
};

export default validateBounds;
