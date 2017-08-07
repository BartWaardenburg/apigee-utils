/* @flow */
export const validatorTest = ({
	valid,
	invalid,
	name,
	validator,
}: {
	valid: Array<any>,
	invalid: Array<any>,
	name: string,
	validator: {[key: string]: Function},
}) => {
	test(`The ${name} validation should work as expected`, () => {
		valid.forEach((value) => {
			const result = validator[name](value);

			Array.isArray(result) ?
				expect(result).toHaveLength(0) :
				expect(result).toBeFalsy();
		});
		invalid.forEach((value) => {
			const result = validator[name](value);

			Array.isArray(result) ?
				expect(result.length).toBeGreaterThan(0) :
				expect(result).toBeTruthy();
		});
	});
};

export default validatorTest;
