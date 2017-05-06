'use strict';

import BaseBlock from '../BaseBlock/baseblock.js'
import Button from '../Button/button.js'

export default
class FormButton extends BaseBlock {
	constructor(text = '', attrs = {}) {
		super('div', {
			class: 'col-xs-12 col-sm-12 col-md-12 col-lg-12 line'
		});
		this.indent = new BaseBlock('div', {
			class: 'col-xs-4 col-sm-4 col-md-4 col-lg-4'
		});
		this.buttonBlock = new BaseBlock('div', {
			class: 'col-xs-5 col-sm-5 col-md-5 col-lg-5'
		});
		this.button = new Button(text, attrs);

		this.render();
	}

	render() {
		this.get().appendChild(this.indent.get());
		this.get().appendChild(this.buttonBlock.get());
		this.buttonBlock.get().appendChild(this.button.get());
	}
}
