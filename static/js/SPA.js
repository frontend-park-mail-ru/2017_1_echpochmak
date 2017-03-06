'use strict';

const menu = document.querySelector('.menu');
const registration = document.querySelector('.registration');
const login = document.querySelector('.login');
const leaderboard = document.querySelector('.leaderboard');
const singleplayer = document.querySelector('.singleplayer');
const multiplayer = document.querySelector('.multiplayer');
const about = document.querySelector('.about');
const greeting = document.querySelector('.greeting');
const back = document.querySelector('.back');

const button_registration = document.querySelector('.registration-button');
const button_login = document.querySelector('.login-button');
const button_back = document.querySelector('.back-button');

const button_single = document.querySelector('.single-button');
const button_multi = document.querySelector('.multi-button');
const button_about = document.querySelector('.about-button');
const button_leaders = document.querySelector('.leaderboard-button');

const green_background = './img/back_green.jpg';
const white_background = './img/back_white.jpg';

// registration.hidden = true;
// login.hidden = true;
// leaderboard.hidden = true;
// singleplayer.hidden = true;
// multiplayer.hidden = true;
// about.hidden = true;
// back.hidden = true;



// menu.hidden = true;
// greeting.hidden = true;


button_registration.addEventListener('click', () => {
	event.preventDefault();

	menu.hidden = true;
	greeting.hidden = true;
	registration.hidden = false;
	back.hidden = false;

	document.body.background = white_background;
});

button_login.addEventListener('click', () => {
	event.preventDefault();

	menu.hidden = true;
	greeting.hidden = true;
	login.hidden = false;
	back.hidden = false;

	document.body.background = white_background;
});

button_back.addEventListener('click', () => {
	event.preventDefault();

	registration.hidden = true;
	login.hidden = true;
	leaderboard.hidden = true;
	singleplayer.hidden = true;
	multiplayer.hidden = true;
	about.hidden = true;
	back.hidden = true;

	menu.hidden = false;
	greeting.hidden = false;

	document.body.background = green_background;
});

button_single.addEventListener('click', () => {
	event.preventDefault();

	menu.hidden = true;
	greeting.hidden = true;
	singleplayer.hidden = false;
	back.hidden = false;
});

button_multi.addEventListener('click', () => {
	event.preventDefault();

	menu.hidden = true;
	greeting.hidden = true;
	multiplayer.hidden = false;
	back.hidden = false;
});

button_about.addEventListener('click', () => {
	event.preventDefault();

	menu.hidden = true;
	greeting.hidden = true;
	about.hidden = false;
	back.hidden = false;
});

button_leaders.addEventListener('click', () => {
	event.preventDefault();

	menu.hidden = true;
	greeting.hidden = true;
	leaderboard.hidden = false;
	back.hidden = false;
});