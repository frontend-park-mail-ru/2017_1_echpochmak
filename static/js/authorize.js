'use strict';

(function() {

	const Authorize = {

		init: function() {
			this.anonym_user = 'Гость';
			this.authorized_blocks = [
				Main.pages.menu.greeting.auth.get(),
				Main.pages.multi.auth.get()
			]
			this.no_authorized_blocks = [
				Main.pages.menu.greeting.noAuth.get(),
				Main.pages.multi.noAuth.get()
			]
			this.username_block = Main.pages.menu.greeting.username.get();
			// this.username_block = document.querySelector('.username');

			this.deauthorize();
		},

		authorize: function(username) {

			this.no_authorized_blocks.forEach( (item, i, arr) => {
				item.hidden = true;
			});

			this.authorized_blocks.forEach( (item, i, arr) => {
				item.hidden = false;
			});

			this.username_block.textContent = username;
		},

		deauthorize: function() {
			
			this.authorized_blocks.forEach( (item, i, arr) => {
				item.hidden = true;
			});

			this.no_authorized_blocks.forEach( (item, i, arr) => {
				item.hidden = false;
			});

			this.username_block.textContent = this.anonym_user;
		}
	};

	window.Authorize = Authorize;

})();