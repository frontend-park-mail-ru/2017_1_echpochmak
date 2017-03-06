(function () {

	'use strict';

	class Back extends BaseBlock {
		constructor() {
			super('div', {
				'class': 'back',
				'align': 'right'
			});
			this.link = new Link('', {
				'class': 'back-button'
			});
			this.image = new BaseBlock('img', {
				'src': './img/back.png'
			})
			this.text = new BaseBlock('p');
			this.text.get().innerHTML = 'Обратно в меню';

			this.render();
			this.makeListeners();
		}

		render() {
			this.get().appendChild(this.link.get());
			this.link.get().appendChild(this.image.get());
			this.get().appendChild(this.text.get());
		}

		makeListeners() {

			this.link.on('click', () => {
				event.preventDefault();

				Main.pages['menu'].get().hidden = false;
				Main.pages['register'].get().hidden = true;
				Main.pages['login'].get().hidden = true;
				Main.pages['single'].get().hidden = true;
				Main.pages['multi'].get().hidden = true;
				Main.pages['about'].get().hidden = true;
				Main.pages['leaderboard'].hidden = true;
				Main.pages['back'].get().hidden = true;

				document.body.background = Main.green_background;
			})
		}
	}

	window.Back = Back;

})();
