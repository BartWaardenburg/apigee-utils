import {assert} from 'chai';

import validateBoolean from './validateBoolean';

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
