'use strict';

(function () {

	const http = new HTTP();
	http.BaseURL = 'http://localhost:8082';

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

	const auth = new Authorize;

	Main.pages.menu.show();

})();
