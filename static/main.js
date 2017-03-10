'use strict';

(function () {

	class Main {
		constructor() {
			if (Main.__instance) {
				return Main.__instance;
			}

			const http = new HTTP();
			http.BaseURL = 'http://localhost:8082';

			this.pages = {
				'menu': new Menu(),
				'login': new Login(),
				'register': new Register(),
				'about': new About(),
				'leader': new LeaderBoard(),
				'single': new SinglePlayer(),
				'multi': new MultiPlayer(),
			};
			this.green_background = './img/back_green.jpg';
			this.white_background = './img/back_white.jpg';

			this.pages.menu.show();

			Main.__instance = this;
		}
	}

	window.Main = new Main();

	const auth = new Authorize();

})();
