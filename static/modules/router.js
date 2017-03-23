(function () {

	class Router {

		constructor() {

			if (Router.__instance) {
				return Router.__instance;
			}

			this.routes = {};
			this.activeRoute = null;
			this.loginned = false;
			this.username = '';

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
				this.go(window.location.pathname);
			}
			
			this.go(window.location.pathname);
		}

		go(path) {

			let view = this._getViewByRoute(path);

			if (!view) {
				return false;
			}

			if (this.currentView === view) {
				return true;
			}

			window.history.pushState({ page: 1 }, 'Title 1', path);

			if (this.currentView) {
				this.currentView.hide();
			}

			view.show();
			this.currentView = view;

			if (this.loginned) {
				this.loginSwitch(this.username)
			} else {
				this.unloginSwitch(this.username)
			}

			return true;
		}

		loginSwitch(name) {
			this.currentView.loginSwitch(name);
			this.loginned = true;
			this.username = name;
		}

		unloginSwitch(name) {
			this.currentView.unloginSwitch(name);
			this.loginned = false;
			this.username = name;
		}
	}

	window.Router = Router;

})();
