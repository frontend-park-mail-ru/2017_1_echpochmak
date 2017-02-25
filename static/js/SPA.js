'use strict';

const menu = document.getElementsByClassName('menu')[0];
const registration = document.getElementsByClassName('registration')[0];
const login = document.getElementsByClassName('login')[0];
const leaderboard = document.getElementsByClassName('leaderboard')[0];
const game = document.getElementsByClassName('game')[0];
const about = document.getElementsByClassName('about')[0];
const greeting = document.getElementsByClassName('greeting')[0];
const back = document.getElementsByClassName('back')[0];

const button_registration = document.getElementsByClassName('registration-button')[0];
const button_login = document.getElementsByClassName('login-button')[0];
const button_back = document.getElementsByClassName('back-button')[0];

const button_single = document.getElementsByClassName('single-button')[0];
const button_multi = document.getElementsByClassName('multi-button')[0];
const button_about = document.getElementsByClassName('about-button')[0];
const button_leaders = document.getElementsByClassName('leaderboard-button')[0];

registration.hidden = true;
login.hidden = true;
leaderboard.hidden = true;
game.hidden = true;
about.hidden = true;
back.hidden = true;

button_registration.addEventListener('click', function() {
	event.preventDefault();

	menu.hidden = true;
	greeting.hidden = true;
	registration.hidden = false;
	back.hidden = false;

	document.body.background = './img/back_white.jpg';
});

button_login.addEventListener('click', function() {
	event.preventDefault();

	menu.hidden = true;
	greeting.hidden = true;
	login.hidden = false;
	back.hidden = false;

	document.body.background = './img/back_white.jpg';
});

button_back.addEventListener('click', function() {
	event.preventDefault();

	registration.hidden = true;
	login.hidden = true;
	leaderboard.hidden = true;
	game.hidden = true;
	about.hidden = true;
	back.hidden = true;

	menu.hidden = false;
	greeting.hidden = false;

	document.body.background = './img/back_green.jpg';
});

button_single.addEventListener('click', function() {
	event.preventDefault();

	menu.hidden = true;
	greeting.hidden = true;
	game.hidden = false;
	back.hidden = false;
});

button_multi.addEventListener('click', function() {
	event.preventDefault();

	menu.hidden = true;
	greeting.hidden = true;
	game.hidden = false;
	back.hidden = false;
});

button_about.addEventListener('click', function() {
	event.preventDefault();

	menu.hidden = true;
	greeting.hidden = true;
	about.hidden = false;
	back.hidden = false;
});

button_leaders.addEventListener('click', function() {
	event.preventDefault();

	menu.hidden = true;
	greeting.hidden = true;
	leaderboard.hidden = false;
	back.hidden = false;
});