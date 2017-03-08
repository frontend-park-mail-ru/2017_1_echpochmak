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
			this.header.get().innerHTML = 'Лучшие игроки';
			this.subheader = new BaseBlock('div', {
				'class': 'line row list-sub-header'
			})
			this.rating = new BaseBlock('div', {
				'class': 'col-xs-3 col-sm-3 col-md-3 col-lg-3',
				'align': 'center'
			});
			this.name = new BaseBlock('div', {
				'class': 'col-xs-6 col-sm-6 col-md-6 col-lg-6',
				'align': 'center'
			});
			this.score = new BaseBlock('div', {
				'class': 'col-xs-3 col-sm-3 col-md-3 col-lg-3',
				'align': 'center'
			});
			this.rating.get().innerHTML = 'Рейтинг';
			this.name.get().innerHTML = 'Имя';
			this.score.get().innerHTML = 'Результат';

			this.render();
		}

		render() {
			this.get().appendChild(this.list.get());
			this.list.get().appendChild(this.header.get());
			this.list.get().appendChild(this.subheader.get());
			this.subheader.get().appendChild(this.rating.get());
			this.subheader.get().appendChild(this.name.get());
			this.subheader.get().appendChild(this.score.get());
		}
	}

	window.LeaderBoard = LeaderBoard;

})();
