'use strict';

import BaseBlock from '../BaseBlock/baseblock.js'
import Link from '../Link/link.js'
import Router from '../../modules/router.js'

export default
class Back extends BaseBlock {
	constructor() {
		super('div', {
			class: 'back',
			align: 'right'
		});
		this.link = new Link('', {
			class: 'back-button'
		});
		this.image = new BaseBlock('img', {
			src: './img/back.png'
		});
		this.text = new BaseBlock('p');
		this.text.get().innerHTML = 'Обратно в меню';

		this.render();
	}

	onclick(callback) {
		this.link.on('click', () => {
			callback();
		})
	}

	render() {
		this.get().appendChild(this.link.get());
		this.link.get().appendChild(this.image.get());
		this.get().appendChild(this.text.get());
	}
}
