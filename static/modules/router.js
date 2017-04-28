'use strict'

export default
class Router {

	constructor() {

		if (Router.__instance) {
			return Router.__instance;
		}

		this.routes = {};
		this.activeRoute = null;
		this.loginned = false;
		this.user = {
			username: '',
			score: 0
		}

		this.history = window.history;

		Router.__instance = this;
	}

	register(route, view) {
		this.routes[route] = view;
	}

	_getViewByRoute(href) {
		return this.routes[href];
	}   

	start() {
		window.onpopstate = () => {
			this.onroute(window.location.pathname);
		}
		
		this.onroute(window.location.pathname);
	}

	go(path) {
		if (this.onroute(path)) {
			window.history.pushState({ page: 1 }, 'Title 1', path);
		}
	}

	onroute(path) {

		let view = this._getViewByRoute(path);

		if (!view) {
			return false;
		}

		if (this.currentView === view) {
			return true;
		}

		if (this.currentView) {
			this.currentView.hide();
		}

		view.show();
		this.currentView = view;

		if (this.loginned) {
			this.loginSwitch(this.user)
		} else {
			this.unloginSwitch(this.user)
		}

		return true;
	}

	loginSwitch(user) {
		this.currentView.loginSwitch(user.username);
		this.loginned = true;
		this.user = user;
	}

	unloginSwitch(user) {
		this.currentView.unloginSwitch(user.username);
		this.loginned = false;
		this.user = user;
	}
}
