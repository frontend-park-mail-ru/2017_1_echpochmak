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

	Authorize.init();

})();
