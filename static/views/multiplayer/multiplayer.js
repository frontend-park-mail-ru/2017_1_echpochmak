'use strict';

import BaseView from '../baseview.js'
import BaseBlock from '../../components/BaseBlock/baseblock.js'
import MultiPlayerStart from './start.js'
import SinglePlayerGame from '../singleplayer/game.js'
// import SingleStrategy from '../../game/strategies/single_strategy.js'
import MultiStrategy from '../../game/strategies/multi_strategy.js'
import GameManager from '../../game/manager.js'
import Mediator from '../../game/mediator.js'
import Router from '../../modules/router.js'
import Events from '../../game/events.js'

export default
class MultiPlayer extends BaseView {
	constructor() {
		super('div', {
			class: 'multiplayer'
		});
		
		this.get().removeChild(this.back.get());

		// this.startSubView = new MultiPlayerStart();
		this.gameSubView = new SinglePlayerGame();

		this.router = new Router();
		this.mediator = new Mediator();

		this.render();

		this.mediator.subscribe(Events.GAME_START, this.onStartGame.bind(this));
		this.mediator.subscribe(Events.QUIT_CONFIRMED, this.onQuitConfirm.bind(this));
		this.mediator.subscribe(Events.EXIT_TO_MENU, this.onExit.bind(this));
	}

	onStartGame() {
		// this.get().removeChild(this.startSubView.get());
		// this.get().appendChild(this.gameSubView.get());
		
		this.mediator.emit(Events.PLAY_NEW_GAME);
	}

	onQuitConfirm() {
		// this.get().removeChild(this.gameSubView.get());
		// this.get().appendChild(this.startSubView.get());
	}

	onExit() {
		this.router.go('/');
	}

	render() {
		this.get().appendChild(this.gameSubView.get());
	}

	loginSwitch(user) {
		this.gameSubView.loginSwitch(user);
	}

	unloginSwitch(user) {
		this.gameSubView.unloginSwitch(user);
	}

	show() {
		super.show();
		this.gameManager = new GameManager();
		this.gameManager.setStrategy(new MultiStrategy());
		this.mediator.emit(Events.PLAY_NEW_GAME);
	}
}
