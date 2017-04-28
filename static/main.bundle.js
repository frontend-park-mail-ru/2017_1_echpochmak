/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class BaseBlock {
	constructor(tag, attrs = {}) {
		this.el = document.createElement(tag);
		this.setAttrs(attrs);
	}

	setAttrs(attrs = {}) {
		Object.keys(attrs).forEach(name => {
			this.el.setAttribute(name, attrs[name]);
		});
	}

	get() {
		return this.el;
	}

	on(name, callback) {
		this.el.addEventListener(name, callback);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BaseBlock;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Router {

	constructor() {

		if (Router.__instance) {
			return Router.__instance;
		}

		this.routes = {};
		this.activeRoute = null;
		this.loginned = false;
		this.user = {
			username: '',
			score: 0
		}

		this.history = window.history;

		Router.__instance = this;
	}

	register(route, view) {
		this.routes[route] = view;
	}

	_getViewByRoute(href) {
		return this.routes[href];
	}   

	start() {
		window.onpopstate = () => {
			this.onroute(window.location.pathname);
		}
		
		this.onroute(window.location.pathname);
	}

	go(path) {
		if (this.onroute(path)) {
			window.history.pushState({ page: 1 }, 'Title 1', path);
		}
	}

	onroute(path) {

		let view = this._getViewByRoute(path);

		if (!view) {
			return false;
		}

		if (this.currentView === view) {
			return true;
		}

		if (this.currentView) {
			this.currentView.hide();
		}

		view.show();
		this.currentView = view;

		if (this.loginned) {
			this.loginSwitch(this.user)
		} else {
			this.unloginSwitch(this.user)
		}

		return true;
	}

	loginSwitch(user) {
		this.currentView.loginSwitch(user.username);
		this.loginned = true;
		this.user = user;
	}

	unloginSwitch(user) {
		this.currentView.unloginSwitch(user.username);
		this.loginned = false;
		this.user = user;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Router;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Back_back_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_router_js__ = __webpack_require__(1);






class BaseView extends __WEBPACK_IMPORTED_MODULE_0__components_BaseBlock_baseblock_js__["a" /* default */] {
	constructor(tag, attrs) {
		super(tag, attrs);
		this.back = new __WEBPACK_IMPORTED_MODULE_1__components_Back_back_js__["a" /* default */]();

		this.back.onclick(() => {
			const router = new __WEBPACK_IMPORTED_MODULE_2__modules_router_js__["a" /* default */]();
			event.preventDefault();
			router.go('/');
		})
		this.get().appendChild(this.back.get());

		this.green_background = './img/back_green.jpg';
		this.white_background = './img/back_white.jpg';
		this.background = this.green_background;
	}

	show() {
		document.querySelector('body').appendChild(this.get());
		document.body.background = this.background;
	}

	hide() {
		document.querySelector('body').removeChild(this.get());
	}

	loginSwitch(name) {

	}

	unloginSwitch(name) {

	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BaseView;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__userservice_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_router_js__ = __webpack_require__(1);





class Authorize {
	constructor() {
		if (Authorize.__instance) {
			return Authorize.__instance;
		}

		this.service = new __WEBPACK_IMPORTED_MODULE_0__userservice_js__["a" /* default */]();
		this.router = new __WEBPACK_IMPORTED_MODULE_1__modules_router_js__["a" /* default */]();

		this.user = {};
		this.anonymUser = {
			username: 'Гость',
			score: 0
		}
		Object.assign(this.user, this.anonymUser);
		
		this.showForGuest();

		this.service.getUsername(xhr => {
			if (xhr.status === 'ok') {
				this.user.username = xhr.login;
				this.loadUserScore();
				this.showForUser();
			} else {
				this.showForGuest();
			}
		});

		Authorize.__instance = this;
	}

	loadUserScore() {
		this.service.getUserScore(xhr => {
			if (xhr.status === 'ok') {
				this.user.score = xhr.score;
			}
		})
	}

	authorize() {
		this.service.getUsername(xhr => {
			if (xhr.status === 'ok') {
				this.user.username = xhr.login;
				this.loadUserScore();
				this.showForUser();
			}
		});
	}

	deauthorize() {
		this.service.logout(xhr => {
			Object.assign(this.user, this.anonymUser);
			this.showForGuest();
		});
	}

	showForUser() {
		this.router.loginSwitch(this.user);
	}

	showForGuest() {
		this.router.unloginSwitch(this.anonymUser);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Authorize;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Settings {
	constructor() {

		if (Settings.__instance) {
			return Settings.__instance;
		}

		this.gameFieldId = 'game-field';
		this.hintsFieldId = 'hints-field';

		this.gameFieldElement = document.getElementById(this.gameFieldId);
		this.hintsFieldElement = document.getElementById(this.hintsFieldId);

		this.mapSize = 15;

		this.start = [0,0];
		this.finish = [this.mapSize - 1, this.mapSize - 1];
		this.checkpoints = [[0, this.mapSize - 1], [this.mapSize - 1, 0]];

		let minSize = Math.min(this.gameFieldElement.offsetHeight, this.gameFieldElement.offsetWidth)
		this.fieldSize = (minSize * 0.9 / this.mapSize) - 2;

		this.mapX = (this.gameFieldElement.offsetWidth - ((this.fieldSize + 2) * this.mapSize)) / 2;
		this.mapY = (this.gameFieldElement.offsetHeight - ((this.fieldSize + 2) * this.mapSize)) / 2;

		this.variantRadius = 10;
		this.bulletStep = 20;
		this.monsterStep = 10;

		this.numberMonstersInWave = 20;
		this.bulletRadius = 5;

		this.circleRed = {
			name: 'circleRed',
			color: '#FF0000',
			power: 10,
			radiusFight: 400,
		};

		this.circleBlue = {
			name: 'circleBlue',
			color: '#00FFFF',
			power: 15,
			radiusFight: 400,
		};

		this.circleGreen = {
			name: 'circleGreen',
			color: '#00FF00',
			power: 20,
			radiusFight: 400,
		};

		this.circleYellow = {
			name: 'circleYellow',
			color: '#FFFF00',
			power: 25,
			radiusFight: 400,
		};

		this.circlePink = {
			name: 'circlePink',
			color: '#FF00FF',
			power: 30,
			radiusFight: 400,
		};

		this.circleSad = {
			name: 'circleSad',
			color: '#0000FF',
			power: 35,
			radiusFight: 400,
		};

		this.triangl = {
			name: 'triangl',
			size: 30,
			color: '#00FF00',
			health: 10,
		};

		this.stone = {
			name: 'stone',
			color: 'black',
		};

		this.pentagonRPS = {
			name: 'pentagonRPS',
			power: 70,
			colors: ['#FF0000', '#FF00FF', '#0000FF'],
			radiusFight: 400,
			circles: ['circleRed', 'circlePink', 'circleSad']
		};

		this.pentagonSBG = {
			name: 'pentagonSBG',
			power: 80,
			colors: ['#0000FF', '#00FFFF', '#00FF00'],
			radiusFight: 400,
			circles: ['circleSad', 'circleBlue', 'circleGreen']
		};

		this.pentagonGYR = {
			name: 'pentagonGYR',
			power: 70,
			colors: ['#00FF00', '#FFFF00', '#FF0000'],
			radiusFight: 400,
			circles: ['circleGreen', 'circleYellow', 'circleRed']
		};

		this.star = {
			name: 'star',
			colors: ['#0000FF', '#00FF00', '#FF0000'],
			power: 100,
			radiusFight: 400,
		};

		this.circles = [
			this.circleRed, 
			this.circleGreen, 
			this.circleYellow, 
			this.circleBlue, 
			this.circleSad, 
			this.circlePink
		];

		this.pentagons = [
			this.pentagonRPS, 
			this.pentagonSBG, 
			this.pentagonGYR
		];

		// this.variantsX = window.innerWidth * 0.72;
		// this.variantsY = this.mapY;
		// this.variantsXSize = window.innerWidth * 0.25;
		// this.variantsYSize = window.innerHeight * 0.1;
		// this.betweenVariants = 120;

		this.variantsX = this.hintsFieldElement.offsetWidth * 0.05;
		this.variantsY = this.mapY;
		this.variantsXSize = this.hintsFieldElement.offsetWidth * 0.9;
		this.variantsYSize = this.hintsFieldElement.offsetHeight * 0.1;
		this.betweenVariants = this.hintsFieldElement.offsetHeight * 0.15;

		this.variantCircls = [[this.circleRed, this.circlePink, this.circleSad],
								[this.circleSad, this.circleBlue, this.circleGreen],
								[this.circleGreen, this.circleYellow, this.circleRed]];

		Settings.__instance = this;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Settings;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_http_js__ = __webpack_require__(9);




class UserService {
	constructor() {
		this.http = new __WEBPACK_IMPORTED_MODULE_0__modules_http_js__["a" /* default */]();

		this.func = (callback, xhr) => {
			if (typeof (callback) === 'function') {
				callback.call(xhr, JSON.parse(xhr.responseText || ''));
			}
		};
	}

	register(mail, login, password, callback) {
		const body = {mail, login, password};
		this.http.post('/api/registration', body, xhr => {
			this.func(callback, xhr);
		});
	}

	login(login, password, callback) {
		const body = {login, password};
		this.http.post('/api/login', body, xhr => {
			this.func(callback, xhr);
		});
	}

	logout(callback) {
		this.http.get('/api/logout', null, xhr => {
			this.func(callback, xhr);
		});
	}

	getUsername(callback) {
		this.http.get('/api/user', null, xhr => {
			this.func(callback, xhr);
		});
	}

	getUserScore(callback) {
		this.http.get('/api/getscore', null, xhr => {
			this.func(callback, xhr);
		})
	}

	setUserScore(score, callback) {
		const body = {score};
		this.http.post('/api/setscore', body, xhr => {
			this.func(callback, xhr);
		});
	}

	getUsersList(callback) {
		this.http.get('/api/users', null, xhr => {
			this.func(callback, xhr);
		});
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UserService;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Mediator {
	constructor() {
		if (Mediator.__instance) {
			return Mediator.__instance;
		}

		this.messages = {};

		Mediator.__instance = this;
	}

	emit(event, args) {
		if (event in this.messages) {
			for (const callback of this.messages[event]) {
				callback(args);
			}
			return true;
		} else {
			return false;
		}
	}

	subscribe(event, callback) {
		if (event in this.messages) {
			this.messages[event].push(callback);
		} else {
			this.messages[event] = [callback];
		}
		return true;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Mediator;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Events = {
	GAME_START: 	1,
	PLAY_NEW_GAME: 	2,
	TRY_QUIT: 		3,
	QUIT_CONFIRMED: 4,
	QUIT_CANCELED: 	5,
	GAME_FINISHED: 	6,
	PLAY_AGAIN: 	7,
	EXIT_TO_MENU: 	8,
}

/* harmony default export */ __webpack_exports__["a"] = (Events);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);




class Link extends __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */] {
	constructor(text = '', attrs = {}) {
		super('a', attrs);
		this.setAttrs({
			href: '#'
		});
		this.get().innerHTML = text;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Link;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


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
/* harmony export (immutable) */ __webpack_exports__["a"] = HTTP;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);




class Form extends __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */] {
	constructor() {
		super('form', {
			class: 'form-horizontal',
			action: '#'
		});
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Form;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Button_button_js__ = __webpack_require__(22);





class FormButton extends __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */] {
	constructor(text = '', attrs = {}) {
		super('div', {
			class: 'col-xs-12 col-sm-12 col-md-12 col-lg-12 line'
		});
		this.indent = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-4 col-sm-4 col-md-4 col-lg-4'
		});
		this.buttonBlock = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-5 col-sm-5 col-md-5 col-lg-5'
		});
		this.button = new __WEBPACK_IMPORTED_MODULE_1__Button_button_js__["a" /* default */](text, attrs);

		this.render();
	}

	render() {
		this.get().appendChild(this.indent.get());
		this.get().appendChild(this.buttonBlock.get());
		this.buttonBlock.get().appendChild(this.button.get());
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FormButton;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);




class FormMessage extends __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */] {
	constructor(text = '', attrs = {}) {
		super('div', {
			class: 'col-xs-12 col-sm-12 col-md-12 col-lg-12 line'
		});
		this.indent = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-4 col-sm-4 col-md-4 col-lg-4'
		});
		this.messageBlock = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-5 col-sm-5 col-md-5 col-lg-5 form__message'
		});

		this.render();
	}

	showMessage(text) {
		this.messageBlock.get().innerHTML = text;
	}

	clean() {
		this.messageBlock.get().innerHTML = '';
	}

	render() {
		this.get().appendChild(this.indent.get());
		this.get().appendChild(this.messageBlock.get());
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FormMessage;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);




class Input extends __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */] {
	constructor(labelName, attrs) {
		super('div', {
			class: 'col-xs-12 col-sm-12 col-md-12 col-lg-12 line form-input'
		});
		this.labelBlock = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('label', {
			class: 'col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label form-input__label'
		});
		this.labelBlock.get().innerHTML = labelName;
		this.inputBlock = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-5 col-sm-5 col-md-5 col-lg-5'
		});
		this.input = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('input', attrs);
		this.input.get().classList.add('form-control', 'input-lg');
		this.errorBlock = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-3 col-sm-3 col-md-3 col-lg-3 form-input__error-message'
		});

		this.render();
	}

	render() {
		this.get().appendChild(this.labelBlock.get());
		this.get().appendChild(this.inputBlock.get());
		this.get().appendChild(this.errorBlock.get());
		this.inputBlock.get().appendChild(this.input.get());
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Input;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);





class About extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'about'
		});
		this.list = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'list'
		});
		this.header = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'list__header',
			align: 'center'
		});
		this.header.get().innerHTML = 'Gem-TD';
		this.hr = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('hr');
		this.cnt = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div');
		this.cnt.get().innerHTML = this.loadContent();

		this.render();
	}

	render() {
		this.get().appendChild(this.list.get());
		this.list.get().appendChild(this.header.get());
		this.list.get().appendChild(this.cnt.get());
		this.header.get().appendChild(this.hr.get());
	}

	loadContent() {
		return '<b>Жанр</b>: Tower Defense<br>' +
		'<b>Количество игроков</b>: 1-4<br>' +
		'<b>Особенности</b>: сложная, но интересная Tower Defence, у всех вышек есть способности, успех в немалой степени зависит от случайности.<br>' +
		'<b>Задача</b>: уничтожить все волны мобов<br>' +
		'<b>Количество волн: </b>  <br>' +
		'<b>Поражение</b>: пропустить некоторое количество мобов / боссов к кристаллу (количество зависит от типа и уровня хп пропущенных)<br>' +
		'<br>' +

		'<b>Суть игры:</b><br>' +
		'<div style="padding-left: 30px">Игра относится к подкатегории TD, в которых необходимо строить лабиринт для врагов, окутывая вышками и баррикадами контрольные точки, в которые все враги обязаны заходить в определенной последовательности. Контрольные точки выделены зеленым узором, а дорожки, по которым враги потенциально могут идти, светло-зеленым цветом.<br>' +
		'</div><br>' +

		'<b>Основные факты о вышках:</b><br>' +
		'<ul>' +
		'<li>Каждый раунд вы можете разместить 5 гемов, так называются все вышки, они же составляющие для спец.вышек.</li>' +
		'<li>Гемы представляют собой драгоценные камни - опалы, аметисты, рубины, топазы, эмеральды, аквамарины, алмазы. Все они имеют различные типы атак, например, рубин бьет в сплеше, опалы дают ауру скорости атаки, топазы бьют в несколько целей и т.д.</li>' +
		'<li>Различные камни объединяются в спец. вышки</li> <br>' +
		'<li>За каждый раунд после установки 5 гемов, оставить вы сможете лишь один из них, остальные будут превращены в скалы. Однако если в вашем наборе есть сочетание для спец. вышки, вы можете её сразу построить.</li>' +
		'</ul><br>' +

		'<b>Факты о волнах:</b><br>' +
		'<ul>' +
		'<li>Наземные юниты будут ходить от стрелки к стрелке по кратчайшему пути, нарисованный путь не имеет значения</li>' +
		'<li>Летающие юниты всегда идут прямым путем, игнорируя препятствия</li>' +
		'<li>На магически неуязвимых юнитов не работают замедление, понижение урона, яд, сплеш и вышки Asteriated ruby / Vulcano не наносят урона.</li>' +
		'<li>Некоторые волны - боссы, все летающие, секрет убийства - настакивать замедление и минус броню, очень «сильная» вышка для этого - quartz.</li>' +
		'<li>Также имеются волны юнитов с уворотам, физически иммунных юнитов и быстрых юнитов, которые не замедляются.</li>' +
		'</ul>' +
		'<br>' +

		'<b>Факты и советы по  постройке лабиринта:</b><br>' +
		'<ul>' +
		'<li>Вышки выгоднее всего строить ближе к центру - пересечению путей следования летающих юнитов</li>' +
		'<li>Поскольку существует 5 стрелок (включая старт и финиш - всего 7 точек для посещения юнитами), можно построить такой лабиринт, для которого наземные юниты будут путешествовать через одну и ту же область 6 раз (это максимум).</li>' +
		'</ul>' +
		'<br>' +

		'<b>Прохождение.</b><br>' +
		'<div style="padding-left: 30px">Залогом успешной игры является построение лабиринта по типу «сильных», баланс в вышках для прохождения разных волн (физически и магически иммунных), и немного удачи.' +
		'</div>';
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = About;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_userservice_js__ = __webpack_require__(5);






class LeaderBoard extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'leaderboard'
		});
		this.list = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'list'
		});
		this.render();
	}

	render() {
		this.get().appendChild(this.list.get());

		this.template = window.fest['leaderboard.tmpl'];
		this.list.get().innerHTML = this.template({});
	}

	show() {
		super.show();
		this.update();
	}

	update() {
		const service = new __WEBPACK_IMPORTED_MODULE_2__services_userservice_js__["a" /* default */]();
		service.getUsersList(xhr => {
			this.list.get().innerHTML = this.template(xhr);
		});
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LeaderBoard;



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_LoginForm_loginform_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_userservice_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_authorize_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_router_js__ = __webpack_require__(1);









class Login extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'login'
		});
		this.background = this.white_background;
		
		this.padd = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'padd'
		});
		this.form = new __WEBPACK_IMPORTED_MODULE_2__components_LoginForm_loginform_js__["a" /* default */]();

		this.form.on('submit', () => {

			event.preventDefault();

			const service = new __WEBPACK_IMPORTED_MODULE_3__services_userservice_js__["a" /* default */]();
			const auth = new __WEBPACK_IMPORTED_MODULE_4__services_authorize_js__["a" /* default */]();
			const router = new __WEBPACK_IMPORTED_MODULE_5__modules_router_js__["a" /* default */]();

			if (this.form.validate()) {

				service.login(this.form.data.login, this.form.data.password, xhr => {
					if (xhr.status === 'ok') {
						router.go('/');

						auth.authorize();

						this.form.get().reset();
						this.form.message.clean();
					} else {
						this.form.message.showMessage('Неверный логин или пароль!');
					}
				});
			}
		})

		this.render();
	}

	render() {
		this.get().appendChild(this.padd.get());
		this.padd.get().appendChild(this.form.get());
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Login;



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_MenuButton_menubutton_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Greeting_greeting_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_router_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_authorize_js__ = __webpack_require__(3);









class Menu extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'menu'
		});
		this.padd = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'padd',
			align: 'center'
		});
		this.line1 = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'line',
			align: 'center'
		});
		this.line2 = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'line',
			align: 'center'
		});
		this.singleButton = new __WEBPACK_IMPORTED_MODULE_2__components_MenuButton_menubutton_js__["a" /* default */]('Одиночная игра', {
			class: 'menu__single-button menu__button_big'
		});
		this.multiButton = new __WEBPACK_IMPORTED_MODULE_2__components_MenuButton_menubutton_js__["a" /* default */]('Мультиплеер', {
			class: 'menu__multi-button menu__button_big'
		});
		this.aboutButton = new __WEBPACK_IMPORTED_MODULE_2__components_MenuButton_menubutton_js__["a" /* default */]('Об игре', {
			class: 'menu__about-button menu__button_small'
		});
		this.leaderButton = new __WEBPACK_IMPORTED_MODULE_2__components_MenuButton_menubutton_js__["a" /* default */]('Лидеры', {
			class: 'menu__leaderboard-button menu__button_small'
		});
		this.greeting = new __WEBPACK_IMPORTED_MODULE_3__components_Greeting_greeting_js__["a" /* default */]('Гость');

		this.render();
		this.makeListeners();
	}

	render() {
		this.get().removeChild(this.back.get());

		this.get().appendChild(this.padd.get());
		this.padd.get().appendChild(this.line1.get());
		this.padd.get().appendChild(this.line2.get());
		this.line1.get().appendChild(this.singleButton.get());
		this.line1.get().appendChild(this.multiButton.get());
		this.line2.get().appendChild(this.aboutButton.get());
		this.line2.get().appendChild(this.leaderButton.get());
		this.get().appendChild(this.greeting.get());
	}

	makeListeners() {

		const router = new __WEBPACK_IMPORTED_MODULE_4__modules_router_js__["a" /* default */]();

		this.greeting.loginButton.on('click', (event) => {
			event.preventDefault();
			router.go('/login/');
		});

		this.greeting.registerButton.on('click', (event) => {
			event.preventDefault();
			router.go('/register/');
		});

		this.greeting.exitButton.on('click', (event) => {
			event.preventDefault();

			const auth = new __WEBPACK_IMPORTED_MODULE_5__services_authorize_js__["a" /* default */]();
			auth.deauthorize();
		});

		this.singleButton.on('click', (event) => {
			event.preventDefault();
			router.go('/game/');
		});

		this.multiButton.on('click', (event) => {
			event.preventDefault();
			router.go('/multiplayer/');
		});

		this.aboutButton.on('click', (event) => {
			event.preventDefault();
			router.go('/about/');
		});

		this.leaderButton.on('click', (event) => {
			event.preventDefault();
			router.go('/leaders/');
		});
	}

	loginSwitch(name) {
		this.greeting.username.get().textContent = name;
		this.greeting.noAuth.get().hidden = true;
		this.greeting.auth.get().hidden = false;
	}

	unloginSwitch(name) {
		this.greeting.username.get().textContent = name;
		this.greeting.auth.get().hidden = true;
		this.greeting.noAuth.get().hidden = false;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Menu;



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);





