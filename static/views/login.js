'use strict';

import BaseView from './baseview.js'
import BaseBlock from '../components/BaseBlock/baseblock.js'
import LoginForm from '../components/LoginForm/loginform.js'
import UserService from '../services/userservice.js'
import Authorize from '../services/authorize.js'
import Router from '../modules/router.js'

export default
class Login extends BaseView {
	constructor() {
		super('div', {
			class: 'login'
		});
		this.background = this.white_background;
		
		this.padd = new BaseBlock('div', {
			class: 'padd'
		});
		this.form = new LoginForm();

		this.form.onsubmit(() => {

			event.preventDefault();

			const service = new UserService();
			const auth = new Authorize();
			const router = new Router();

			if (this.form.validate()) {

				service.login(this.form.data.login, this.form.data.password, xhr => {
					if (xhr.status === 'ok') {
						router.go('/');

						auth.authorize();

						this.form.get().reset();
						this.form.message.clean();
					} else {
						this.form.message.showMessage('Неверный логин или пароль!');
					}
				});
			}
		})

		this.render();
	}

	render() {
		this.get().appendChild(this.padd.get());
		this.padd.get().appendChild(this.form.get());
	}
}
