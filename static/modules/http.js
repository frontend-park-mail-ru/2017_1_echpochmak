(function () {
	'use strict';

	const ALLOWED_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];

	class HTTP {
		constructor() {
			if (HTTP.__instance) {
				return HTTP.__instance;
			}

			this._headers = {};
			this._baseUrl = '';

			HTTP.__instance = this;
		}

		get BaseURL() {
			return this._baseUrl;
		}

		set BaseURL(value) {
			this._baseUrl = value;
		}

		get(address, query = null, callback = null) {
			const xhr = new XMLHttpRequest();
			xhr.withCredentials = true;
			let url = `${this._baseUrl}${address}`;
			if (query) {
				url += Object.keys(query)
					.map(name => encodeURIComponent(`${name}=${query[name]}`))
					.join('&');
			}
			xhr.open('GET', url, true);

			Object.keys(this._headers)
				.forEach(name => xhr.setRequestHeader(name, this._headers[name]));

			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (typeof callback === 'function') {
						callback.call(xhr, xhr);
					}
				}
			};

			xhr.send(null);
		}

		post(address, body = null, callback = null) {
			const xhr = new XMLHttpRequest();
			xhr.withCredentials = true;
			const url = `${this._baseUrl}${address}`;
			xhr.open('POST', url, true);

			Object.keys(this._headers)
				.forEach(name => xhr.setRequestHeader(name, this._headers[name]));
			xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (typeof callback === 'function') {
						callback.call(xhr, xhr);
					}
				}
			};

			if (body) {
				xhr.send(JSON.stringify(body));
			} else {
				xhr.send(null);
			}
		}

		put(address, body = null, callback = null) {
			const xhr = new XMLHttpRequest();
			xhr.withCredentials = true;
			const url = `${this._baseUrl}${address}`;
			xhr.open('PUT', url, true);

			Object.keys(this._headers)
				.forEach(name => xhr.setRequestHeader(name, this._headers[name]));
			xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (typeof callback === 'function') {
						callback.call(xhr, xhr);
					}
				}
			};

			if (body) {
				xhr.send(JSON.stringify(body));
			} else {
				xhr.send(null);
			}
		}

		delete(address, body = null, callback = null) {
			const xhr = new XMLHttpRequest();
			xhr.withCredentials = true;
			const url = `${this._baseUrl}${address}`;
			xhr.open('DELETE', url, true);

			Object.keys(this._headers)
				.forEach(name => xhr.setRequestHeader(name, this._headers[name]));
			xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (typeof callback === 'function') {
						callback.call(xhr, xhr);
					}
				}
			};
			if (body) {
				xhr.send(JSON.stringify(body));
			} else {
				xhr.send(null);
			}
		}
	}

	window.HTTP = HTTP;

})();
