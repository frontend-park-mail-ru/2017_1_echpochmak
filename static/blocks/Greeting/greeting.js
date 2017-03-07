(function () {

	'use strict';

	class Greeting extends BaseBlock {
		constructor(name) {
			super('div', {
				'class': 'greeting'
			});
			this.greetingBlock = new BaseBlock('div', {
				'align': 'right',
				'id': 'divtxt'
			});
			this.entryBy = new BaseBlock('h3', {
				'class': 'txt'
			});
			this.entryBy.get().innerHTML = 'Вы вошли как ';
			this.username = new BaseBlock('h2', {
				'class': 'txt username'
			});
			this.username.get().innerHTML = name;
			this.noAuth = new BaseBlock('div', {
				'align': 'right',
				'id': 'divbut',
				'class': 'no-authorized'
			});
			this.auth = new BaseBlock('div', {
				'align': 'right',
				'id': 'divbut',
				'class': 'authorized'
			});
			this.registerButton = new Link('Регистрация', {
				'class': 'button registration-button'
			});
			this.loginButton = new Link('Вход', {
				'class': 'button login-button'
			})
			this.exitButton = new Link('Выйти', {
				'class': 'button exit-button'
			})

			this.render();
			this.makeListeners();
		}

		render() {
			this.get().appendChild(this.greetingBlock.get());
			this.greetingBlock.get().appendChild(this.entryBy.get());
			this.greetingBlock.get().appendChild(this.username.get());
			this.get().appendChild(this.noAuth.get());
			this.get().appendChild(this.auth.get());
			this.noAuth.get().appendChild(this.registerButton.get());
			this.noAuth.get().appendChild(this.loginButton.get());
			this.auth.get().appendChild(this.exitButton.get());
		}

		makeListeners() {

			this.loginButton.on('click', () => {
				event.preventDefault();

				Main.pages['menu'].get().hidden = true;
				Main.pages['login'].get().hidden = false;
				Main.pages['back'].get().hidden = false;

				document.body.background = Main.white_background;
			})

			this.registerButton.on('click', () => {
				event.preventDefault();

				Main.pages['menu'].get().hidden = true;
				Main.pages['register'].get().hidden = false;
				Main.pages['back'].get().hidden = false;

				document.body.background = Main.white_background;
			})

			this.exitButton.on('click', () => {
				event.preventDefault();
				Authorize.deauthorize();
			})
		}
	}

	window.Greeting = Greeting;

})();