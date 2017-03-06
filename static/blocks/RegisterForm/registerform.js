(function () {

	'use strict';

	class RegisterForm extends Form {
		constructor() {
			super();
			this.email = new Input('E-Mail', 'email-input', {
				'type': 'email',
				'placeholder': 'Введите ваш E-Mail'
			})
			this.login = new Input('Логин', 'login-input', {
				'type': 'text',
				'placeholder': 'Введите ваш логин',
				'required': 'true'
			});
			this.pass = new Input('Пароль', 'password-input', {
				'type': 'password',
				'placeholder': 'Введите ваш пароль',
				'required': 'true'
			});
			this.repeat = new Input('Повторите пароль', 'password-input', {
				'type': 'password',
				'placeholder': 'Повторите ваш пароль',
				'required': 'true'
			});
			this.button = new FormButton('Зарегистрироваться', {
				'class': 'btn btn-default btn-lg'
			});

			this.render();
		}

		render() {
			this.get().appendChild(this.email.get());
			this.get().appendChild(this.login.get());
			this.get().appendChild(this.pass.get());
			this.get().appendChild(this.repeat.get());
			this.get().appendChild(this.button.get());
		}
	}

	window.RegisterForm = RegisterForm;

})();
