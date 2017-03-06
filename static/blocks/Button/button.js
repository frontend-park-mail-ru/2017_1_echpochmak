(function () {

	'use strict';

	class Button extends BaseBlock {
		constructor(text = '', attrs = {}) {
			super('button', attrs);
			this.setAttrs({
				'type': 'submit'
			});
			this.get().innerHTML = text;
		}
	}

	window.Button = Button;

})();