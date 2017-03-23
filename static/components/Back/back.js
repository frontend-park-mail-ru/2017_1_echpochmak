(function () {

	'use strict';

	const BaseBlock = window.BaseBlock;
	// const Main = window.Main;

	class Back extends BaseBlock {
		constructor(page) {
			super('div', {
				class: 'back',
				align: 'right'
			});
			this.link = new Link('', {
				class: 'back-button'
			});
			this.image = new BaseBlock('img', {
				src: './img/back.png'
			});
			this.text = new BaseBlock('p');
			this.text.get().innerHTML = 'Обратно в меню';

			this.render();
			this.makeListeners(page);
		}

		render() {
			this.get().appendChild(this.link.get());
			this.link.get().appendChild(this.image.get());
			this.get().appendChild(this.text.get());
		}

		makeListeners(page) {

			const router = new Router();

			this.link.on('click', () => {
				event.preventDefault();
				router.go('/');
			});
		}
	}

	window.Back = Back;

})();
