'use strict';

import BaseView from './baseview.js'
import BaseBlock from '../components/BaseBlock/baseblock.js'
import SingleStrategy from '../game/strategy.js'

export default
class SinglePlayer extends BaseView {
	constructor() {
		super('div', {
			class: 'singleplayer'
		});
		this.padd = new BaseBlock('div', {
			class: 'padd'
		});
		this.list = new BaseBlock('div', {
			class: 'list',
			align: 'center'
		});
		this.newGame = new BaseBlock('button', {
			align: 'center'
		});
		this.newGame.get().innerHTML = 'Начать игру';

		this.leftBar = new BaseBlock('div', {
			class: 'col-xs-3 col-sm-3 col-md-3 col-lg-3 left-bar'
		});
		this.gameField = new BaseBlock('div', {
			class: 'col-xs-6 col-sm-6 col-md-6 col-lg-6 game-field',
			id: 'game-field'
		});
		this.hints = new BaseBlock('div', {
			class: 'col-xs-3 col-sm-3 col-md-3 col-lg-3 hints-field',
			id: 'hints-field'
		})

		this.render();
		this.makeListeners();
	}

	makeListeners() {
		this.newGame.on('click', (event) => {
			event.preventDefault();

			this.get().removeChild(this.back.get());
			this.get().removeChild(this.padd.get());
			this.get().appendChild(this.leftBar.get());
			this.get().appendChild(this.gameField.get());
			this.get().appendChild(this.hints.get());
			const strategy = new SingleStrategy();
		})
	}

	render() {
		this.get().appendChild(this.padd.get());
		this.padd.get().appendChild(this.list.get());
		this.list.get().appendChild(this.newGame.get());
	}
}
