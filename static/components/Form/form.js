'use strict';

import BaseBlock from '../BaseBlock/baseblock.js'

export default
class Form extends BaseBlock {
	constructor() {
		super('form', {
			class: 'form-horizontal',
			action: '#'
		});
	}
}
