(function () {

	'use strict';

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
