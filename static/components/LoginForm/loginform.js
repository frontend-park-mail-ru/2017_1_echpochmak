(function () {

	'use strict';

	const Form = window.Form;
	const Input = window.Input;
	const FormButton = window.FormButton;
	// const UserService = window.UserService;
	// const Authorize = window.Authorize;

	class LoginForm extends Form {
		constructor() {
			super();
			this.message = new FormMessage();
			this.login = new Input('Логин', 'login-input', {
				type: 'text',
				placeholder: 'Введите логин',
				required: 'true'
			});
			this.pass = new Input('Пароль', 'password-input', {
				type: 'password',
				placeholder: 'Введите пароль',
				required: 'true'
			});
			this.button = new FormButton('Войти', {
				class: 'btn btn-default btn-lg'
			});

			this.render();
			this.makeListeners();
		}

		render() {
			this.get().appendChild(this.message.get());
			this.get().appendChild(this.login.get());
			this.get().appendChild(this.pass.get());
			this.get().appendChild(this.button.get());
		}

		makeListeners() {
			this.on('submit', () => {
				event.preventDefault();

				const service = new UserService();
				const auth = new Authorize();

				if (this.validate()) {

					service.login(this.data.login, this.data.password, xhr => {
						if (xhr.ok) {
							Main.pages.login.hide();
							Main.pages.menu.show();

							document.body.background = Main.green_background;

							auth.authorize();

							this.get().reset();
							this.message.clean();
						} else {
							this.message.showMessage('Неверный логин или пароль!');
						}
					});
				}
			});
		}

		validate() {
			const login = this.login.input.get().value;
			const pass = this.pass.input.get().value;

			this.data = {
				login: login, 
				password: pass
			};

			return true;
		}
	}

	window.LoginForm = LoginForm;

})();
