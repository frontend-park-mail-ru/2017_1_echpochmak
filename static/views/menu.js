'use strict';

import BaseView from './baseview.js'
import BaseBlock from '../components/BaseBlock/baseblock.js'
import MenuButton from '../components/MenuButton/menubutton.js'
import Greeting from '../components/Greeting/greeting.js'
import Router from '../modules/router.js'

export default
class Menu extends BaseView {
	constructor() {
		super('div', {
			class: 'menu'
		});
		this.padd = new BaseBlock('div', {
			class: 'padd',
			align: 'center'
		});
		this.line1 = new BaseBlock('div', {
			class: 'line',
			align: 'center'
		});
		this.line2 = new BaseBlock('div', {
			class: 'line',
			align: 'center'
		});
		this.singleButton = new MenuButton('Одиночная игра', {
			class: 'ruby single-button'
		});
		this.multiButton = new MenuButton('Мультиплеер', {
			class: 'saph multi-button'
		});
		this.aboutButton = new MenuButton('Об игре', {
			class: 'izum about-button'
		});
		this.leaderButton = new MenuButton('Лидеры', {
			class: 'bril leaderboard-button'
		});
		this.greeting = new Greeting('Гость');

		this.render();
		this.makeListeners();
	}

	render() {
		this.get().removeChild(this.back.get());

		this.get().appendChild(this.padd.get());
		this.padd.get().appendChild(this.line1.get());
		this.padd.get().appendChild(this.line2.get());
		this.line1.get().appendChild(this.singleButton.get());
		this.line1.get().appendChild(this.multiButton.get());
		this.line2.get().appendChild(this.aboutButton.get());
		this.line2.get().appendChild(this.leaderButton.get());
		this.get().appendChild(this.greeting.get());
	}

	makeListeners() {

		const router = new Router();

		this.singleButton.on('click', () => {
			event.preventDefault();
			router.go('/game/');
		});

		this.multiButton.on('click', () => {
			event.preventDefault();
			router.go('/multiplayer/');
		});

		this.aboutButton.on('click', () => {
			event.preventDefault();
			router.go('/about/');
		});

		this.leaderButton.on('click', () => {
			event.preventDefault();
			router.go('/leaders/');
		});
	}

	loginSwitch(name) {
		this.greeting.username.get().textContent = name;
		this.greeting.noAuth.get().hidden = true;
		this.greeting.auth.get().hidden = false;
	}

	unloginSwitch(name) {
		this.greeting.username.get().textContent = name;
		this.greeting.auth.get().hidden = true;
		this.greeting.noAuth.get().hidden = false;
	}
}
