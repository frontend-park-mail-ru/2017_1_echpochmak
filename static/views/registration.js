(function () {

	'use strict';

	class Register extends BaseView {
		constructor() {
			super('div', {
				'class': 'registration'
			});
			this.padd = new BaseBlock('div', {
				'class': 'padd'
			});
			this.form = new RegisterForm();

			this.render();
		}

		render() {
			this.get().appendChild(this.padd.get());
			this.padd.get().appendChild(this.form.get());
		}
	}

	window.Register = Register;

})();
