'use strict';

(function() {

	const Authorize = {

		init: function() {
			this.anonym_user = 'Гость';
			this.authorized_block = document.querySelectorAll('.authorized');
			this.no_authorized_block = document.querySelectorAll('.no-authorized');
			// const username_block = Main.pages.menu.greeting.username.get();
			this.username_block = document.querySelector('.username');

			this.deauthorize();
		},

		authorize: function(username) {

			this.no_authorized_block.forEach( (item, i, arr) => {
				item.hidden = true;
			});

			this.authorized_block.forEach( (item, i, arr) => {
				item.hidden = false;
			});

			this.username_block.textContent = username;

			Main.pages.multi.noAuth.get().hidden = true;
			Main.pages.multi.auth.get().hidden = false;
		},

		deauthorize: function() {
			
			this.authorized_block.forEach( (item, i, arr) => {
				item.hidden = true;
			});

			this.no_authorized_block.forEach( (item, i, arr) => {
				item.hidden = false;
			});

			this.username_block.textContent = this.anonym_user;

			Main.pages.multi.auth.get().hidden = true;
			Main.pages.multi.noAuth.get().hidden = false;
		}
	};

	window.Authorize = Authorize;

})();