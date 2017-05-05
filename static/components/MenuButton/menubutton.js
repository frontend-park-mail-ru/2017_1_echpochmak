'use strict';

import Link from '../Link/link.js'

import './menubutton.scss'

export default
class MenuButton extends Link {
	constructor(text, attrs) {
		super(text, attrs);
		this.get().classList.add('menu__button');
	}
}
