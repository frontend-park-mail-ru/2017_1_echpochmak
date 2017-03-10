describe('Тесты на метод получения списка всех пользователей', function () {

	const http = new HTTP();

	it('Метод GET /api/users возвращает статус 200', function (done) {

		http.get('/api/users', null, xhr => {
			const status = xhr.status;
			expect(status).toBe(200);
			done(true);
		});

	});

	it('Метод GET /api/users возвращает JSON-массив', function (done) {

		http.get('/api/users', null, xhr => {
			const responseText = xhr.responseText;
			const parsed = JSON.parse(responseText);
			expect(parsed instanceof Object).toBe(true);
			done(true);
		});

	});

	it('Метод POST /api/users возвращает код ошибки 405', function (done) {

		http.post('/api/users', null, xhr => {
			const status = xhr.status;
			expect(status).toBe(405);
			done(true);
		})
	});
});