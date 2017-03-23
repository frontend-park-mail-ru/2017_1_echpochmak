'use strict';

(function () {

	const UserService = window.UserService;

	class Authorize {
		constructor() {
			if (Authorize.__instance) {
				return Authorize.__instance;
			}

			this.service = new UserService();
			this.router = new Router();
			this.anonym_user = 'Гость';
			
			this.showForGuest();

			this.service.getUsername(xhr => {
				if (xhr.login) {
					this.showForUser(xhr.login);
				} else {
					this.showForGuest();
				}
			});

			Authorize.__instance = this;
		}

		authorize() {
			this.service.getUsername(xhr => {
				if (xhr.status === 'ok') {
					this.showForUser(xhr.login);
				}
			});
		}

		deauthorize() {
			this.service.logout(xhr => {
				this.showForGuest();
			});
		}

		showForUser(user) {
			this.router.loginSwitch(user);
		}

		showForGuest() {
			this.router.unloginSwitch(this.anonym_user);
		}
	}

	window.Authorize = Authorize;

})();
