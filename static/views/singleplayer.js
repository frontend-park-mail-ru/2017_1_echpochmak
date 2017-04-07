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

		this.render();
		this.makeListeners();
	}

	makeListeners() {
		this.newGame.on('click', () => {
			this.get().removeChild(this.padd.get());
			const konva = new BaseBlock('div', {
				id: 'konva'
			});
			this.get().appendChild(konva.get());
			const strategy = new SingleStrategy();
		})
	}

	render() {
		this.get().appendChild(this.padd.get());
		this.padd.get().appendChild(this.list.get());
		this.list.get().appendChild(this.newGame.get());
	}
}
