import {assert} from 'chai';

import {
	validateBoolean,
	validateEnum,
	validateMultipleEnum,
} from './pre-flow';

test('The validateBoolean function should validate correctly', () => {
	assert.isNotOk(validateBoolean({
		name: 'test',
		value: 'true',
		required: true,
	}), 'When required true is valid');
	assert.isNotOk(validateBoolean({
		name: 'test',
		value: 'true',
		required: false,
	}), 'When not required true is valid');
	assert.isNotOk(validateBoolean({
		name: 'test',
		value: 'false',
		required: true,
	}), 'When required false is valid');
	assert.isNotOk(validateBoolean({
		name: 'test',
		value: 'false',
		required: false,
	}), 'When not required false is valid');
	assert.isNotOk(validateBoolean({
		name: 'test',
		value: undefined,
		required: false,
	}), 'When not required undefined is valid');

	assert.isOk(validateBoolean({
		name: 'test',
		value: undefined,
		required: true,
	}), 'When required undefined is not valid');
	assert.isOk(validateBoolean({
		name: 'test',
		value: 'asds',
		required: true,
	}), 'When required asds is not valid');
	assert.isOk(validateBoolean({
		name: 'test',
		value: 'asds',
		required: false,
	}), 'When not required asds is not valid');
});

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

test('The validateMultipleEnum function should validate correctly', () => {
	assert.isNotOk(validateMultipleEnum({
		name: 'test',
		validValues: ['hoedje', 'van', 'papier', 'ijzer'],
		values: 'hoedje',
		required: true,
	}), 'When required hoedje is valid');
	assert.isNotOk(validateMultipleEnum({
		name: 'test',
		validValues: ['hoedje', 'van', 'papier', 'ijzer'],
		values: 'hoedje,van',
		required: false,
	}), 'When not required hoedje,van is valid');
	assert.isNotOk(validateMultipleEnum({
		name: 'test',
		validValues: ['hoedje', 'van', 'papier', 'ijzer'],
		values: undefined,
		required: false,
	}), 'When not required undefined is valid');

	assert.isOk(validateMultipleEnum({
		name: 'test',
		validValues: ['hoedje', 'van', 'papier', 'ijzer'],
		values: undefined,
		required: true,
	}), 'When required undefined is not valid');
	assert.isOk(validateMultipleEnum({
		name: 'test',
		validValues: ['hoedje', 'van', 'papier', 'ijzer'],
		values: 'asds',
		required: true,
	}), 'When required asds is not valid');
	assert.isOk(validateMultipleEnum({
		name: 'test',
		validValues: ['hoedje', 'van', 'papier', 'ijzer'],
		values: 'asds,van',
		required: false,
	}), 'When not required asds is not valid');
});
