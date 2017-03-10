(function () {

	'use strict';

	const BaseBlock = window.BaseBlock;

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