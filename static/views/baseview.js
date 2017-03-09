(function () {

	'use strict';

	class BaseView extends BaseBlock {
		constructor(tag, attrs) {
			super(tag, attrs);
			this.back = new Back(this);
			this.get().appendChild(this.back.get());
		}

		show() {
			document.querySelector('body').appendChild(this.get());
		}

		hide() {
			document.querySelector('body').removeChild(this.get());
		}
	}

	window.BaseView = BaseView;

})();
