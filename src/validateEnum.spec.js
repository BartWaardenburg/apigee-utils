import {assert} from 'chai';

import validateEnum from './validateEnum';

test('The validateEnum function should validate correctly', () => {
	assert.isNotOk(validateEnum({
		name: 'test',
		validValues: ['test', 'nogeentest'],
		value: 'test',
		required: true,
	}), 'When required test is valid');
	assert.isNotOk(validateEnum({
		name: 'test',
		validValues: ['test', 'nogeentest'],
		value: 'nogeentest',
		required: false,
	}), 'When not required nogeentest is valid');
	assert.isNotOk(validateEnum({
		name: 'test',
		validValues: ['test', 'nogeentest'],
		value: undefined,
		required: false,
	}), 'When not required undefined is valid');

	assert.isOk(validateEnum({
		name: 'test',
		validValues: ['test', 'nogeentest'],
		value: undefined,
		required: true,
	}), 'When required undefined is not valid');
	assert.isOk(validateEnum({
		name: 'test',
		validValues: ['test', 'nogeentest'],
		value: 'asds',
		required: true,
	}), 'When required asds is not valid');
	assert.isOk(validateEnum({
		name: 'test',
		validValues: ['test', 'nogeentest'],
		value: 'asds',
		required: false,
	}), 'When not required asds is not valid');
});
