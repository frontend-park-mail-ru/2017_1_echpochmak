(function () {

	'use strict';

	class List extends BaseBlock {
		constructor(text = '', attrs = {}) {
			super('div', attrs);
			this.setAttrs({
				'type': 'submit'
			});
			this.get().innerHTML = text;
		}
	}

	window.List = List;

})();