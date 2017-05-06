describe('Тесты на метод авторизации', function () {

	const http = new HTTP();

	beforeEach(function (done) {

		const body = {
			mail: 'abc@abc.ru',
			login: 'login',
			password: 'password'
		};

		http.delete('/api/users', null, xhr => {
			// Регистрация делает вход автоматически
			http.post('/api/registration', body, xhr => {
				http.get('/api/logout', null, xhr2 => {
					done(true);
				});
			});
		});

	});

	it('Метод POST /api/login у невошедшего существующего пользователя возвращает статус 200', function (done) {

		const body = {
			login: 'login',
			password: 'password'
		};

		http.post('/api/login', body, xhr => {
			const status = xhr.status;
			expect(status).toBe(200);
			done(true);
		});

	});

	it('Метод POST /api/login у невошедшего несуществующего пользователя возвращает статус 400', function (done) {

		const body = {
			login: 'not exist login',
			password: 'password'
		};

		http.post('/api/login', body, xhr => {
			const status = xhr.status;
			expect(status).toBe(400);
			done(true);
		});
	});

	it('Метод POST /api/login для существующего пользователя с неверным паролем вернет статус 400', function (done) {

		const body = {
			login: 'login',
			password: 'no pass'
		};

		http.post('/api/login', body, xhr => {
			const status = xhr.status;
			expect(status).toBe(400);
			done(true);
		});
	});
});
