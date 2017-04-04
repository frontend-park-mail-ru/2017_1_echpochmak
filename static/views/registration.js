'use strict';

import BaseView from './baseview.js'
import BaseBlock from '../components/BaseBlock/baseblock.js'
import RegisterForm from '../components/RegisterForm/registerform.js'

export default
class Register extends BaseView {
	constructor() {
		super('div', {
			class: 'registration'
		});
		this.background = this.white_background;
		
		this.padd = new BaseBlock('div', {
			class: 'padd'
		});
		this.form = new RegisterForm();

		this.render();
	}

	render() {
		this.get().appendChild(this.padd.get());
		this.padd.get().appendChild(this.form.get());
	}
}
