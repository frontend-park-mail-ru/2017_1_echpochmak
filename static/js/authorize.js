'use strict';

(function() = {

	const Authorize = {

		anonym_user: 'Гость',
		authorized_block: document.querySelectorAll('.authorized'),
		no_authorized_block: document.querySelectorAll('.no-authorized'),
		username_block: greeting.querySelector('.username'),

		// const login_form = login.querySelector('form');
		// const registration_form = registration.querySelector('form');

		// const button_exit = document.querySelector('.exit-button');

		authorized_block.forEach( (item, i, arr) => {
				item.hidden = true;
			});

		const authorize = (username) => {

			no_authorized_block.forEach( (item, i, arr) => {
				item.hidden = true;
			});

			authorized_block.forEach( (item, i, arr) => {
				item.hidden = false;
			});

			username_block.textContent = username;
		}

		const deauthorize = () => {
			
			authorized_block.forEach( (item, i, arr) => {
				item.hidden = true;
			});

			no_authorized_block.forEach( (item, i, arr) => {
				item.hidden = false;
			});

			username_block.textContent = anonym_user;
		}

		// registration_form.addEventListener('submit', () => {
		// 	event.preventDefault();

		// 	if (validate_registration()) {
		// 		registration.hidden = true;
		// 		back.hidden = true;
		// 		menu.hidden = false;
		// 		greeting.hidden = false;

		// 		document.body.background = green_background;

		// 		let user = registration_form.querySelector('.login-input input').value;
		// 		authorize(user);

		// 		registration_form.reset();
		// 	}
		// });

		// login_form.addEventListener('submit', () => {
		// 	event.preventDefault();

		// 	if(validate_login()) {

		// 		login.hidden = true;
		// 		back.hidden = true;
		// 		menu.hidden = false;
		// 		greeting.hidden = false;

		// 		document.body.background = green_background;

		// 		let user = login_form.querySelector('.login-input input').value;
		// 		authorize(user);

		// 		login_form.reset();
		// 	}
		// });

		// button_exit.addEventListener('click', () => {
		// 	event.preventDefault();
		// 	deauthorize();
		// });
	};

})();