(function () {

	'use strict';

	class LoginForm extends Form {
		constructor() {
			super();
			this.login = new Input('Логин', 'login-input', {
				'type': 'text',
				'placeholder': 'Введите логин',
				'required': 'true'
			});
			this.pass = new Input('Пароль', 'password-input', {
				'type': 'password',
				'placeholder': 'Введите пароль',
				'required': 'true'
			});
			this.button = new FormButton('Войти', {
				'class': 'btn btn-default btn-lg'
			});

			this.render();
		}

		render() {
			this.get().appendChild(this.login.get());
			this.get().appendChild(this.pass.get());
			this.get().appendChild(this.button.get());
		}
	}

	window.LoginForm = LoginForm;

})();
