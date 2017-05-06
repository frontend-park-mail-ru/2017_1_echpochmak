'use strict';

import BaseView from './baseview.js'
import BaseBlock from '../components/BaseBlock/baseblock.js'
import UserService from '../services/userservice.js'

export default
class LeaderBoard extends BaseView {
	constructor() {
		super('div', {
			class: 'leaderboard'
		});
		this.list = new BaseBlock('div', {
			class: 'list'
		});
		this.render();
	}

	render() {
		this.get().appendChild(this.list.get());

		this.template = window.fest['leaderboard.tmpl'];
		this.list.get().innerHTML = this.template({});
	}

	show() {
		super.show();
		this.update();
	}

	update() {
		const service = new UserService();
		service.getUsersList(xhr => {
			this.list.get().innerHTML = this.template(xhr);
		});
	}
}
