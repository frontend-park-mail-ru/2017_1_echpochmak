(function () {

	'use strict';

	const BaseBlock = window.BaseBlock;

	class Form extends BaseBlock {
		constructor() {
			super('form', {
				'class': 'form-horizontal',
				'action': '#'
			});
		}
	}

	window.Form = Form;

})();
