'use strict';

import Form from '../Form/form.js'
import Input from '../Input/input.js'
import FormButton from '../FormButton/formbutton.js'
import FormMessage from '../FormMessage/formmessage.js'
import UserService from '../../services/userservice.js'
import Authorize from '../../services/authorize.js'
import Router from '../../modules/router.js'

export default
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
		// this.makeListeners();
	}

	render() {
		this.get().appendChild(this.message.get());
		this.get().appendChild(this.login.get());
		this.get().appendChild(this.pass.get());
		this.get().appendChild(this.button.get());
	}

	onsubmit(callback) {
		this.on('submit', () => {
			callback();
		})
	}

	makeListeners() {

		const router = new Router();

		this.on('submit', () => {
			event.preventDefault();

			const service = new UserService();
			const auth = new Authorize();

			if (this.validate()) {

				service.login(this.data.login, this.data.password, xhr => {
					if (xhr.status === 'ok') {
						router.go('/');

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
