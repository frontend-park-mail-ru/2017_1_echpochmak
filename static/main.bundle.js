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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
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
		this.username = '';

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
			this.loginSwitch(this.username)
		} else {
			this.unloginSwitch(this.username)
		}

		return true;
	}

	loginSwitch(name) {
		this.currentView.loginSwitch(name);
		this.loginned = true;
		this.username = name;
	}

	unloginSwitch(name) {
		this.currentView.unloginSwitch(name);
		this.loginned = false;
		this.username = name;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Router;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Back_back_js__ = __webpack_require__(18);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__userservice_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_router_js__ = __webpack_require__(1);





class Authorize {
	constructor() {
		if (Authorize.__instance) {
			return Authorize.__instance;
		}

		this.service = new __WEBPACK_IMPORTED_MODULE_0__userservice_js__["a" /* default */]();
		this.router = new __WEBPACK_IMPORTED_MODULE_1__modules_router_js__["a" /* default */]();
		this.anonymUser = 'Гость';
		
		this.showForGuest();

		this.service.getUsername(xhr => {
			if (xhr.login) {
				this.showForUser(xhr.login);
			} else {
				this.showForGuest();
			}
		});

		Authorize.__instance = this;
	}

	authorize() {
		this.service.getUsername(xhr => {
			if (xhr.status === 'ok') {
				this.showForUser(xhr.login);
			}
		});
	}

	deauthorize() {
		this.service.logout(xhr => {
			this.showForGuest();
		});
	}

	showForUser(user) {
		this.router.loginSwitch(user);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_http_js__ = __webpack_require__(6);




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

	getUsersList(callback) {
		this.http.get('/api/users', null, xhr => {
			this.func(callback, xhr);
		});
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UserService;



/***/ }),
/* 5 */
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
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Button_button_js__ = __webpack_require__(19);





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
/* 9 */
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
/* 10 */
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
/* 11 */
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
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_userservice_js__ = __webpack_require__(4);






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
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_LoginForm_loginform_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_userservice_js__ = __webpack_require__(4);
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

		this.form.onsubmit((event) => {

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
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_MenuButton_menubutton_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Greeting_greeting_js__ = __webpack_require__(20);
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
/* 15 */
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_RegisterForm_registerform_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_router_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_userservice_js__ = __webpack_require__(4);
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
		this.form.onsubmit((event) => {

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
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__start_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_js__ = __webpack_require__(25);







class SinglePlayer extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'singleplayer'
		});
		
		this.startSubView = new __WEBPACK_IMPORTED_MODULE_2__start_js__["a" /* default */]();
		this.gameSubView = new __WEBPACK_IMPORTED_MODULE_3__game_js__["a" /* default */]();

		this.render();
		this.makeListeners();
	}

	makeListeners() {
		this.startSubView.newGame.on('click', (event) => {
			event.preventDefault();

			this.get().removeChild(this.startSubView.get());
			this.get().appendChild(this.gameSubView.get());
		})
	}

	render() {
		this.get().appendChild(this.startSubView.get());
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SinglePlayer;



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Link_link_js__ = __webpack_require__(5);
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
/* 19 */
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
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Link_link_js__ = __webpack_require__(5);
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
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Form_form_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Input_input_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FormButton_formbutton_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FormMessage_formmessage_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_userservice_js__ = __webpack_require__(4);
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
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Link_link_js__ = __webpack_require__(5);




class MenuButton extends __WEBPACK_IMPORTED_MODULE_0__Link_link_js__["a" /* default */] {
	constructor(text, attrs) {
		super(text, attrs);
		this.get().classList.add('menu__button');
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MenuButton;



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Form_form_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Input_input_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FormButton_formbutton_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_userservice_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_authorize_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_router_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__FormMessage_formmessage_js__ = __webpack_require__(9);










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
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_menu_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_login_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_registration_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_about_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_leaderboard_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_singleplayer_singleplayer_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_multiplayer_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_authorize_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_http_js__ = __webpack_require__(6);
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
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);





class SinglePlayerGame extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'singleplayer__game'
		});
		
		this.leftBar = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-3 col-sm-3 col-md-3 col-lg-3 left-bar'
		});
		this.gameField = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-6 col-sm-6 col-md-6 col-lg-6 game-field',
			id: 'game-field'
		});
		this.hints = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-3 col-sm-3 col-md-3 col-lg-3 hints-field',
			id: 'hints-field'
		})

		this.render();
	}

	render() {
		this.get().appendChild(this.leftBar.get());
		this.get().appendChild(this.gameField.get());
		this.get().appendChild(this.hints.get());
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SinglePlayerGame;



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);





class SinglePlayerStart extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'singleplayer__start'
		});
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