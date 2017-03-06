(function () {

	'use strict';

	class Menu extends BaseBlock {
		constructor() {
			super('div', {
				'class': 'menu'
			});
			this.padd = new BaseBlock('div', {
				'class': 'padd',
				'align': 'center'
			});
			this.bl1 = new BaseBlock('div', {
				'class': 'bl',
				'align': 'center'
			});
			this.bl2 = new BaseBlock('div', {
				'class': 'bl',
				'align': 'center'
			});
			this.singleButton = new MenuButton('Одиночная игра', {
				'id': 'ruby',
				'class': 'single-button'
			});
			this.multiButton = new MenuButton('Мультиплеер', {
				'id': 'saph',
				'class': 'multi-button'
			});
			this.aboutButton = new MenuButton('Об игре', {
				'id': 'izum',
				'class': 'about-button'
			});
			this.leaderButton = new MenuButton('Лидеры', {
				'id': 'bril',
				'class': 'leaderboard-button'
			});
			this.greeting = new Greeting('Гость');

			this.render();
			this.makeListeners();
		}

		render() {
			this.get().appendChild(this.padd.get());
			this.padd.get().appendChild(this.bl1.get());
			this.padd.get().appendChild(this.bl2.get());
			this.bl1.get().appendChild(this.singleButton.get());
			this.bl1.get().appendChild(this.multiButton.get());
			this.bl2.get().appendChild(this.aboutButton.get());
			this.bl2.get().appendChild(this.leaderButton.get());
			this.get().appendChild(this.greeting.get());
		}

		makeListeners() {

			this.singleButton.on('click', () => {
				event.preventDefault();

				Main.pages['menu'].get().hidden = true;
				Main.pages['single'].get().hidden = false;
				Main.pages['back'].get().hidden = false;
			})

			this.multiButton.on('click', () => {
				event.preventDefault();

				Main.pages['menu'].get().hidden = true;
				Main.pages['multi'].get().hidden = false;
				Main.pages['back'].get().hidden = false;
			})

			this.aboutButton.on('click', () => {
				event.preventDefault();

				Main.pages['menu'].get().hidden = true;
				Main.pages['about'].get().hidden = false;
				Main.pages['back'].get().hidden = false;
			})

			this.leaderButton.on('click', () => {
				event.preventDefault();

				Main.pages['menu'].get().hidden = true;
				Main.pages['leaderboard'].hidden = false;
				Main.pages['back'].get().hidden = false;
			})
		}
	}

	window.Menu = Menu;

})();
