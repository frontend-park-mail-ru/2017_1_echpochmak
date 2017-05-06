'use strict';

const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

app.use('/', express.static('static'));
app.use('/login', express.static('static'));
app.use('/register', express.static('static'));
app.use('/about', express.static('static'));
app.use('/leaders', express.static('static'));
app.use('/game', express.static('static'));
app.use('/multiplayer', express.static('static'));

app.listen(PORT, function () {
	console.log(`Server listen ${PORT} port`);
});
