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
	const Router = window.Router;


	class Main {
		constructor() {
			if (Main.__instance) {
				return Main.__instance;
			}

			const http = new HTTP();
			http.BaseURL = 'https://gem-td-back.herokuapp.com';

			const router = new Router();

			router.register('/', new Menu());
			router.register('/login/', new Login());
			router.register('/register/', new Register());
			router.register('/about/', new About());
			router.register('/leaders/', new LeaderBoard());
			router.register('/game/', new SinglePlayer());
			router.register('/multiplayer/', new MultiPlayer());

			router.start();

			Main.__instance = this;
		}
	}

	window.Main = new Main();

	const auth = new Authorize();

})();