class MultiPlayer extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'multiplayer'
		});
		this.padd = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'padd'
		});
		this.list = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'list',
			align: 'center'
		});
		this.auth = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('span', {
			class: 'authorized'
		});
		this.noAuth = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('span', {
			class: 'no-authorized'
		});
		this.auth.get().innerHTML = 'Добро пожаловать в мультиплеер!';
		this.noAuth.get().innerHTML = 'Мультиплеер доступен только зарегистрированным пользователям';

		this.render();
	}

	render() {
		this.get().appendChild(this.padd.get());
		this.padd.get().appendChild(this.list.get());
		this.list.get().appendChild(this.noAuth.get());
		this.list.get().appendChild(this.auth.get());
	}

	loginSwitch(name) {
		this.noAuth.get().hidden = true;
		this.auth.get().hidden = false;
	}

	unloginSwitch(name) {
		this.auth.get().hidden = true;
		this.noAuth.get().hidden = false;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MultiPlayer;



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_RegisterForm_registerform_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_router_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_userservice_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_authorize_js__ = __webpack_require__(3);









class Register extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'registration'
		});
		this.background = this.white_background;
		
		this.padd = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'padd'
		});
		this.form = new __WEBPACK_IMPORTED_MODULE_2__components_RegisterForm_registerform_js__["a" /* default */]();
		this.form.on('submit', () => {

			event.preventDefault();

			const router = new __WEBPACK_IMPORTED_MODULE_3__modules_router_js__["a" /* default */]();
			const service = new __WEBPACK_IMPORTED_MODULE_4__services_userservice_js__["a" /* default */]();
			const auth = new __WEBPACK_IMPORTED_MODULE_5__services_authorize_js__["a" /* default */]();

			if (this.form.validate()) {

				service.register(this.form.data.email, this.form.data.login, this.form.data.password, xhr => {
					if (xhr.status === 'ok') {
						router.go('/');

						auth.authorize();

						this.form.get().reset();
						this.form.message.clean();
					} else {
						this.form.message.showMessage('Что-то пошло не так');
					}
				});
			}
		})

		this.render();
	}

	render() {
		this.get().appendChild(this.padd.get());
		this.padd.get().appendChild(this.form.get());
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Register;



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__start_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__game_manager_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__game_mediator_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_router_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__game_events_js__ = __webpack_require__(7);











class SinglePlayer extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'singleplayer'
		});
		
		this.get().removeChild(this.back.get());

		this.startSubView = new __WEBPACK_IMPORTED_MODULE_2__start_js__["a" /* default */]();
		this.gameSubView = new __WEBPACK_IMPORTED_MODULE_3__game_js__["a" /* default */]();
		this.gameManager = new __WEBPACK_IMPORTED_MODULE_4__game_manager_js__["a" /* default */]();

		this.router = new __WEBPACK_IMPORTED_MODULE_6__modules_router_js__["a" /* default */]();
		this.mediator = new __WEBPACK_IMPORTED_MODULE_5__game_mediator_js__["a" /* default */]();

		this.render();

		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_7__game_events_js__["a" /* default */].GAME_START, this.onStartGame.bind(this));
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_7__game_events_js__["a" /* default */].QUIT_CONFIRMED, this.onQuitConfirm.bind(this));
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_7__game_events_js__["a" /* default */].EXIT_TO_MENU, this.onExit.bind(this));
	}

	onStartGame() {
		this.get().removeChild(this.startSubView.get());
		this.get().appendChild(this.gameSubView.get());
		this.mediator.emit(__WEBPACK_IMPORTED_MODULE_7__game_events_js__["a" /* default */].PLAY_NEW_GAME);
	}

	onQuitConfirm() {
		this.get().removeChild(this.gameSubView.get());
		this.get().appendChild(this.startSubView.get());
	}

	onExit() {
		this.router.go('/');
	}

	render() {
		this.get().appendChild(this.startSubView.get());
	}

	loginSwitch(user) {
		this.gameSubView.loginSwitch(user);
	}

	unloginSwitch(user) {
		this.gameSubView.unloginSwitch(user);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SinglePlayer;



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Link_link_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_router_js__ = __webpack_require__(1);






class Back extends __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'back',
			align: 'left'
		});
		this.link = new __WEBPACK_IMPORTED_MODULE_1__Link_link_js__["a" /* default */]('', {
			class: 'back__button'
		});
		this.image = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('img', {
			class: 'back__image',
			src: './img/back.png'
		});
		this.text = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('p');
		this.text.get().innerHTML = 'Обратно в меню';

		this.render();
	}

	onclick(callback) {
		this.link.on('click', () => {
			callback();
		})
	}

	render() {
		this.get().appendChild(this.link.get());
		this.link.get().appendChild(this.image.get());
		this.get().appendChild(this.text.get());
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Back;



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);




