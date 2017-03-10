describe('Тесты на метод регистрации', function () {

	const http = new HTTP();

	beforeEach(function (done) {

		const body = {
			mail: 'abc@abc.ru',
			login: 'login',
			password: 'password'
		};

		http.delete('/api/users', null, xhr => {
			// Регистрация делает вход автоматически
			http.post('/api/registration', body, xhr2 => {
				http.get('/api/logout', null, xhr3 => {
					done(true);
				});
			});
		});

	});

	it('Метод POST /api/registration приводит к авторизации пользователя', function (done) {

		const body2 = {
			mail: '123@123.123',
			login: '123',
			password: '123'
		};

		http.post('/api/registration', body2, xhr => {
			http.get('/api/user', null, xhr2 => {
				const login = JSON.parse(xhr2.responseText).login;
				expect(login === body2.login).toBe(true);
				done(true);
			});
		});
	});

	it('Метод POST /api/registration с существующим E-Mail возвращает статус 409', function (done) {

		const body2 = {
			mail: 'abc@abc.ru',
			login: '123',
			password: '123'
		};

		http.post('/api/registration', body2, xhr => {
			const status = xhr.status;
			expect(status).toBe(409);
			done(true);
		});
	});

	it('Метод POST /api/registration с существующим логином возвращает статус 409', function (done) {

		const body2 = {
			mail: '123@123.123',
			login: 'login',
			password: '123'
		};

		http.post('/api/registration', body2, xhr => {
			const status = xhr.status;
			expect(status).toBe(409);
			done(true);
		});
	});

	it('Зарегистрированный пользователь появляется в ответе на запрос GET /api/users', function (done) {

		const body2 = {
			mail: 'abc@123.ru',
			login: '123',
			password: '123'
		};

		http.post('/api/registration', body2, xhr => {
			http.get('/api/users', null, xhr2 => {
				const array = JSON.parse(xhr2.responseText).users;
				let result = false;
				for (const i in array) {
					if (array[i].login === body2.login) {
						result = true;
					}
				}
				expect(result).toBe(true);
				done(true);
			});
		});
	});
});
