describe('Тесты на метод удаления всех пользователей', function () {

	const http = new HTTP();

	beforeEach(function (done) {

		const body = {
			'mail': 'abc@abc.ru',
			'login': 'login',
			'password': 'password'
		};

		http.delete('/api/users', null, xhr => {
			http.post('/api/registration', body, xhr => {
				done(true);
			});
		});
	});

	it('Метод DELETE /api/users возвращает статус 200', function (done) {

		http.delete('/api/users', null, xhr => {
			const status = xhr.status;
			expect(status).toBe(200);
			done(true);
		});

	});

	it('Список всех пользователей по методу GET /api/users после удаления пустой', function (done) {

		http.delete('/api/users', null, xhr => {
			http.get('/api/users', null, xhr => {
				const responseText = xhr.responseText;
				const parsed = JSON.parse(responseText);
				expect(parsed.users.length).toBe(0);
				done(true);
			});
		});

	});
});