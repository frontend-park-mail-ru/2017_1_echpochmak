(function () {
	'use strict';

	class UserService {
		constructor() {
			this.http = new HTTP();
		}

		register(mail, login, password, callback) {
			const body = {mail, login, password};
			this.http.post('/api/registration', body, xhr => {
				callback.call(xhr, JSON.parse(xhr.responseText || ''));
			})
		}

		login(login, password, callback) {
			const body = {login, password};
			this.http.post('/api/login', body, xhr => {
				callback.call(xhr, JSON.parse(xhr.responseText || ''));
			})
		}

		logout(callback) {
			this.http.get('/api/logout', null, xhr => {
				callback.call(xhr, JSON.parse(xhr.responseText || ''));
			})
		}

		getUsername(callback) {
			this.http.get('/api/user', null, xhr => {
				callback.call(xhr, JSON.parse(xhr.responseText || ''));
			})
		}

		getUsersList(callback) {
			this.http.get('/api/users', null, xhr => {
				callback.call(xhr, JSON.parse(xhr.responseText || ''));
			})
		}
	}

	window.UserService = UserService;

})();
