'use strict';

// Импортируем модули, отвечающие за работу с http и с файловой системой
const http = require('http');
const fs = require('fs');

// Создаём фукнцию-обработчик запросов
const worker = function (request, response) {
	// Выводим лог
	console.log(`${request.method} ${request.url}`);
	const url = request.url;

	// Определяем, какой из файлов мы будем использовать
	let content;
	if (url === '/') {
		content = fs.readFileSync('./static/menu.html', 'utf8');
	} 
	// else if (url === '/login') {
	// 	content = fs.readFileSync('./static/login.html', 'utf8');
	// } else if (url === '/signup') {
	// 	content = fs.readFileSync('./static/signup.html', 'utf8');
	// } else if (url === '/leaderboard') {
	// 	content = fs.readFileSync('./static/leaderboard.html', 'utf8');
	// } else if (url === '/about') {
	// 	content = fs.readFileSync('./static/about.html', 'utf8');
	// } else if (url === '/game') {
	// 	content = fs.readFileSync('./static/game.html', 'utf8');
	// } else {
	// 	content = fs.readFileSync('./static/menu.html', 'utf8');
	// }

	// Записываем заголовок в ответ
	response.writeHead(200, {"Content-Type": "text/html"});

	// Данные в ответ
	response.write(content);
	response.end();
	console.log('complete');
};

// Создаём сервер
const server = http.createServer(worker);

// Определяем, соединения на каком порту будет обрабатывать сервер
const port = process.env.PORT || 3000;
console.log(`Сервер запущен! Порт ${port}`);

// Запускаем сервер
server.listen(port);
