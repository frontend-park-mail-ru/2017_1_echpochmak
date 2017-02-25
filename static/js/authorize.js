'use strict';

const anonym_user = 'Гость';

const authorized_block = document.getElementsByClassName('authorized')[0];
const no_authorized_block = document.getElementsByClassName('no-authorized')[0];
const username_block = greeting.getElementsByClassName('username')[0];

const login_form = login.getElementsByTagName('form')[0];
const registration_form = registration.getElementsByTagName('form')[0];

const button_exit = document.getElementsByClassName('exit-button')[0];

authorized_block.hidden = true;

let is_authorized = false;

registration_form.addEventListener('submit', function() {
	event.preventDefault();

	registration.hidden = true;
	back.hidden = true;
	menu.hidden = false;
	greeting.hidden = false;
	no_authorized_block.hidden = true;
	authorized_block.hidden = false;

	document.body.background = './img/back_green.jpg';

	is_authorized = true;
	let user = registration_form.getElementsByClassName('login-input')[0].value;
	username_block.textContent = user;
});

login_form.addEventListener('submit', function() {
	event.preventDefault();

	login.hidden = true;
	back.hidden = true;
	menu.hidden = false;
	greeting.hidden = false;
	no_authorized_block.hidden = true;
	authorized_block.hidden = false;

	document.body.background = './img/back_green.jpg';

	is_authorized = true;
	let user = login_form.getElementsByClassName('login-input')[0].value;
	username_block.textContent = user;
});

button_exit.addEventListener('click', function() {
	event.preventDefault();

	authorized_block.hidden = true;
	no_authorized_block.hidden = false;
	is_authorized = false;

	username_block.textContent = anonym_user;
});