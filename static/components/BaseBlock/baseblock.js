(function () {

	'use strict';

	class BaseBlock {
		constructor(tag, attrs = {}) {
			this.el = document.createElement(tag);
			this.setAttrs(attrs);
		}

		setAttrs(attrs = {}) {
			Object.keys(attrs).forEach(name => {
				this.el.setAttribute(name, attrs[name]);
			});
		}

		get() {
			return this.el;
		}

		on(name, callback) {
			this.el.addEventListener(name, callback);
		}
	}

	window.BaseBlock = BaseBlock;

})();
