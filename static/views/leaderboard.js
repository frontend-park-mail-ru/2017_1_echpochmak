(function () {

	'use strict';

	class LeaderBoard extends BaseView {
		constructor() {
			super('div', {
				'class': 'leaderboard'
			});
			this.list = new BaseBlock('div', {
				'class': 'list'
			});
			this.header = new BaseBlock('div', {
				'class': 'list-header', 
				'align': 'center'
			});
			this.header.get().innerHTML = 'Доска почета';

			this.render();
		}

		render() {
			this.get().appendChild(this.list.get());
			this.list.get().appendChild(this.header.get());
		}
	}

	window.LeaderBoard = LeaderBoard;

})();
