'use strict';

const anonym_user = 'Гость';

const authorized_block = greeting.querySelector('.authorized');
const no_authorized_block = greeting.querySelector('.no-authorized');
const username_block = greeting.querySelector('.username');

const login_form = login.querySelector('form');
const registration_form = registration.querySelector('form');

const button_exit = document.querySelector('.exit-button');

authorized_block.hidden = true;

let is_authorized = false;

registration_form.addEventListener('submit', () => {
	event.preventDefault();

	if (validate_registration()) {
		registration.hidden = true;
		back.hidden = true;
		menu.hidden = false;
		greeting.hidden = false;
		no_authorized_block.hidden = true;
		authorized_block.hidden = false;

		document.body.background = green_background;

		is_authorized = true;
		let user = registration_form.querySelector('.login-input input').value;
		username_block.textContent = user;

		registration_form.reset();
	}
});

login_form.addEventListener('submit', () => {
	event.preventDefault();

	if(validate_login()) {

		login.hidden = true;
		back.hidden = true;
		menu.hidden = false;
		greeting.hidden = false;
		no_authorized_block.hidden = true;
		authorized_block.hidden = false;

		document.body.background = green_background;

		is_authorized = true;
		let user = login_form.querySelector('.login-input input').value;
		username_block.textContent = user;

		login_form.reset();
	}
});

button_exit.addEventListener('click', () => {
	event.preventDefault();

	authorized_block.hidden = true;
	no_authorized_block.hidden = false;
	is_authorized = false;

	username_block.textContent = anonym_user;
});