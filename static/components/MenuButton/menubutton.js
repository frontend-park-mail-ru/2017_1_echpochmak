'use strict';

import Link from '../Link/link.js'

export default
class MenuButton extends Link {
	constructor(text, attrs) {
		super(text, attrs);
		this.get().classList.add('btn-class', 'menu-button');
	}
}
