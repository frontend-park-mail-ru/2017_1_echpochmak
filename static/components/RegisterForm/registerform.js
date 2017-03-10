(function () {

	'use strict';

	class RegisterForm extends Form {
		constructor() {
			super();
			this.message = new FormMessage();
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
			this.makeListeners();
		}

		render() {
			this.get().appendChild(this.message.get());
			this.get().appendChild(this.email.get());
			this.get().appendChild(this.login.get());
			this.get().appendChild(this.pass.get());
			this.get().appendChild(this.repeat.get());
			this.get().appendChild(this.button.get());
		}

		makeListeners() {
			this.on('submit', () => {
				event.preventDefault();

				const service = new UserService();

				if (this.validate()) {

					service.register(this.data.email, this.data.login, this.data.password, xhr => {
						if (xhr.ok) {
							Main.pages.register.hide();
							Main.pages.menu.show();

							document.body.background = Main.green_background;

							this.get().reset();
							this.message.clean();
						} else {
							this.message.showMessage("Что-то пошло не так. Что именно, я смогу сказать только тогда, " +
								"когда Варя настроит возвращаемый статус с сервера");
						}
					})
				}
			})
		}

		validate() {
			const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;

			const login = this.login.input.get();
			const login_error = this.login.errorBlock.get();
			const email = this.email.input.get();
			const email_error = this.email.errorBlock.get();
			const pass = this.pass.input.get();
			const pass_error = this.pass.errorBlock.get();
			const pass_repeat = this.repeat.input.get();
			const pass_repeat_error = this.repeat.errorBlock.get();

			login_error.textContent = "";
			email_error.textContent = "";
			pass_error.textContent = "";
			pass_repeat_error.textContent = "";

			let result = true;

			if (!regexp.test(email.value)) {
				email_error.textContent = "Введенный вами E-mail некорректен";
				result = false;
			} 
			if (login.value.length > 15 || login.value.length < 5) {
				login_error.textContent = "Ваш логин должен содержать от 5 до 15 символов";
				result = false;
			} 
			if (pass.value.length < 5) {
				pass_error.textContent = "Ваш пароль должен содержать не менее 5 символов";
				result = false;
			}
			if (pass.value != pass_repeat.value) {
				pass_repeat_error.textContent = "Пароли не совпадают";
				result = false;
			} 

			if (!result) {
				pass.value = pass_repeat.value = "";
			} else {
				this.data = {"email": email.value, "login": login.value, "password": pass.value};
			}
			
			return result;
		}
	}

	window.RegisterForm = RegisterForm;

})();
