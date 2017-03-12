(function () {

	'use strict';

	const Form = window.Form;
	const Input = window.Input;
	const FormButton = window.FormButton;
	// const UserService = window.UserService;
	// const Authorize = window.Authorize;

	class RegisterForm extends Form {
		constructor() {
			super();
			this.message = new FormMessage();
			this.email = new Input('E-Mail', 'email-input', {
				type: 'email',
				placeholder: 'Введите ваш E-Mail'
			});
			this.login = new Input('Логин', 'login-input', {
				type: 'text',
				placeholder: 'Введите ваш логин',
				required: 'true'
			});
			this.pass = new Input('Пароль', 'password-input', {
				type: 'password',
				placeholder: 'Введите ваш пароль',
				required: 'true'
			});
			this.repeat = new Input('Повторите пароль', 'password-input', {
				type: 'password',
				placeholder: 'Повторите ваш пароль',
				required: 'true'
			});
			this.button = new FormButton('Зарегистрироваться', {
				class: 'btn btn-default btn-lg'
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
				const auth = new Authorize();

				if (this.validate()) {

					service.register(this.data.email, this.data.login, this.data.password, xhr => {
						if (xhr.status === 'ok') {
							Main.pages.register.hide();
							Main.pages.menu.show();

							document.body.background = Main.green_background;

							auth.authorize();

							this.get().reset();
							this.message.clean();
						} else {
							this.message.showMessage('Что-то пошло не так');
						}
					});
				}
			});
		}

		validate() {
			const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;

			const login = this.login.input.get();
			const loginError = this.login.errorBlock.get();
			const email = this.email.input.get();
			const emailError = this.email.errorBlock.get();
			const pass = this.pass.input.get();
			const passError = this.pass.errorBlock.get();
			const passRepeat = this.repeat.input.get();
			const passRepeatError = this.repeat.errorBlock.get();

			loginError.textContent = '';
			emailError.textContent = '';
			passError.textContent = '';
			passRepeatError.textContent = '';

			let result = true;

			if (!regexp.test(email.value)) {
				emailError.textContent = 'Введенный вами E-mail некорректен';
				result = false;
			}
			if (login.value.length > 15 || login.value.length < 5) {
				loginError.textContent = 'Ваш логин должен содержать от 5 до 15 символов';
				result = false;
			}
			if (pass.value.length < 5) {
				passError.textContent = 'Ваш пароль должен содержать не менее 5 символов';
				result = false;
			}
			if (pass.value !== passRepeat.value) {
				passRepeatError.textContent = 'Пароли не совпадают';
				result = false;
			}

			if (!result) {
				pass.value = passRepeat.value = '';
			} else {
				this.data = {email: email.value, login: login.value, password: pass.value};
			}

			return result;
		}
	}

	window.RegisterForm = RegisterForm;

})();
