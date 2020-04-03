const { expect } = require('chai');
const eslint = require('..');

describe('index.js', () => {
	it('验证api', () => {
		expect(typeof eslint).to.equal('function');
	});
});
