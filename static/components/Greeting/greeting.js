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
			class: 'greeting__text-block'
		});
		this.entryBy = new BaseBlock('h3', {
			class: 'greeting__text'
		});
		this.entryBy.get().innerHTML = 'Вы вошли как ';
		this.username = new BaseBlock('h2', {
			class: 'greeting__text username'
		});
		this.username.get().innerHTML = name;
		this.noAuth = new BaseBlock('div', {
			align: 'right',
			class: 'greeting__button-block no-authorized'
		});
		this.auth = new BaseBlock('div', {
			align: 'right',
			class: 'greeting__button-block authorized'
		});
		this.registerButton = new Link('Регистрация', {
			class: 'greeting__button'
		});
		this.loginButton = new Link('Вход', {
			class: 'greeting__button'
		});
		this.exitButton = new Link('Выйти', {
			class: 'greeting__button'
		});

		this.render();
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
}
