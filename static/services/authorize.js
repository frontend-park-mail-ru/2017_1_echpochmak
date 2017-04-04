'use strict';

import UserService from './userservice.js'
import Router from '../modules/router.js'

export default
class Authorize {
	constructor() {
		if (Authorize.__instance) {
			return Authorize.__instance;
		}

		this.service = new UserService();
		this.router = new Router();
		this.anonymUser = 'Гость';
		
		this.showForGuest();

		this.service.getUsername(xhr => {
			if (xhr.login) {
				this.showForUser(xhr.login);
			} else {
				this.showForGuest();
			}
		});

		Authorize.__instance = this;
	}

	authorize() {
		this.service.getUsername(xhr => {
			if (xhr.status === 'ok') {
				this.showForUser(xhr.login);
			}
		});
	}

	deauthorize() {
		this.service.logout(xhr => {
			this.showForGuest();
		});
	}

	showForUser(user) {
		this.router.loginSwitch(user);
	}

	showForGuest() {
		this.router.unloginSwitch(this.anonymUser);
	}
}
