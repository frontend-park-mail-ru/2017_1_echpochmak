'use strict';

import BaseBlock from '../BaseBlock/baseblock.js'
import Link from '../Link/link.js'
import Authorize from '../../services/authorize.js'
import Router from '../../modules/router.js'

export default
class Greeting extends BaseBlock {
	constructor(name) {
		super('div', {
			class: 'greeting'
		});
		this.greetingBlock = new BaseBlock('div', {
			align: 'right',
			class: 'divtxt'
		});
		this.entryBy = new BaseBlock('h3', {
			class: 'txt'
		});
		this.entryBy.get().innerHTML = 'Вы вошли как ';
		this.username = new BaseBlock('h2', {
			class: 'txt username'
		});
		this.username.get().innerHTML = name;
		this.noAuth = new BaseBlock('div', {
			align: 'right',
			class: 'divbut no-authorized'
		});
		this.auth = new BaseBlock('div', {
			align: 'right',
			class: 'divbut authorized'
		});
		this.registerButton = new Link('Регистрация', {
			class: 'button registration-button'
		});
		this.loginButton = new Link('Вход', {
			class: 'button login-button'
		});
		this.exitButton = new Link('Выйти', {
			class: 'button exit-button'
		});

		this.render();
		this.makeListeners();
	}

	render() {
		this.get().appendChild(this.greetingBlock.get());
		this.greetingBlock.get().appendChild(this.entryBy.get());
		this.greetingBlock.get().appendChild(this.username.get());
		this.get().appendChild(this.noAuth.get());
		this.get().appendChild(this.auth.get());
		this.noAuth.get().appendChild(this.registerButton.get());
		this.noAuth.get().appendChild(this.loginButton.get());
		this.auth.get().appendChild(this.exitButton.get());
	}

	makeListeners() {

		const router = new Router();

		this.loginButton.on('click', () => {
			event.preventDefault();
			router.go('/login/');
		});

		this.registerButton.on('click', () => {
			event.preventDefault();
			router.go('/register/');
		});

		this.exitButton.on('click', () => {
			event.preventDefault();

			const auth = new Authorize();
			auth.deauthorize();
		});
	}
}
