'use strict';

import BaseBlock from '../BaseBlock/baseblock.js'

export default
class Button extends BaseBlock {
	constructor(text = '', attrs = {}) {
		attrs.type = 'submit';
		super('button', attrs);
		this.get().innerHTML = text;
	}
}
