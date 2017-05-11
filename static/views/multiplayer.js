// 'use strict';

// import BaseView from './baseview.js'
// import BaseBlock from '../components/BaseBlock/baseblock.js'
// import MultiStrategy from '../game/strategies/multi_strategy.js'
// import GameManager from '../game/manager.js'
// import Mediator from '../game/mediator.js'
// import Router from '../modules/router.js'
// import Events from '../game/events.js'

// export default
// class MultiPlayer extends BaseView {
// 	constructor() {
// 		super('div', {
// 			class: 'multiplayer'
// 		});

// 		this.gameManager = new GameManager(new MultiStrategy());
// 		// this.gameManager.start();

// 		this.padd = new BaseBlock('div', {
// 			class: 'padd'
// 		});
// 		this.list = new BaseBlock('div', {
// 			class: 'list',
// 			align: 'center'
// 		});
// 		this.auth = new BaseBlock('span', {
// 			class: 'authorized'
// 		});
// 		this.noAuth = new BaseBlock('span', {
// 			class: 'no-authorized'
// 		});
// 		this.auth.get().innerHTML = 'Добро пожаловать в мультиплеер!';
// 		this.noAuth.get().innerHTML = 'Мультиплеер доступен только зарегистрированным пользователям';

// 		this.render();
// 	}

// 	render() {
// 		this.get().appendChild(this.padd.get());
// 		this.padd.get().appendChild(this.list.get());
// 		this.list.get().appendChild(this.noAuth.get());
// 		this.list.get().appendChild(this.auth.get());
// 	}

// 	loginSwitch(name) {
// 		this.noAuth.get().hidden = true;
// 		this.auth.get().hidden = false;
// 	}

// 	unloginSwitch(name) {
// 		this.auth.get().hidden = true;
// 		this.noAuth.get().hidden = false;
// 	}

// 	show() {
// 		super.show();
// 		this.gameManager.start();
// 	}
// }
