(function () {

	'use strict';

	const BaseView = window.BaseView;
	const BaseBlock = window.BaseBlock;
	const RegisterForm = window.RegisterForm;

	class Register extends BaseView {
		constructor() {
			super('div', {
				class: 'registration'
			});
			this.background = this.white_background;
			
			this.padd = new BaseBlock('div', {
				class: 'padd'
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
