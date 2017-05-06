'use strict';

import BaseBlock from '../BaseBlock/baseblock.js'

import './formmessage.scss'

export default
class FormMessage extends BaseBlock {
	constructor(text = '', attrs = {}) {
		super('div', {
			class: 'col-xs-12 col-sm-12 col-md-12 col-lg-12 line'
		});
		this.indent = new BaseBlock('div', {
			class: 'col-xs-4 col-sm-4 col-md-4 col-lg-4'
		});
		this.messageBlock = new BaseBlock('div', {
			class: 'col-xs-5 col-sm-5 col-md-5 col-lg-5 form__message'
		});

		this.render();
	}

	showMessage(text) {
		this.messageBlock.get().innerHTML = text;
	}

	clean() {
		this.messageBlock.get().innerHTML = '';
	}

	render() {
		this.get().appendChild(this.indent.get());
		this.get().appendChild(this.messageBlock.get());
	}
}
