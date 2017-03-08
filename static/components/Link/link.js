(function () {

	'use strict';

	class Link extends BaseBlock {
		constructor(text = '', attrs = {}) {
			super('a', attrs);
			this.setAttrs({
				'href': '#'
			});
			this.get().innerHTML = text;
		}
	}

	window.Link = Link;

})();