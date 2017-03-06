'use strict';

(function () {

	const Back = window.Back;
	const Menu = window.Menu;
	const Login = window.Login;
	const Register = window.Register;
	const About = window.About;
	const SinglePlayer = window.SinglePlayer;
	const MultiPlayer = window.MultiPlayer;

	const Main =  {
		
		pages: {
			'back': new Back(),
			'menu': new Menu(),
			'login': new Login(),
			'register': new Register(),
			'about': new About(),
			'single': new SinglePlayer(),
			'multi': new MultiPlayer(),
		},

		green_background: './img/back_green.jpg',
		white_background: './img/back_white.jpg',
	};

	Object.keys(Main.pages).forEach( page => {
		document.querySelector('body').appendChild(Main.pages[page].get());
		Main.pages[page].get().hidden = true;
	});
	Main.pages['leaderboard'] = document.querySelector('.leaderboard');
	Main.pages['leaderboard'].hidden = true;
	Main.pages['menu'].get().hidden = false;

	window.Main = Main;

})();
