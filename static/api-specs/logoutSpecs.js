describe('Тесты на метод деавторизации', function () {

	const http = new HTTP();

	beforeEach(function (done) {

		const body = {
			'mail': 'abc@abc.ru',
			'login': 'login',
			'password': 'password'
		};

		http.delete('/api/users', null, xhr => {
			// Регистрация делает вход автоматически
			http.post('/api/registration', body, xhr => {
				done(true);
			});
		});

	});

	it('Метод GET /api/logout у вошедшего пользователя возвращает статус 200', function (done) {

		http.get('/api/logout', null, xhr => {
			const status = xhr.status;
			expect(status).toBe(200);
			done(true);
		});

	});

	it('Метод GET /api/logout у незалогиненного пользователя возвращает статус 409', function (done) {

		http.get('/api/logout', null, xhr => {
			http.get('/api/logout', null, xhr => {
				const status = xhr.status;
				expect(status).toBe(409);
				done(true);
			});
		});
	});
});