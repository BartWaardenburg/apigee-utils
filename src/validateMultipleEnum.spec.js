import {assert} from 'chai';

import validateMultipleEnum from './validateMultipleEnum';

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
