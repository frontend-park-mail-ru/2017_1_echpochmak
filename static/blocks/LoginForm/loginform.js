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
			this.makeListeners();
		}

		render() {
			this.get().appendChild(this.login.get());
			this.get().appendChild(this.pass.get());
			this.get().appendChild(this.button.get());
		}

		makeListeners() {
			this.on('submit', () => {
				event.preventDefault();

				if (this.validate()) {
					Main.pages['login'].get().hidden = true;
					Main.pages['back'].get().hidden = true;
					Main.pages['menu'].get().hidden = false;

					document.body.background = Main.green_background;

					let user = this.login.input.get().value;
					Authorize.authorize(user);

					this.get().reset();
				}
			})
		}

		validate() {
			return true;
		}
	}

	window.LoginForm = LoginForm;

})();
