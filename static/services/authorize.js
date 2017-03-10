'use strict';

(function () {

	const UserService = window.UserService;

	class Authorize {
		constructor() {
			if (Authorize.__instance) {
				return Authorize.__instance;
			}

			this.service = new UserService();

			this.anonym_user = 'Гость';
			this.authorized_blocks = [
				Main.pages.menu.greeting.auth.get(),
				Main.pages.multi.auth.get()
			];
			this.no_authorized_blocks = [
				Main.pages.menu.greeting.noAuth.get(),
				Main.pages.multi.noAuth.get()
			];
			this.username_block = Main.pages.menu.greeting.username.get();

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
				if (xhr.login) {
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
			this.no_authorized_blocks.forEach((item, i, arr) => {
				item.hidden = true;
			});

			this.authorized_blocks.forEach((item, i, arr) => {
				item.hidden = false;
			});

			this.username_block.textContent = user;
		}

		showForGuest() {
			this.authorized_blocks.forEach((item, i, arr) => {
				item.hidden = true;
			});

			this.no_authorized_blocks.forEach((item, i, arr) => {
				item.hidden = false;
			});

			this.username_block.textContent = this.anonym_user;
		}
	}

	window.Authorize = Authorize;

})();
