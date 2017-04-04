'use strict';

import BaseView from './baseview.js'
import BaseBlock from '../components/BaseBlock/baseblock.js'
import LoginForm from '../components/LoginForm/loginform.js'

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

		this.render();
	}

	render() {
		this.get().appendChild(this.padd.get());
		this.padd.get().appendChild(this.form.get());
	}
}
