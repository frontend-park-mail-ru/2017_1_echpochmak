(function () {

	'use strict';

	class LeaderBoard extends BaseBlock {
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

			this.render();
		}

		render() {
			this.get().appendChild(this.padd.get());
			this.padd.get().appendChild(this.form.get());
		}
	}

	window.LeaderBoard = LeaderBoard;

})();