class Button extends __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */] {
	constructor(text = '', attrs = {}) {
		attrs.type = 'submit';
		super('button', attrs);
		this.get().innerHTML = text;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Button;



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Link_link_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_authorize_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_router_js__ = __webpack_require__(1);







class Greeting extends __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */] {
	constructor(name) {
		super('div', {
			class: 'greeting'
		});
		this.greetingBlock = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('div', {
			align: 'right',
			class: 'greeting__text-block'
		});
		this.entryBy = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('h3', {
			class: 'greeting__text'
		});
		this.entryBy.get().innerHTML = 'Вы вошли как ';
		this.username = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('h2', {
			class: 'greeting__text username'
		});
		this.username.get().innerHTML = name;
		this.noAuth = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('div', {
			align: 'right',
			class: 'greeting__button-block no-authorized'
		});
		this.auth = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('div', {
			align: 'right',
			class: 'greeting__button-block authorized'
		});
		this.registerButton = new __WEBPACK_IMPORTED_MODULE_1__Link_link_js__["a" /* default */]('Регистрация', {
			class: 'greeting__button'
		});
		this.loginButton = new __WEBPACK_IMPORTED_MODULE_1__Link_link_js__["a" /* default */]('Вход', {
			class: 'greeting__button'
		});
		this.exitButton = new __WEBPACK_IMPORTED_MODULE_1__Link_link_js__["a" /* default */]('Выйти', {
			class: 'greeting__button'
		});

		this.render();
	}

