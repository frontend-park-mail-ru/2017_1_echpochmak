'use strict';

import BaseBlock from '../BaseBlock/baseblock.js'

export default
class Link extends BaseBlock {
	constructor(text = '', attrs = {}) {
		super('a', attrs);
		this.setAttrs({
			href: '#'
		});
		this.get().innerHTML = text;
	}

	onclick(callback) {
		this.on('click', () => {
			callback();
		})
	}
}
