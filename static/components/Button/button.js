(function () {

	'use strict';

	const BaseBlock = window.BaseBlock;

	class Button extends BaseBlock {
		constructor(text = '', attrs = {}) {
			attrs['type'] = 'submit';
			super('button', attrs);
			this.get().innerHTML = text;
		}
	}

	window.Button = Button;

})();