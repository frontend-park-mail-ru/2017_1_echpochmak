'use strict';

(function () {

	const Main =  {
		
		pages: {
			'menu': new Menu(),
			'login': new Login(),
			'register': new Register(),
			'about': new About(),
			'leader': new LeaderBoard(),
			'single': new SinglePlayer(),
			'multi': new MultiPlayer(),
		},

		green_background: './img/back_green.jpg',
		white_background: './img/back_white.jpg',
	};

	window.Main = Main;

	Main.pages.menu.show();
	// Object.keys(Main.pages).forEach( page => {
	// 	document.querySelector('body').appendChild(Main.pages[page].get());
	// 	Main.pages[page].get().hidden = true;
	// });
	// Main.pages['leaderboard'] = document.querySelector('.leaderboard');
	// Main.pages['leaderboard'].hidden = true;
	// Main.pages['menu'].get().hidden = false;

	Authorize.init();

})();
