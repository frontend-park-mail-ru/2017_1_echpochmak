'use strict';

(function() {

	// const anonym_user = 'Гость';
	// const authorized_block = document.querySelectorAll('.authorized');
	// const no_authorized_block = document.querySelectorAll('.no-authorized');
	// // const username_block = Main.pages.menu.greeting.username.get();
	// const username_block = document.querySelector('.username');

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
		},

		deauthorize: function() {
			
			this.authorized_block.forEach( (item, i, arr) => {
				item.hidden = true;
			});

			this.no_authorized_block.forEach( (item, i, arr) => {
				item.hidden = false;
			});

			this.username_block.textContent = this.anonym_user;
		}
	};

	window.Authorize = Authorize;

})();