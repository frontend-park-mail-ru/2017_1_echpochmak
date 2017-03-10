(function () {

	'use strict';

	const BaseView = window.BaseView;
	const BaseBlock = window.BaseBlock;

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
			this.cnt = new BaseBlock('span', {});
			this.cnt.get().innerHTML = 'Добро пожаловать в одиночную игру!';

			this.render();
		}

		render() {
			this.get().appendChild(this.padd.get());
			this.padd.get().appendChild(this.list.get());
			this.list.get().appendChild(this.cnt.get());
		}
	}

	window.SinglePlayer = SinglePlayer;

})();
