'use strict';

(function () {

	const Menu = window.Menu;
	const Login = window.Login;
	const Register = window.Register;
	const About = window.About;
	const LeaderBoard = window.LeaderBoard;
	const SinglePlayer = window.SinglePlayer;
	const MultiPlayer = window.MultiPlayer;
	const Authorize = window.Authorize;
	const HTTP = window.HTTP;

	class Main {
		constructor() {
			if (Main.__instance) {
				return Main.__instance;
			}

			const http = new HTTP();
			http.BaseURL = 'https://gem-td-back.herokuapp.com/';

			this.pages = {
				menu: new Menu(),
				login: new Login(),
				register: new Register(),
				about: new About(),
				leader: new LeaderBoard(),
				single: new SinglePlayer(),
				multi: new MultiPlayer(),
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
