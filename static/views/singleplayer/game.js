'use strict';

import BaseView from '../baseview.js'
import BaseBlock from '../../components/BaseBlock/baseblock.js'
import Mediator from '../../game/mediator.js'
import Events from '../../game/events.js'
import Authorize from '../../services/authorize.js'

export default
class SinglePlayerGame extends BaseView {
	constructor() {
		super('div', {
			class: 'singleplayer__game'
		});
		
		this.mediator = new Mediator();

		this.get().removeChild(this.back.get());

		this.leftBar = new BaseBlock('div', {
			class: 'col-xs-3 col-sm-3 col-md-3 col-lg-3 left-bar',
			align: 'center'
		});
		this.gameField = new BaseBlock('div', {
			class: 'col-xs-6 col-sm-6 col-md-6 col-lg-6 game-field',
			id: 'game-field'
		});
		this.hints = new BaseBlock('div', {
			class: 'col-xs-3 col-sm-3 col-md-3 col-lg-3 hints-field',
			id: 'hints-field'
		});

		this.createLeftBar();
		this.createQuitWindow();
		this.createFinishWindow();

		this.render();
		this.makeListeners();
	}

	createLeftBar() {
		this.quitBlock = new BaseBlock('div', {
			class: 'left-bar__quit',
			align: 'center'
		});
		this.quitButton = new BaseBlock('button');
		this.quitButton.get().innerHTML = 'Выйти';
		this.userBlock = new BaseBlock('div', {
			class: 'left-bar__user',
			align: 'center'
		});

		this.userBlock_username = new BaseBlock('div');
		this.userBlock_username_title = new BaseBlock('b');
		this.userBlock_username_text = new BaseBlock('span');
		this.userBlock_username_title.get().innerHTML = 'Игрок: '
		this.userBlock_score = new BaseBlock('div');
		this.userBlock_score_title = new BaseBlock('b');
		this.userBlock_score_text = new BaseBlock('span');
		this.userBlock_score_title.get().innerHTML = 'Результат: '
		this.userBlock_score_text.get().innerHTML = '0'
		this.HPBlock = new BaseBlock('div', {
			class: 'left-bar__HP'
		})
		this.HPBlock.get().innerHTML = 'HP: 100%'
	}

	createQuitWindow() {
		this.quitConfirm = new BaseBlock('div', {
			class: 'quit-confirm',
			align: 'center'
		})
		this.quitText = new BaseBlock('div', {
			class: 'quit-confirm__text'
		})
		this.quitButtons = new BaseBlock('div', {
			class: 'quit-confirm__buttons'
		})
		this.quitText.get().innerHTML = 'Точно выйти?';
		this.quitConfirmButton = new BaseBlock('button');
		this.quitConfirmButton.get().innerHTML = 'Точно выйти';
		this.quitCancelButton = new BaseBlock('button');
		this.quitCancelButton.get().innerHTML = 'Нет, не точно';
	}

	createFinishWindow() {
		this.finishWindow = new BaseBlock('div', {
			class: 'finish'
		})
		this.finishText = new BaseBlock('div', {
			class: 'finish__text'
		})
		this.finishText.get().innerHTML = 'Игра окончена! Вы молодец!';
		this.finishButtons = new BaseBlock('div', {
			class: 'finish__buttons'
		})
		this.exitButton = new BaseBlock('button');
		this.exitButton.get().innerHTML = 'Выйти в меню';
		this.againButton = new BaseBlock('button');
		this.againButton.get().innerHTML = 'Начать сначала';
	}

	makeListeners() {

		this.mediator.subscribe(Events.GAME_FINISHED, () => {
			this.get().appendChild(this.finishWindow.get());
		})

		this.quitButton.on('click', () => {
			this.get().appendChild(this.quitConfirm.get());
		})

		this.quitCancelButton.on('click', () => {
			this.get().removeChild(this.quitConfirm.get());
		})

		this.quitConfirmButton.on('click', () => {
			this.get().removeChild(this.quitConfirm.get());
			this.mediator.emit(Events.QUIT_CONFIRMED);
		})

		this.exitButton.on('click', () => {
			this.get().removeChild(this.finishWindow.get());
			this.mediator.emit(Events.EXIT_TO_MENU);
		})

		this.againButton.on('click', () => {
			this.get().removeChild(this.finishWindow.get());
			this.mediator.emit(Events.PLAY_AGAIN);
		})
	}

	render() {
		this.get().appendChild(this.leftBar.get());
		this.get().appendChild(this.gameField.get());
		this.get().appendChild(this.hints.get());

		this.leftBar.get().appendChild(this.quitBlock.get());
		this.leftBar.get().appendChild(this.userBlock.get());
		this.leftBar.get().appendChild(this.HPBlock.get());

		this.userBlock.get().appendChild(this.userBlock_username.get());
		this.userBlock.get().appendChild(this.userBlock_score.get());
		this.userBlock_username.get().appendChild(this.userBlock_username_title.get());
		this.userBlock_username.get().appendChild(this.userBlock_username_text.get());
		this.userBlock_score.get().appendChild(this.userBlock_score_title.get());
		this.userBlock_score.get().appendChild(this.userBlock_score_text.get());

		this.quitBlock.get().appendChild(this.quitButton.get());

		this.quitConfirm.get().appendChild(this.quitText.get());
		this.quitConfirm.get().appendChild(this.quitButtons.get());
		this.quitButtons.get().appendChild(this.quitConfirmButton.get());
		this.quitButtons.get().appendChild(this.quitCancelButton.get());

		this.finishWindow.get().appendChild(this.finishText.get());
		this.finishWindow.get().appendChild(this.finishButtons.get());
		this.finishButtons.get().appendChild(this.exitButton.get());
		this.finishButtons.get().appendChild(this.againButton.get());
	}

	loginSwitch(user) {
		this.userBlock_username_text.get().innerHTML = user;
	}

	unloginSwitch(user) {
		this.loginSwitch(user);
	}
}
