describe('Тесты на метод получения логина текущего пользователя', function () {

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
				done(true);
			});
		});

	});

	it('Метод GET /api/user после успешного входа возвращает статус 200', function (done) {

		http.get('/api/user', null, xhr => {
			const status = xhr.status;
			expect(status).toBe(200);
			done(true);
		});

	});

	it('Метод GET /api/user незалогиненного пользователя возвращает статус 409', function (done) {

		http.get('/api/logout', null, xhr => {
			http.get('/api/user', null, xhr2 => {
				const status = xhr2.status;
				expect(status).toBe(409);
				done(true);
			});
		});
	});
});