	render() {
		this.get().appendChild(this.greetingBlock.get());
		this.greetingBlock.get().appendChild(this.entryBy.get());
		this.greetingBlock.get().appendChild(this.username.get());
		this.get().appendChild(this.noAuth.get());
		this.get().appendChild(this.auth.get());
		this.noAuth.get().appendChild(this.registerButton.get());
		this.noAuth.get().appendChild(this.loginButton.get());
		this.auth.get().appendChild(this.exitButton.get());
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Greeting;



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Form_form_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Input_input_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FormButton_formbutton_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FormMessage_formmessage_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_userservice_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_authorize_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_router_js__ = __webpack_require__(1);










class LoginForm extends __WEBPACK_IMPORTED_MODULE_0__Form_form_js__["a" /* default */] {
	constructor() {
		super();
		this.message = new __WEBPACK_IMPORTED_MODULE_3__FormMessage_formmessage_js__["a" /* default */]();
		this.login = new __WEBPACK_IMPORTED_MODULE_1__Input_input_js__["a" /* default */]('Логин', {
			type: 'text',
			placeholder: 'Введите логин',
			required: 'true'
		});
		this.pass = new __WEBPACK_IMPORTED_MODULE_1__Input_input_js__["a" /* default */]('Пароль', {
			type: 'password',
			placeholder: 'Введите пароль',
			required: 'true'
		});
		this.button = new __WEBPACK_IMPORTED_MODULE_2__FormButton_formbutton_js__["a" /* default */]('Войти', {
			class: 'btn btn-default btn-lg'
		});

		this.render();
	}

	render() {
		this.get().appendChild(this.message.get());
		this.get().appendChild(this.login.get());
		this.get().appendChild(this.pass.get());
		this.get().appendChild(this.button.get());
	}

	onsubmit(callback) {
		this.on('submit', () => {
			callback();
		})
	}

	validate() {
		const login = this.login.input.get().value;
		const pass = this.pass.input.get().value;

		this.data = {
			login: login, 
			password: pass
		};

		return true;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LoginForm;



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Link_link_js__ = __webpack_require__(8);




class MenuButton extends __WEBPACK_IMPORTED_MODULE_0__Link_link_js__["a" /* default */] {
	constructor(text, attrs) {
		super(text, attrs);
		this.get().classList.add('menu__button');
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MenuButton;



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Form_form_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Input_input_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FormButton_formbutton_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_userservice_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_authorize_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_router_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__FormMessage_formmessage_js__ = __webpack_require__(12);










class RegisterForm extends __WEBPACK_IMPORTED_MODULE_0__Form_form_js__["a" /* default */] {
	constructor() {
		super();
		this.message = new __WEBPACK_IMPORTED_MODULE_6__FormMessage_formmessage_js__["a" /* default */]();
		this.email = new __WEBPACK_IMPORTED_MODULE_1__Input_input_js__["a" /* default */]('E-Mail', {
			type: 'text',
			placeholder: 'Введите ваш E-Mail'
		});
		this.login = new __WEBPACK_IMPORTED_MODULE_1__Input_input_js__["a" /* default */]('Логин', {
			type: 'text',
			placeholder: 'Введите ваш логин',
			required: 'true'
		});
		this.pass = new __WEBPACK_IMPORTED_MODULE_1__Input_input_js__["a" /* default */]('Пароль', {
			type: 'password',
			placeholder: 'Введите ваш пароль',
			required: 'true'
		});
		this.repeat = new __WEBPACK_IMPORTED_MODULE_1__Input_input_js__["a" /* default */]('Повторите пароль', {
			type: 'password',
			placeholder: 'Повторите ваш пароль',
			required: 'true'
		});
		this.button = new __WEBPACK_IMPORTED_MODULE_2__FormButton_formbutton_js__["a" /* default */]('Зарегистрироваться', {
			class: 'btn btn-default btn-lg'
		});

		this.render();
	}

	render() {
		this.get().appendChild(this.message.get());
		this.get().appendChild(this.email.get());
		this.get().appendChild(this.login.get());
		this.get().appendChild(this.pass.get());
		this.get().appendChild(this.repeat.get());
		this.get().appendChild(this.button.get());
	}

	onsubmit(callback) {
		this.on('submit', () => {
			callback();
		})
	}

	validate() {
		const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;

		const login = this.login.input.get();
		const loginError = this.login.errorBlock.get();
		const email = this.email.input.get();
		const emailError = this.email.errorBlock.get();
		const pass = this.pass.input.get();
		const passError = this.pass.errorBlock.get();
		const passRepeat = this.repeat.input.get();
		const passRepeatError = this.repeat.errorBlock.get();

		loginError.textContent = '';
		emailError.textContent = '';
		passError.textContent = '';
		passRepeatError.textContent = '';

		let result = true;

		if (!regexp.test(email.value)) {
			emailError.textContent = 'Введенный вами E-mail некорректен';
			result = false;
		}
		if (login.value.length > 15 || login.value.length < 5) {
			loginError.textContent = 'Ваш логин должен содержать от 5 до 15 символов';
			result = false;
		}
		if (pass.value.length < 5) {
			passError.textContent = 'Ваш пароль должен содержать не менее 5 символов';
			result = false;
		}
		if (pass.value !== passRepeat.value) {
			passRepeatError.textContent = 'Пароли не совпадают';
			result = false;
		}

		if (!result) {
			pass.value = passRepeat.value = '';
		} else {
			this.data = {email: email.value, login: login.value, password: pass.value};
		}

		return result;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RegisterForm;



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(4);


class Arrow {
	constructor(row) {
		this.settings = new __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */]();
		this.draw = new Konva.Arrow({
			x: this.settings.variantsX + this.settings.variantsXSize * 0.7,
			y: this.settings.variantsY + this.settings.variantsYSize * 0.5 + row * this.settings.betweenVariants,
			points: [-this.settings.variantsXSize * 0.1, 0, this.settings.variantsXSize * 0.1, 0],
			pointerLength: 20,
			pointerWidth: 20,
			fill: 'red',
			stroke: 'red',
			strokeWidth: 4
		})
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Arrow;


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(4);


class CircleTower {
	constructor(name, x, y, radius) {
		this.settings = new __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */]();
		this.draw = new Konva.Circle({
			x: x,
			y: y,
			radius: radius,
			stroke: 'black',
			strokeWidth: 0,
			fill: name.color
		});
		this.kind = name;
		this.bulletes = [];
		this.radiusFight = name.radiusFight;
	}

	fire(enemie) {
		this.bulletes[enemie].push(new Konva.Circle({
			x: this.draw.getX(),
			y: this.draw.getY(),
			radius: this.settings.bulletRadius,
			stroke: 'black',
			strokeWidth: 0,
			fill: this.draw.getFill()
		}));
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CircleTower;


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(4);


class Monster {
	constructor(name) {
		this.settings = new __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */]();
		this.draw = new Konva.RegularPolygon({
			x: this.settings.mapX,
			y: this.settings.mapY,
			sides: 3,
			radius: name.size,
			fill: name.color,
			stroke: 'black',
			strokeWidth: 0
		});
		this.kind = name;
		this.health = name.health;
		this.numberTurns = 0;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Monster;


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(4);


class PentagonTower {
	constructor(name, x, y, radius) {
		this.settings = new __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */]();
		this.draw = new Konva.RegularPolygon({
			x: x,
			y: y,
			sides: 5,
			radius: radius,
			fillRadialGradientStartPoint: 0,
			fillRadialGradientStartRadius: 0,
			fillRadialGradientEndPoint: 0,
			fillRadialGradientEndRadius: radius,
			fillRadialGradientColorStops: [0, name.colors[0], 0.5, name.colors[1], 1, name.colors[2]],
			stroke: 'black',
			strokeWidth: 0
		});
		this.kind = name;
		this.bulletes = [];
		this.radiusFight = name.radiusFight;
	}

	fire(enemie) {
		this.bulletes[enemie].push(new Konva.Circle({
			x: this.draw.getX(),
			y: this.draw.getY(),
			radius: this.settings.bulletRadius,
			stroke: 'black',
			strokeWidth: 0,
			fill: this.kind.colors[0],
		}));
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PentagonTower;


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(4);


class StarTower {
	constructor(name, x, y, radius) {
		this.settings = new __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */]();
		this.draw = new Konva.Star({
			x: x,
			y: y,
			numPoints: 5,
			innerRadius: radius / 2,
			outerRadius: radius,
			radius: radius,
			fillRadialGradientStartPoint: 0,
			fillRadialGradientStartRadius: 0,
			fillRadialGradientEndPoint: 0,
			fillRadialGradientEndRadius: radius,
			fillRadialGradientColorStops: [0, name.colors[0], 0.5, name.colors[1], 1, name.colors[2]],
			stroke: 'black',
			strokeWidth: 0
		});
		this.kind = name;
		this.bulletes = [];
		this.radiusFight = name.radiusFight;
	}

	fire() {
		this.bulletes.push(new Konva.Circle({
			x: this.draw.x,
			y: this.draw.y,
			radius: 5,
			stroke: 'black',
			strokeWidth: 0,
			fill: 'black'
		}));
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StarTower;


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategy_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mediator_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events_js__ = __webpack_require__(7);




class GameManager {
	constructor(strategy) {
		this.mediator = new __WEBPACK_IMPORTED_MODULE_1__mediator_js__["a" /* default */]();

		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_2__events_js__["a" /* default */].PLAY_NEW_GAME, this.start.bind(this));
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_2__events_js__["a" /* default */].PLAY_AGAIN, this.start.bind(this));
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_2__events_js__["a" /* default */].GAME_FINISHED, this.end.bind(this));
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_2__events_js__["a" /* default */].QUIT_CONFIRMED, this.end.bind(this));
	}

	gameLoop() {
		this.strategy.gameStep();
		if (this.play) {
			this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
		}
	}

	start() {
		this.strategy = new __WEBPACK_IMPORTED_MODULE_0__strategy_js__["a" /* default */]();
		this.play = true;
		this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
	}

	end() {
		this.play = false;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameManager;


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(4);


class Scene {
	constructor() {
		this.state = {};
		this.settings = new __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */];

		this.gameStage = new Konva.Stage({
			container: this.settings.gameFieldId,
			width : this.settings.gameFieldElement.offsetWidth,
			height : this.settings.gameFieldElement.offsetHeight
		});

		this.gameLayer = new Konva.Layer();

		this.hintsStage = new Konva.Stage({
			container: this.settings.hintsFieldId,
			width : this.settings.hintsFieldElement.offsetWidth,
			height : this.settings.hintsFieldElement.offsetHeight
		})

		this.hintsLayer = new Konva.Layer();
	}

	setState(state) {
		this.state = state;
	}

	render() {

		let length = this.gameLayer.children.length;
		for (let i = 0; i < length; i++) {
			this.gameLayer.children[0].remove();
		}
		
		length = this.hintsLayer.children.length;
		for (let i = 0; i < length; i++) {
			this.hintsLayer.children[0].remove();
		}

		for (let i = 0; i < this.settings.mapSize; i++){
			for (let j = 0; j < this.settings.mapSize; j++){
				this.gameLayer.add(this.state.fields[i][j].field);
				if (this.state.fields[i][j].tower){
					this.gameLayer.add(this.state.fields[i][j].tower.draw);
				}
				
			}
		}
		for (let i = 0; i < this.state.fieldsNewTower.length; i++){
			this.gameLayer.add(this.state.fieldsNewTower[i].draw)
		}

		for (let i = 0; i < this.state.variantRects.length; i++) {
			this.hintsLayer.add(this.state.variantRects[i].draw);
			if (this.state.variantRects[i].text) {
				this.hintsLayer.add(this.state.variantRects[i].text);
			}
		}

		for (let i = 0; i < this.state.variantElements.length; i++){
			this.hintsLayer.add(this.state.variantElements[i].draw);
		}

		for (let i = 0; i < this.state.variantsShow.length; i++){
			this.gameLayer.add(this.state.variantsShow[i].draw);
		}

		for (let i = 0; i < this.state.enemies.length; i++){
			this.gameLayer.add(this.state.enemies[i].draw);
		}

		for (let i = 0; i < this.state.fieldsWithTowers.length; i++){
			for (let j = 0; j < this.state.fieldsWithTowers[i].tower.bulletes.length; j++){
				for (let s = 0; s < this.state.fieldsWithTowers[i].tower.bulletes[j].length; s++){
					this.gameLayer.add(this.state.fieldsWithTowers[i].tower.bulletes[j][s])
				}
			}
		}

		this.gameStage.add(this.gameLayer);
		this.hintsStage.add(this.hintsLayer);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Scene;


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scene_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gameObjects_monster_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__gameObjects_startower_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__variantBlock_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__gameObjects_arrow_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mediator_js__ = __webpack_require__(6);










class SingleStrategy {
	
	constructor() {

		this.mediator = new __WEBPACK_IMPORTED_MODULE_8__mediator_js__["a" /* default */]();
		this.settings = new __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */]();
		this.scene = new __WEBPACK_IMPORTED_MODULE_1__scene_js__["a" /* default */]();

		this.status = 'playerStep';
		this.fields = Array(this.settings.mapSize);
		this.variantRects = [];
		this.variantElements = [];
		this.fieldsWithTowers = [];
		this.variantsShow = [];
		this.enemies = [];
		this.tronHealth = 200;
		this.enemiesNumber = 0;
		this.path = [];

		for (let i = 0; i < 4; i++) {
			this.variantRects[i] = new __WEBPACK_IMPORTED_MODULE_6__variantBlock_js__["a" /* default */](i);
		}

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++){
				this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](
					this.settings.variantCircls[i][j],
					this.settings.variantsX + this.settings.variantsXSize * 0.1 * (j * 2 + 1),
					this.settings.variantsY + this.settings.variantsYSize * 0.5 + i * this.settings.betweenVariants,
					this.settings.variantsYSize / 2 - 7
				))
			}
			this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_7__gameObjects_arrow_js__["a" /* default */](i));
			this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__["a" /* default */](
				this.settings.pentagons[i],
				this.settings.variantsX + this.settings.variantsXSize * 0.9,
				this.settings.variantsY + this.settings.variantsYSize * 0.5 + i * this.settings.betweenVariants,
				this.settings.variantsYSize / 2 - 7
			))
		}

		for (let i = 0; i < 3; i++) {
			this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__["a" /* default */](
				this.settings.pentagons[i],
				this.settings.variantsX + this.settings.variantsXSize * 0.1 * (i * 2 + 1),
				this.settings.variantsY + this.settings.variantsYSize * 0.5 + 3 * this.settings.betweenVariants,
				this.settings.variantsYSize / 2 - 7
			))
		}
		this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_7__gameObjects_arrow_js__["a" /* default */](3));
		this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_5__gameObjects_startower_js__["a" /* default */](
				this.settings.star,
				this.settings.variantsX + this.settings.variantsXSize * 0.9,
				this.settings.variantsY + this.settings.variantsYSize * 0.5 + 3 * this.settings.betweenVariants,
				this.settings.variantsYSize / 2 - 7
			))
		
		for (let i = 0; i < this.settings.mapSize; i++){
			this.fields[i] = Array(this.settings.mapSize);
		}
		
		for (let i = 0; i < this.settings.mapSize; i++){
			for (let j = 0; j < this.settings.mapSize; j++){
				this.fields[j][i] = {
					tower: 0,
					field: new Konva.Rect({
						x: this.settings.mapX + j * this.settings.fieldSize + j * 2,
						y: this.settings.mapY + i * this.settings.fieldSize + i * 2,
						width: this.settings.fieldSize,
						height: this.settings.fieldSize,
						fill: 'grey',
						stroke: 'black',
						strokeWidth: 2
					}),
					coordinates: [j, i],
					ableTower: this.isAbleTower([j, i]),
				};

			
				this.fields[j][i]['field'].addEventListener('click', () => {this.onClickField.call(this, this.fields[j][i])});
				this.fields[j][i]['field'].addEventListener('mouseover', () => {this.onOverField.call(this, this.fields[j][i])});
				this.fields[j][i]['field'].addEventListener('mouseout', () => {this.onOutField.call(this, this.fields[j][i])});

			};
		};

		this.fieldsNewTower = [];
		this.newStones = 0;
		this.towers = {
			circleBlue: 0,
			circleRed: 0,
			circleGreen: 0,
			circleYellow: 0,
			circlePink: 0,
			circleSad: 0,
			pentagonRPS: 0,
			pentagonSBG: 0,
			pentagonGYR: 0,
			star: 0,
		};

		this.state = {};
	}

	gameStep() {
		if (this.status === 'playerStep') {
			this.playerStep();
		} else {
			this.gameWave();
		}

		this.updateState();
		this.scene.setState(this.state);
		this.scene.render();

		if (this.fieldsWithTowers.length > 1) {
			this.mediator.emit('GAME END');
		}
	}

	updateState() {
		this.state = {
			fields: this.fields,
			variantRects: this.variantRects,
			towers: this.towers,
			fieldsNewTower: this.fieldsNewTower,
			variantElements: this.variantElements,
			variantsShow: this.variantsShow,
			enemies: this.enemies,
			fieldsWithTowers: this.fieldsWithTowers, 
		}
	}

	isAbleTower(place) {
		return true;
	}

	onClickField(field) {
		if (field.ableTower){
			this.generateTower(field);
			this.variantsShow = [];
			this.variantRects.length = 4;
		} else if (this.variantRects.length < 5){
			let waveButton = new __WEBPACK_IMPORTED_MODULE_6__variantBlock_js__["a" /* default */](4, "You cant stop monsters");
			this.variantRects.push(waveButton);
		}
		
	}

	onOverField(field) {
		field.field.setStroke(field.ableTower ? 'green' : 'red');
	}

	onOutField(field) {
		field.field.setStroke('black');	
	}

	onClickNewPentagon(field, kind, currentNewTower) {
		if (currentNewTower) {
			for (let i = 0; i < this.fieldsNewTower.length; i++) {
				let xCoord = this.fieldsNewTower[i]['coordinates'][0];
				let yCoord = this.fieldsNewTower[i]['coordinates'][1];
				let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				this.fields[xCoord][yCoord]['tower'] = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
				this.fields[this.fieldsNewTower[i].coordinates[0]][this.fieldsNewTower[i].coordinates[1]].field.setStroke('black');
			}
			this.fieldsNewTower = [];
			this.newStones = 0;
			this.status = 'Wave';
		}
		let x = field.coordinates[0];
		let y = field.coordinates[1];
		let xp = this.settings.mapX + x * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
		let yp = this.settings.mapY + y * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
		let deleteCircles = new Array(...kind.circles);
		for (let i = 0; i < deleteCircles.length; i++){
			if (deleteCircles[i] === (currentNewTower ? currentNewTower.kind.name : field.tower.kind.name)) {
				deleteCircles.splice(i, 1);
			}
		}
		this.fields[x][y].tower = new __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__["a" /* default */](kind, xp, yp, this.settings.fieldSize / 2 - 2);
		for (let i = 0; i < this.fieldsWithTowers.length; i++){
			if (this.fieldsWithTowers[i].tower.kind.name === deleteCircles[0]){
				let xCoord = this.fieldsWithTowers[i].coordinates[0];
				let yCoord = this.fieldsWithTowers[i].coordinates[1];
				let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2);
				let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2);
				this.fields[xCoord][yCoord].tower = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](this.settings.stone, yPixel, xPixel, this.settings.fieldSize / 2 - 2);
				this.fieldsWithTowers.splice(i, 1);
				break;
			};
		};
		for (let i = 0; i < this.fieldsWithTowers.length; i++){
			if (this.fieldsWithTowers[i].tower.kind.name === deleteCircles[1]){
				let xCoord = this.fieldsWithTowers[i].coordinates[0];
				let yCoord = this.fieldsWithTowers[i].coordinates[1];
				let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2);
				let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2);
				this.fields[xCoord][yCoord].tower = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](this.settings.stone, yPixel, xPixel, this.settings.fieldSize / 2 - 2);
				this.fieldsWithTowers.splice(i, 1);
				break;
			};
		};
		this.towers[kind.name]++;
		this.towers[kind.circles[0]]--;
		this.towers[kind.circles[1]]--;
		this.towers[kind.circles[2]]--;
		this.variantsShow = [];
	}

	onClickStayVariant(field, kind, currentNewTower){
		for (let i = 0; i < this.fieldsNewTower.length; i++){
			let xCoord = this.fieldsNewTower[i]['coordinates'][0];
			let yCoord = this.fieldsNewTower[i]['coordinates'][1];
			let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
			let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
			this.fields[xCoord][yCoord]['tower'] = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
			this.fields[this.fieldsNewTower[i].coordinates[0]][this.fieldsNewTower[i].coordinates[1]].field.setStroke('black');
		}
		this.fields[field.coordinates[0]][field.coordinates[1]]['tower'] = currentNewTower ;
		this.towers[currentNewTower.kind.name]++;
		this.fieldsWithTowers.push(field);
		this.fieldsNewTower = [];
		this.variantsShow = [];
		this.newStones = 0;
		this.status = 'Wave';
	}

	onClickWaveButton(){
		this.newStones = 0;
		this.variantRects.length = 4;
		this.status = 'Wave';
		this.variantsShow = [];
	}

	generateTower(field) {

		let circlePro = this.settings.circles[Math.floor(Math.random() * this.settings.circles.length)]

		let circle = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](
			circlePro, 
			field['field'].getX() + this.settings.fieldSize / 2,
			field['field'].getY() + this.settings.fieldSize / 2,
			this.settings.fieldSize / 2 - 2
		);

		field['field'].removeEventListener('click', () => {this.onClickField.call(this, field)});
		field['field'].removeEventListener('mouseover', () => {this.onOverField.call(this, field)});
		circle.draw.addEventListener('click', () => { this.createVariants.call(this, field) } ); 
		circle['coordinates'] = field['coordinates'];
		this.fieldsNewTower.push(circle);
		this.newStones++;

		if (this.newStones >= 5) {
			for (let i = 0; i < this.settings.mapSize; i++){
				for (let j = 0; j < this.settings.mapSize; j++){
					this.fields[i][j]['field'].removeEventListener('click', () => {this.onClickField.call(this, this.fields[i][j])});
					this.fields[i][j]['field'].removeEventListener('mouseover', () => {this.onOverField.call(this, this.fields[i][j])});
				}
			}
			for (let i = 0; i < this.fieldsNewTower.length; i++){
				let x = this.fieldsNewTower[i].coordinates[0];
				let y = this.fieldsNewTower[i].coordinates[1];
				this.fields[x][y].field.setStroke('green');
			}
		}
	}

	createVariants(field) {
		this.variantsShow = [];

		let currentNewTower;
		let variantStay;
		this.variantsShow = [];
		for (let i = 0; i < this.fieldsNewTower.length; i++) {
			if ((field['field'].getX() + this.settings.fieldSize / 2 == this.fieldsNewTower[i].draw.getX()) && (field['field'].getY() + this.settings.fieldSize / 2 == this.fieldsNewTower[i].draw.getY()) && (this.newStones >= 5)){
				currentNewTower = this.fieldsNewTower[i];
				variantStay = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](
					currentNewTower['kind'],
					this.settings.variantX,
					this.settings.variantY,
					this.settings.variantRadius
				);
			};
		};
		if (currentNewTower){
			this.towers[currentNewTower.kind.name]++;
			this.fields[field.coordinates[0]][field.coordinates[1]]['tower'] = currentNewTower;
		}
		let variants = this.listVariants(field);
		if (currentNewTower){
			this.towers[currentNewTower.kind.name]--;
			this.fields[field.coordinates[0]][field.coordinates[1]]['tower']['tower'] = 0
		}
		let alfa = 6.28 / (variants.length + 1);
		let beta = alfa;
		let variantX = field['field'].getX() + this.settings.fieldSize / 2 - this.settings.fieldSize;
		let variantY = field['field'].getY() + this.settings.fieldSize / 2;
		for (let i = 0; i < variants.length; i++){
			let variant = new __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__["a" /* default */](
				variants[i],
				variantX,
				variantY,
				this.settings.variantRadius
			);
			let cNewTower = currentNewTower ? currentNewTower : undefined;
			variant.draw.addEventListener('click', () => {this.onClickNewPentagon.call(this, field, variant.kind, cNewTower)});
			variantX = field['field'].getX() + this.settings.fieldSize / 2 - Math.cos(beta) * this.settings.fieldSize;
			variantY = field['field'].getY()  + this.settings.fieldSize / 2 - Math.sin(beta) * this.settings.fieldSize;
			beta = beta + alfa;
			this.variantsShow.push(variant);
		}
		if (currentNewTower){
			variantStay = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](
				currentNewTower.kind,
				variantX,
				variantY,
				this.settings.variantRadius
			);
			variantStay.draw.addEventListener('click', () => {this.onClickStayVariant.call(this, field, variantStay.kind, currentNewTower)});
			this.variantsShow.push(variantStay);
		};
	}

	listVariants(field) {
		let variants = [];
		if (((this.towers['circleRed'] > 0) && (this.towers['circlePink'] > 0) && (this.towers['circleSad'] > 0)) && ((field.tower.kind == this.settings.circleRed) || (field.tower.kind == this.settings.circlePink) || (field.tower.kind == this.settings.circleSad))){
		variants.push(this.settings.pentagonRPS);
		};
		if (((this.towers['circleSad'] > 0) && (this.towers['circleBlue'] > 0) && (this.towers['circleGreen'] > 0)) && ((field.tower.kind == this.settings.circleSad) || (field.tower.kind == this.settings.circleBlue) || (field.tower.kind == this.settings.circleGreen))){
			variants.push(this.settings.pentagonSBG);
		};
		if (((this.towers['circleGreen'] > 0) && (this.towers['circleYellow'] > 0) && (this.towers['circleRed'] > 0)) && ((field.tower.kind == this.settings.circleGreen) || (field.tower.kind == this.settings.circleYellow) || (field.tower.kind == this.settings.circleRed))){
			variants.push(this.settings.pentagonGYR);
		};
		return variants;
	}

	playerStep() {

	}

	gameWave() {

		if (this.path.length === 0) {
			this.path = this.findPath(this.settings.checkpoints);
		}

		if (this.enemiesNumber < 20){
			this.enemies.push(new __WEBPACK_IMPORTED_MODULE_2__gameObjects_monster_js__["a" /* default */](this.settings.triangl));
			for (let i = 0; i < this.fieldsWithTowers.length; i++){
				this.fieldsWithTowers[i].tower.bulletes.push([]);
			}
			this.enemiesNumber++;
		}

		for (let i = 0; i < this.fieldsWithTowers.length; i++){
			for (let j = 0; j < this.enemies.length; j++){
				let distY = this.enemies[j].draw.getY() - this.fieldsWithTowers[i].tower.draw.getY();
				let distX = this.enemies[j].draw.getX() - this.fieldsWithTowers[i].tower.draw.getX();
				if (Math.pow(distX * distX + distY * distY, 0.5) <= this.fieldsWithTowers[i].tower.radiusFight){
					this.fieldsWithTowers[i].tower.fire(j);
					break;
				};
			};
			for (let j = 0; j < this.fieldsWithTowers[i].tower.bulletes.length; j++){
				for (let s = 0; s < this.fieldsWithTowers[i].tower.bulletes[j].length; s++){
					let distY = this.enemies[j].draw.getY() - this.fieldsWithTowers[i].tower.bulletes[j][s].getY();
					let distX = this.enemies[j].draw.getX() - this.fieldsWithTowers[i].tower.bulletes[j][s].getX();
					if (Math.abs(distX) < this.enemies[j].kind.size && Math.abs(distY) < this.enemies[j].kind.size){
						this.fieldsWithTowers[i].tower.bulletes[j].splice(s, 1);
						this.enemies[j].health -= 10;
						continue;
					}
					let stepX = this.settings.bulletStep / Math.pow(1 + Math.pow(distY/distX, 2), 0.5) * Math.abs(distX) / distX;
					let stepY = Math.pow(this.settings.bulletStep * this.settings.bulletStep - stepX * stepX, 0.5) * Math.abs(distY) / distY;
					this.fieldsWithTowers[i].tower.bulletes[j][s].setX(this.fieldsWithTowers[i].tower.bulletes[j][s].getX() + stepX);
					this.fieldsWithTowers[i].tower.bulletes[j][s].setY(this.fieldsWithTowers[i].tower.bulletes[j][s].getY() + stepY);
				};
			};
		};

		if (this.enemies[0].numberTurns === this.path.length) {
			this.enemies.splice(0, 1);
			for (let s = 0; s < this.fieldsWithTowers.length; s++){
				this.fieldsWithTowers[s].tower.bulletes.splice(0, 1);
			}
		}

		for (let i = 0; i < this.enemies.length; i++){
			let place = this.path[this.enemies[i].numberTurns];
			let distX = -this.enemies[i].draw.getX() + (this.settings.mapX + place[0] * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2);
			let distY = -this.enemies[i].draw.getY() + (this.settings.mapY + place[1] * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2);

			if (Math.abs(distX) < this.enemies[i].kind.size && Math.abs(distY) < this.enemies[i].kind.size){
				this.enemies[i].numberTurns++;
				continue;
			}

			let stepX = this.settings.monsterStep / Math.pow(1 + Math.pow(distY/distX, 2), 0.5) * Math.abs(distX) / distX;
			let stepY = Math.pow(this.settings.monsterStep * this.settings.monsterStep - stepX * stepX, 0.5) * Math.abs(distY) / distY;
			this.enemies[i].draw.setX(this.enemies[i].draw.getX() + stepX);
			this.enemies[i].draw.setY(this.enemies[i].draw.getY() + stepY);
			if (this.enemies[i].health <= 0) {
				this.enemies.splice(i, 1);
				for (let j = 0; j < this.fieldsWithTowers.length; j++){
					this.fieldsWithTowers[j].tower.bulletes.splice(i, 1);
				}
			}
		}

		if (this.enemies.length === 0) {
			this.status = 'playerStep';
			this.enemiesNumber = 0;
			for (let i = 0; i < this.settings.mapSize; i++){
				for (let j = 0; j < this.settings.mapSize; j++){
					this.fields[i][j]['field'].addEventListener('click', () => {this.onClickField.call(this, this.fields[i][j])});
					this.fields[i][j]['field'].addEventListener('mouseover', () => {this.onOverField.call(this, this.fields[i][j])});
					this.fields[i][j].ableTower = this.isAbleTower([i, j]);
				};
			};
			for (let i = 0; i < this.fieldsWithTowers.length; i++){
				this.fields[this.fieldsWithTowers[i].coordinates[0]][this.fieldsWithTowers[i].coordinates[1]].tower.bulletes = [];
			}
			this.path = [];
		};
	}

	findPath(checkpoints) {

		checkpoints.push(this.settings.finish);

		let matrix = Array(this.settings.mapSize);
		for (let i = 0; i < this.settings.mapSize; ++i) {
			matrix[i] = Array(this.settings.mapSize);
		}

		for (let i = 0; i < this.settings.mapSize; ++i) {
			for (let j = 0; j < this.settings.mapSize; ++j) {
				if (this.fields[i][j].tower && this.fields[i][j].tower !== 0) {
					matrix[i][j] = 1;
				} else {
					matrix[i][j] = 0;
				}
			}
		}

		const finder = new PF.BiAStarFinder({
			allowDiagonal: true,
			heuristic: PF.Heuristic.euclidean
		});

		let path = [];
		let curStart = this.settings.start;
		for (let i = 0; i < checkpoints.length; i++) {
			if (i > 0) {
				curStart = checkpoints[i-1];
			}
			
			let subStart = curStart;
			let subFinish = checkpoints[i];

			const grid = new PF.Grid(matrix);
			let subPath = finder.findPath(subStart[0], subStart[1], subFinish[0], subFinish[1], grid);

			path = path.concat(subPath);
		}

		return(path);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SingleStrategy;



/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(4);


class VariantBlock {
	constructor(number, text) {
		this.settings = new __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */];

		if (text) {
			this.text = new Konva.Text({
				x: this.settings.variantsX,
				y: this.settings.variantsY + number * this.settings.betweenVariants,
				width: this.settings.variantsXSize,
				text: text,
				fontSize: 18,
				fill: 'red',
				padding: 15,
				align: 'center',
			});
		}

		this.draw = new Konva.Rect({
			x: this.settings.variantsX,
			y: this.settings.variantsY + number * this.settings.betweenVariants,
			width: this.settings.variantsXSize,
			height: (text ? this.text.getHeight() : this.settings.variantsYSize),
			fill: 'grey',
			stroke: 'black',
			strokeWidth: 2
		});

		// let width = this.settings.hintsFieldElement.offsetWidth;
		// let height = this.settings.hintsFieldElement.offsetHeight;

		// this.draw = new Konva.Rect({
		// 		x: width * 0.05,
		// 		y: this.settings.mapY + number * height * 0.15,
		// 		width: width * 0.9,
		// 		height: height * 0.1,
		// 		fill: 'grey',
		// 		stroke: 'black',
		// 		strokeWidth: 2
		// });
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = VariantBlock;



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_menu_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_login_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_registration_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_about_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_leaderboard_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_singleplayer_singleplayer_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_multiplayer_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_authorize_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_http_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modules_router_js__ = __webpack_require__(1);













const http = new __WEBPACK_IMPORTED_MODULE_8__modules_http_js__["a" /* default */]();
const router = new __WEBPACK_IMPORTED_MODULE_9__modules_router_js__["a" /* default */]();

http.BaseURL = 'https://gem-td-back.herokuapp.com';

router.register('/', new __WEBPACK_IMPORTED_MODULE_0__views_menu_js__["a" /* default */]());
router.register('/login/', new __WEBPACK_IMPORTED_MODULE_1__views_login_js__["a" /* default */]());
router.register('/register/', new __WEBPACK_IMPORTED_MODULE_2__views_registration_js__["a" /* default */]());
router.register('/about/', new __WEBPACK_IMPORTED_MODULE_3__views_about_js__["a" /* default */]());
router.register('/leaders/', new __WEBPACK_IMPORTED_MODULE_4__views_leaderboard_js__["a" /* default */]());
router.register('/game/', new __WEBPACK_IMPORTED_MODULE_5__views_singleplayer_singleplayer_js__["a" /* default */]());
router.register('/multiplayer/', new __WEBPACK_IMPORTED_MODULE_6__views_multiplayer_js__["a" /* default */]());

router.start();

const auth = new __WEBPACK_IMPORTED_MODULE_7__services_authorize_js__["a" /* default */]();


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_mediator_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_events_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_authorize_js__ = __webpack_require__(3);








class SinglePlayerGame extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'singleplayer__game'
		});
		
		this.mediator = new __WEBPACK_IMPORTED_MODULE_2__game_mediator_js__["a" /* default */]();

		this.get().removeChild(this.back.get());

		this.leftBar = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-3 col-sm-3 col-md-3 col-lg-3 left-bar',
			align: 'center'
		});
		this.gameField = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-6 col-sm-6 col-md-6 col-lg-6 game-field',
			id: 'game-field'
		});
		this.hints = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-3 col-sm-3 col-md-3 col-lg-3 hints-field',
			id: 'hints-field'
		});

		this.createLeftBar();
		this.createQuitWindow();
		this.createFinishWindow();

		this.render();
		this.makeListeners();
	}

	createLeftBar() {
		this.quitBlock = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'left-bar__quit',
			align: 'center'
		});
		this.quitButton = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('button');
		this.quitButton.get().innerHTML = 'Выйти';
		this.userBlock = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'left-bar__user',
			align: 'center'
		});

		this.userBlock_username = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div');
		this.userBlock_username_title = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('b');
		this.userBlock_username_text = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('span');
		this.userBlock_username_title.get().innerHTML = 'Игрок: '
		this.userBlock_score = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div');
		this.userBlock_score_title = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('b');
		this.userBlock_score_text = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('span');
		this.userBlock_score_title.get().innerHTML = 'Результат: '
		this.userBlock_score_text.get().innerHTML = '0'
		this.HPBlock = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'left-bar__HP'
		})
		this.HPBlock.get().innerHTML = 'HP: 100%'
	}

	createQuitWindow() {
		this.quitConfirm = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'quit-confirm',
			align: 'center'
		})
		this.quitText = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'quit-confirm__text'
		})
		this.quitButtons = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'quit-confirm__buttons'
		})
		this.quitText.get().innerHTML = 'Точно выйти?';
		this.quitConfirmButton = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('button');
		this.quitConfirmButton.get().innerHTML = 'Точно выйти';
		this.quitCancelButton = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('button');
		this.quitCancelButton.get().innerHTML = 'Нет, не точно';
	}

	createFinishWindow() {
		this.finishWindow = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'finish'
		})
		this.finishText = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'finish__text'
		})
		this.finishText.get().innerHTML = 'Игра окончена! Вы молодец!';
		this.finishButtons = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'finish__buttons'
		})
		this.exitButton = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('button');
		this.exitButton.get().innerHTML = 'Выйти в меню';
		this.againButton = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('button');
		this.againButton.get().innerHTML = 'Начать сначала';
	}

	makeListeners() {

		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].GAME_FINISHED, () => {
			this.get().appendChild(this.finishWindow.get());
		})

		this.quitButton.on('click', () => {
			this.get().appendChild(this.quitConfirm.get());
		})

		this.quitCancelButton.on('click', () => {
			this.get().removeChild(this.quitConfirm.get());
		})

		this.quitConfirmButton.on('click', () => {
			this.get().removeChild(this.quitConfirm.get());
			this.mediator.emit(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].QUIT_CONFIRMED);
		})

		this.exitButton.on('click', () => {
			this.get().removeChild(this.finishWindow.get());
			this.mediator.emit(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].EXIT_TO_MENU);
		})

		this.againButton.on('click', () => {
			this.get().removeChild(this.finishWindow.get());
			this.mediator.emit(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].PLAY_AGAIN);
		})
	}

	render() {
		this.get().appendChild(this.leftBar.get());
		this.get().appendChild(this.gameField.get());
		this.get().appendChild(this.hints.get());

		this.leftBar.get().appendChild(this.quitBlock.get());
		this.leftBar.get().appendChild(this.userBlock.get());
		this.leftBar.get().appendChild(this.HPBlock.get());

		this.userBlock.get().appendChild(this.userBlock_username.get());
		this.userBlock.get().appendChild(this.userBlock_score.get());
		this.userBlock_username.get().appendChild(this.userBlock_username_title.get());
		this.userBlock_username.get().appendChild(this.userBlock_username_text.get());
		this.userBlock_score.get().appendChild(this.userBlock_score_title.get());
		this.userBlock_score.get().appendChild(this.userBlock_score_text.get());

		this.quitBlock.get().appendChild(this.quitButton.get());

		this.quitConfirm.get().appendChild(this.quitText.get());
		this.quitConfirm.get().appendChild(this.quitButtons.get());
		this.quitButtons.get().appendChild(this.quitConfirmButton.get());
		this.quitButtons.get().appendChild(this.quitCancelButton.get());

		this.finishWindow.get().appendChild(this.finishText.get());
		this.finishWindow.get().appendChild(this.finishButtons.get());
		this.finishButtons.get().appendChild(this.exitButton.get());
		this.finishButtons.get().appendChild(this.againButton.get());
	}

	loginSwitch(user) {
		this.userBlock_username_text.get().innerHTML = user;
	}

	unloginSwitch(user) {
		this.loginSwitch(user);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SinglePlayerGame;



/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_mediator_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_events_js__ = __webpack_require__(7);







class SinglePlayerStart extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'singleplayer__start'
		});

		this.mediator = new __WEBPACK_IMPORTED_MODULE_2__game_mediator_js__["a" /* default */]();

		this.padd = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'padd'
		});
		this.list = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'list',
			align: 'center'
		});
		this.newGame = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('button', {
			align: 'center'
		});
		this.newGame.get().innerHTML = 'Начать игру';

		this.render();
		this.makeListeners();
	}

	makeListeners() {
		this.newGame.on('click', (event) => {
			event.preventDefault();
			this.mediator.emit(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].GAME_START);
		})
	}

	render() {
		this.get().appendChild(this.padd.get());
		this.padd.get().appendChild(this.list.get());
		this.list.get().appendChild(this.newGame.get());
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SinglePlayerStart;



/***/ })
/******/ ]);