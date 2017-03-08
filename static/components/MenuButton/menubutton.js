(function () {

	'use strict';

	class MenuButton extends Link {
		constructor(text, attrs) {
			super(text, attrs);
			this.get().classList.add('btn-class', 'menu-button');
		}
	}

	window.MenuButton = MenuButton;

})();