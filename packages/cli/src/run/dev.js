const { EventEmitter } = require('events');
const path = require('path');
const fs = require('fs-extra');
const { prompt, Separator } = require('inquirer');
const { exec } = require('child_process');

class DevProcess extends EventEmitter {
	constructor(parent) {
		super();
		process.env.NODE_ENV = 'development';
		this.$parent = parent;
	}

	/**
	 * TODO
	 */
	async process() {
		// 
	}
}

module.exports = DevProcess;