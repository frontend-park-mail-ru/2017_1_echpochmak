(function () {

	'use strict';

	class LeaderBoard extends BaseView {
		constructor() {
			super('div', {
				'class': 'leaderboard'
			});
			this.list = new BaseBlock('div', {
				'class': 'list'
			})
			this.render();
		}

		render() {
			this.get().appendChild(this.list.get());

			this.template = window.fest['leaderboard.tmpl'];
			this.list.get().innerHTML = this.template({});
		}

		show() {
			document.querySelector('body').appendChild(this.get());
			this.update();
		}

		update() {
			const service = new UserService();
			service.getUsersList(xhr => {
				this.list.get().innerHTML = this.template(xhr);
			})
		}
	}

	window.LeaderBoard = LeaderBoard;

})();
