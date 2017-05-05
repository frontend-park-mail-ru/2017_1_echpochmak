/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 54);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Back_back_js__ = __webpack_require__(39);
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

		this.green_background = '/img/back_green.jpg';
		this.white_background = '/img/back_white.jpg';
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

		this.checkpoints = [[0, 0], [0, this.mapSize - 1], [this.mapSize - 1, 0], [this.mapSize - 1, this.mapSize - 1]];

		let minSize = Math.min(this.gameFieldElement.offsetHeight, this.gameFieldElement.offsetWidth)
		this.fullMapSize = minSize * 0.9;
		this.fieldSize = (this.fullMapSize / this.mapSize) - 2;

		this.mapX = (this.gameFieldElement.offsetWidth - ((this.fieldSize + 2) * this.mapSize)) / 2;
		this.mapY = (this.gameFieldElement.offsetHeight - ((this.fieldSize + 2) * this.mapSize)) / 2;

		this.variantRadius = this.fieldSize * 0.2;
		if (this.variantRadius < 5) {
			this.variantRadius = 5;
		}
		this.bulletStep = 20;
		this.monsterStep = 10;

		this.numberTowersInStep = 3;
		this.addHPInWave = 100;
		this.numberMonstersInWave = 20;
		this.bulletRadius = 5;
		this.laserWidth = 8;
		this.numberChangesColors = 100;
		this.throneHealth = 100;
		this.damage = 1;
		this.addDamageInWave = 1;

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
			size: this.fieldSize * 0.5,
			color: '#00FF00',
			health: 100,
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

		this.variantsX = this.hintsFieldElement.offsetWidth * 0.05;
		this.variantsY = this.mapY;
		this.variantsXSize = this.hintsFieldElement.offsetWidth * 0.9;
		this.variantsYSize = this.fullMapSize * 0.1;
		this.betweenVariants = this.fullMapSize * 0.15;

		this.variantCircls = [
			[this.circleRed, this.circlePink, this.circleSad],
			[this.circleSad, this.circleBlue, this.circleGreen],
			[this.circleGreen, this.circleYellow, this.circleRed]
		];

		Settings.__instance = this;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Settings;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_http_js__ = __webpack_require__(11);




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
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Events = {
	GAME_START: 		1,
	PLAY_NEW_GAME: 		2,
	TRY_QUIT: 			3,
	QUIT_CONFIRMED: 	4,
	QUIT_CANCELED: 		5,
	GAME_FINISHED: 		6,
	PLAY_AGAIN: 		7,
	EXIT_TO_MENU: 		8,
	NEW_WAVE_STARTED: 	9,
	GET_SCORE: 			10,
	THRONE_DAMAGE: 		11,
}

/* harmony default export */ __webpack_exports__["a"] = (Events);

/***/ }),
/* 9 */
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
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Button_button_js__ = __webpack_require__(40);





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
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__formmessage_scss__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__formmessage_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__formmessage_scss__);






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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__input_scss__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__input_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__input_scss__);






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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(7)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js!../../node_modules/sass-loader/index.js!./styles.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js!../../node_modules/sass-loader/index.js!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 17 */
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
/* 18 */
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
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_LoginForm_loginform_js__ = __webpack_require__(42);
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
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_MenuButton_menubutton_js__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Greeting_greeting_js__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_router_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_authorize_js__ = __webpack_require__(3);









class Menu extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'menu'
		});

		this.greeting = new __WEBPACK_IMPORTED_MODULE_3__components_Greeting_greeting_js__["a" /* default */]('Гость');
		
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

		this.render();
		this.makeListeners();
	}

	render() {
		this.get().removeChild(this.back.get());

		this.get().appendChild(this.greeting.get());
		this.get().appendChild(this.padd.get());
		this.padd.get().appendChild(this.line1.get());
		this.padd.get().appendChild(this.line2.get());
		this.line1.get().appendChild(this.singleButton.get());
		this.line1.get().appendChild(this.multiButton.get());
		this.line2.get().appendChild(this.aboutButton.get());
		this.line2.get().appendChild(this.leaderButton.get());
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
/* 21 */
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
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_RegisterForm_registerform_js__ = __webpack_require__(44);
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
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__start_js__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_js__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__game_manager_js__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__game_mediator_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_router_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__game_events_js__ = __webpack_require__(8);











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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".back {\n  font-size: 18pt;\n  color: #3B1A1A;\n  padding-left: 1%;\n  padding-top: 1%; }\n  .back__button {\n    display: inline-block;\n    -left: 4%; }\n  .back__image {\n    max-width: 14%;\n    max-height: auto; }\n", ""]);

// exports


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".form__message {\n  font-size: 20px;\n  color: red; }\n", ""]);

// exports


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".greeting {\n  width: 99%;\n  max-height: 10%; }\n  .greeting__text-block {\n    max-height: 5vh;\n    height: 50%;\n    margin-bottom: 25px; }\n  .greeting__text {\n    color: #3B1A1A;\n    display: inline; }\n  .greeting__button {\n    border: 1px solid #0a3c59;\n    background: #826639;\n    background: gradient(linear, left top, left bottom, from(#c47d43), to(#826639));\n    background: linear-gradient(top, #c47d43, #826639);\n    background-image: -ms-linear-gradient(top, #c47d43 0%, #826639 100%);\n    padding: 7px 14px;\n    border-radius: 6px;\n    box-shadow: rgba(255, 255, 255, 0.4) 0 0px 0, inset rgba(255, 255, 255, 0.4) 0 0px 0;\n    text-shadow: #0e496e 0 1px 0;\n    color: #ffe69c;\n    font-size: 17px;\n    text-decoration: none;\n    vertical-align: middle;\n    margin-left: 5px; }\n    .greeting__button-block {\n      max-height: 5vh;\n      height: 50%; }\n    .greeting__button:hover {\n      border: 1px solid #0a3c59;\n      text-shadow: #1e4158 0 1px 0;\n      background: #5c4a2f;\n      background: gradient(linear, left top, left bottom, from(#b87b4d), to(#5c4a2f));\n      background: linear-gradient(top, #b87b4d, #5c4a2f);\n      background-image: linear-gradient(top, #b87b4d 0%, #5c4a2f 100%);\n      color: #e6c163; }\n    .greeting__button:active {\n      text-shadow: #1e4158 0 1px 0;\n      border: 1px solid #0a3c59;\n      background: #4d2613;\n      background: gradient(linear, left top, left bottom, from(#4d2613), to(#5c4a2f));\n      background: linear-gradient(top, #4d2613, #4d2613);\n      background-image: -ms-linear-gradient(top, #4d2613 0%, #4d2613 100%);\n      color: #c47937; }\n", ""]);

// exports


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".form-input__error-message {\n  color: red;\n  font-size: 15px; }\n\n.form-input__label {\n  font-size: 20pt; }\n", ""]);

// exports


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".menu__button:visited {\n  text-decoration: none; }\n\n.menu__button {\n  display: inline-block;\n  border: 1px solid #64734D;\n  border-radius: 20px;\n  color: #705D07;\n  font-weight: bolder;\n  font-size: 30px;\n  padding: 20px 20px;\n  box-shadow: inset 0 1px 0 0 #C7E69A,inset 0 -1px 0 0 #A0B87B,inset 0 0 0 1px #B8D48E;\n  text-shadow: 0 1px 0 #FFFFFF;\n  background-color: #DBFCA9;\n  text-decoration: none;\n  background-repeat: no-repeat;\n  background-position: 20%;\n  margin-right: 0.5%;\n  margin-left: 0.5%; }\n\n.menu__button:hover, .menu__button:active {\n  background-repeat: no-repeat;\n  text-decoration: none;\n  border-radius: 25px;\n  color: #3B1A1A;\n  background-color: #D3FF91; }\n\n.menu__button_big {\n  background-color: #DBFCA9;\n  width: 305px;\n  height: 275px; }\n\n.menu__button_small {\n  background-color: #DBFCA9;\n  width: 305px; }\n\n.menu__single-button {\n  background-image: url(" + __webpack_require__(35) + "); }\n\n.menu__single-button:hover, .menu__single-button:active {\n  background-image: url(" + __webpack_require__(36) + "); }\n\n.menu__multi-button {\n  background-image: url(" + __webpack_require__(37) + "); }\n\n.menu__multi-button:hover, .menu__multi-button:active {\n  background-image: url(" + __webpack_require__(38) + "); }\n", ""]);

// exports


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "body {\n  font-family: 'Comic Sans MS', 'Arial';\n  background-size: auto;\n  background-attachment: fixed; }\n\n.list {\n  position: relative;\n  background-color: #DBFCA9;\n  margin-left: 15%;\n  margin-right: 15%;\n  margin-top: 3%;\n  margin-bottom: 3%;\n  padding: 3%;\n  font-size: 18pt;\n  border-radius: 20px;\n  border: 1px solid #64734D; }\n  .list __header {\n    font-size: 30pt;\n    margin-bottom: 3%;\n    margin-top: -2%; }\n    .list __header hr {\n      color: #64734D;\n      background-color: #64734D;\n      opacity: 1;\n      height: 1px;\n      border: 0; }\n  .list__sub-header {\n    font-size: 22pt;\n    margin-bottom: 2%; }\n\n.game-field, hints-field {\n  height: 100vh;\n  padding: 0px; }\n\n.line {\n  padding-bottom: 1%; }\n\n.padd {\n  max-height: 60vh;\n  width: 99%;\n  position: absolute;\n  transform: translateY(-50%);\n  top: 50%; }\n\n.kirka {\n  background-position: left bottom;\n  position: fixed;\n  bottom: 0%;\n  left: -7%; }\n\n.left-bar {\n  height: 100vh;\n  padding: 0px;\n  background-color: rgba(58, 183, 51, 0.82);\n  border: 1px solid black;\n  border-bottom-right-radius: 20px;\n  border-top-right-radius: 20px;\n  font-size: 25px; }\n  .left-bar__quit {\n    height: 30%;\n    padding: 5%; }\n  .left-bar__score, .left-bar__wave, .left-bar__HP {\n    height: 20%; }\n\n.quit-confirm {\n  position: fixed;\n  margin-top: 35vh;\n  margin-bottom: 35vh;\n  margin-left: 35vw;\n  margin-right: 35vw;\n  border: 2px solid black;\n  border-radius: 20px;\n  background-color: blue;\n  height: 30vh;\n  width: 30vw;\n  font-size: 20px; }\n  .quit-confirm__text {\n    height: 50%;\n    padding: 3%; }\n  .quit-confirm__buttons {\n    height: 50%;\n    padding: 3%; }\n    .quit-confirm__buttons button {\n      margin: 3%; }\n\n.finish {\n  position: fixed;\n  margin-top: 35vh;\n  margin-bottom: 35vh;\n  margin-left: 35vw;\n  margin-right: 35vw;\n  border: 2px solid black;\n  border-radius: 20px;\n  background-color: blue;\n  height: 30vh;\n  width: 30vw;\n  font-size: 20px; }\n  .finish__text {\n    height: 50%;\n    padding: 3%; }\n  .finish__buttons {\n    height: 50%;\n    padding: 3%; }\n    .finish__buttons button {\n      margin: 3%; }\n", ""]);

// exports


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(24);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(7)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./back.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./back.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(7)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./formmessage.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./formmessage.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(26);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(7)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./greeting.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./greeting.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(7)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./input.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./input.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(7)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./menubutton.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./menubutton.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Link_link_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_router_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__back_scss__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__back_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__back_scss__);








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
			src: '/img/back.png'
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
/* 40 */
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
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Link_link_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_authorize_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_router_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__greeting_scss__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__greeting_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__greeting_scss__);









class Greeting extends __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */] {
	constructor(name) {
		super('div', {
			class: 'greeting',
			align: 'right'
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
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Form_form_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Input_input_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FormButton_formbutton_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FormMessage_formmessage_js__ = __webpack_require__(14);
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
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Link_link_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__menubutton_scss__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__menubutton_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__menubutton_scss__);






class MenuButton extends __WEBPACK_IMPORTED_MODULE_0__Link_link_js__["a" /* default */] {
	constructor(text, attrs) {
		super(text, attrs);
		this.get().classList.add('menu__button');
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MenuButton;



/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Form_form_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Input_input_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FormButton_formbutton_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_userservice_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_authorize_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_router_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__FormMessage_formmessage_js__ = __webpack_require__(14);










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
/* 45 */
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
/* 46 */
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
		this.numberChangesColors = this.settings.numberChangesColors;
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
/* 47 */
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
		this.killed = false;
		this.killedTics = 0;
	}

	paintRed() {
		this.draw.fill('red');
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Monster;


/***/ }),
/* 48 */
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
		this.bulletes = 0;
		this.radiusFight = name.radiusFight;
	}

	fire(enemie) {
		let x1 = this.draw.getX();
		let y1 = this.draw.getY();
		let x2 = enemie.draw.getX();
		let y2 = enemie.draw.getY();
		this.bulletes = new Konva.Line({
			points: [x1, y1, x2, y2],
			stroke: this.kind.colors[0],
			strokeWidth: this.settings.laserWidth,
			lineCap: 'round',
			lineJoin: 'round'
		});
		this.bulletes.enemie = enemie;
		enemie.health -= 10;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PentagonTower;


/***/ }),
/* 49 */
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
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategy_js__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mediator_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_userservice_js__ = __webpack_require__(5);





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

	end(args) {
		this.play = false;
		const userService = new __WEBPACK_IMPORTED_MODULE_3__services_userservice_js__["a" /* default */];
		userService.setUserScore(args.score, () => {});
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameManager;


/***/ }),
/* 51 */
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

		for (let i = 0; i < this.state.fieldsWithCircles.length; i++){
			for (let j = 0; j < this.state.fieldsWithCircles[i].tower.bulletes.length; j++){
				for (let s = 0; s < this.state.fieldsWithCircles[i].tower.bulletes[j].length; s++){
					this.gameLayer.add(this.state.fieldsWithCircles[i].tower.bulletes[j][s])
				}
			}
		}

		for (let i = 0; i < this.state.fieldsWithPentagons.length; i++) {
			if (this.state.fieldsWithPentagons[i].tower.bulletes) {
				this.gameLayer.add(this.state.fieldsWithPentagons[i].tower.bulletes);
			}
		}

		this.gameStage.add(this.gameLayer);
		this.hintsStage.add(this.hintsLayer);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Scene;


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scene_js__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gameObjects_monster_js__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__gameObjects_startower_js__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__variantBlock_js__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__gameObjects_arrow_js__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mediator_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__events_js__ = __webpack_require__(8);











class SingleStrategy {
	
	constructor() {

		this.mediator = new __WEBPACK_IMPORTED_MODULE_8__mediator_js__["a" /* default */]();
		this.settings = new __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */]();
		this.scene = new __WEBPACK_IMPORTED_MODULE_1__scene_js__["a" /* default */]();

		this.wave = 1;
		this.score = 0;

		this.status = 'playerStep';
		this.fields = Array(this.settings.mapSize);
		this.variantRects = [];
		this.variantElements = [];
		this.fieldsWithCircles = [];
		this.fieldsWithPentagons = [];
		this.variantsShow = [];
		this.enemies = [];
		this.throneHealth = this.settings.throneHealth;
		this.enemiesNumber = 0;
		this.path = [];
		this.fieldsNewTower = [];

		for (let i = 0; i < 4; i++) {
			this.variantRects[i] = new __WEBPACK_IMPORTED_MODULE_6__variantBlock_js__["a" /* default */](i);
		}

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++){
				this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](
					this.settings.variantCircls[i][j],
					this.settings.variantsX + this.settings.variantsXSize * 0.1 * (j * 2 + 1),
					this.settings.variantsY + this.settings.variantsYSize * 0.5 + i * this.settings.betweenVariants,
					Math.min(this.settings.variantsYSize / 2 - 7, this.settings.variantsXSize / 10 - 2) 
				))
			}
			this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_7__gameObjects_arrow_js__["a" /* default */](i));
			this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__["a" /* default */](
				this.settings.pentagons[i],
				this.settings.variantsX + this.settings.variantsXSize * 0.9,
				this.settings.variantsY + this.settings.variantsYSize * 0.5 + i * this.settings.betweenVariants,
				Math.min(this.settings.variantsYSize / 2 - 7, this.settings.variantsXSize / 10 - 2) 
			))
		}

		for (let i = 0; i < 3; i++) {
			this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__["a" /* default */](
				this.settings.pentagons[i],
				this.settings.variantsX + this.settings.variantsXSize * 0.1 * (i * 2 + 1),
				this.settings.variantsY + this.settings.variantsYSize * 0.5 + 3 * this.settings.betweenVariants,
				Math.min(this.settings.variantsYSize / 2 - 7, this.settings.variantsXSize / 10 - 2) 
			))
		}
		this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_7__gameObjects_arrow_js__["a" /* default */](3));
		this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_5__gameObjects_startower_js__["a" /* default */](
				this.settings.star,
				this.settings.variantsX + this.settings.variantsXSize * 0.9,
				this.settings.variantsY + this.settings.variantsYSize * 0.5 + 3 * this.settings.betweenVariants,
				Math.min(this.settings.variantsYSize / 2 - 7, this.settings.variantsXSize / 10 - 2) 
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
				};

			
				this.fields[j][i]['field'].addEventListener('click', () => {this.onClickField.call(this, this.fields[j][i])});
				this.fields[j][i]['field'].addEventListener('tap', () => {this.onClickField.call(this, this.fields[j][i])});
				this.fields[j][i]['field'].addEventListener('mouseover', () => {this.onOverField.call(this, this.fields[j][i])});
				this.fields[j][i]['field'].addEventListener('mouseout', () => {this.onOutField.call(this, this.fields[j][i])});

			};
		};

		
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
			fieldsWithCircles: this.fieldsWithCircles,
			fieldsWithPentagons: this.fieldsWithPentagons,
		}
	}

	isAbleTower(place) {
		for (let i = 0; i < this.settings.checkpoints.length; i++){
			if (place.coordinates[0] == this.settings.checkpoints[i][0] && place.coordinates[1] == this.settings.checkpoints[i][1]) {
				return false;
			}
		}
		for (let i = 0; i < this.fieldsNewTower.length; i++) {
			let x = this.fieldsNewTower[i].coordinates[0];
			let y = this.fieldsNewTower[i].coordinates[1];
			this.fields[x][y].tower = 1;
		}
		this.fields[place.coordinates[0]][place.coordinates[1]].tower = 1;
		let path = this.findPath(this.settings.checkpoints);
		let points = [];
		for (let i = 0; i < this.settings.checkpoints.length; i++) {
			points.push(this.settings.checkpoints[i]);
		}
		let j = 0;
		for (let i = 0; (i < path.length) && (j < points.length); i++){
			if (path[i][0] == points[j][0] && path[i][1] == points[j][1]) {
				j++;
			}
		}
		for (let i = 0; i < this.fieldsNewTower.length; i++) {
			let x = this.fieldsNewTower[i].coordinates[0];
			let y = this.fieldsNewTower[i].coordinates[1];
			this.fields[x][y].tower = 0;
		}
		this.fields[place.coordinates[0]][place.coordinates[1]].tower = 0;
		if (j == points.length) {
			return true;
		}
		return false;
	}

	onClickField(field) {
		if (this.isAbleTower(field)){
			this.generateTower(field);
			this.variantsShow = [];
			this.variantRects.length = 4;
		} else if (this.variantRects.length < 5) {
			let waveButton = new __WEBPACK_IMPORTED_MODULE_6__variantBlock_js__["a" /* default */](4, "You cant stop monsters");
			this.variantRects.push(waveButton);
		}		
	}

	onOverField(field) {
		field.field.setStroke(this.isAbleTower(field) ? 'green' : 'red');
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
		for (let i = 0; i < this.fieldsWithCircles.length; i++) {
			let xCoord = this.fieldsWithCircles[i].coordinates[0];
			let yCoord = this.fieldsWithCircles[i].coordinates[1];
			if (xCoord === field.coordinates[0] && yCoord === field.coordinates[1]){
				this.fieldsWithCircles.splice(i, 1);
			}
		}
		this.fields[x][y].tower = new __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__["a" /* default */](kind, xp, yp, this.settings.fieldSize / 2 - 2);
		this.fieldsWithPentagons.push(field);
		for (let i = 0; i < this.fieldsWithCircles.length; i++){
			if (this.fieldsWithCircles[i].tower.kind.name === deleteCircles[0]){
				let xCoord = this.fieldsWithCircles[i].coordinates[0];
				let yCoord = this.fieldsWithCircles[i].coordinates[1];
				let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				this.fields[xCoord][yCoord].tower = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
				this.fieldsWithCircles.splice(i, 1);
				break;
			};
		};
		for (let i = 0; i < this.fieldsWithCircles.length; i++){
			if (this.fieldsWithCircles[i].tower.kind.name === deleteCircles[1]){
				let xCoord = this.fieldsWithCircles[i].coordinates[0];
				let yCoord = this.fieldsWithCircles[i].coordinates[1];
				let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				this.fields[xCoord][yCoord].tower = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
				this.fieldsWithCircles.splice(i, 1);
				break;
			};
		};
		this.towers[kind.name]++;
		this.towers[deleteCircles[0]]--;
		this.towers[deleteCircles[1]]--;
		this.variantsShow = [];
		for (let i = 0; i < 4; i++) {
			this.variantRects[i].draw.setStroke('black');
			this.variantRects[i].draw.removeEventListener('click', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
			this.variantRects[i].draw.removeEventListener('tap', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
		}
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
		this.fieldsWithCircles.push(field);
		this.fieldsNewTower = [];
		this.variantsShow = [];
		this.newStones = 0;
		this.status = 'Wave';
		for (let i = 0; i < 4; i++) {
			this.variantRects[i].draw.setStroke('black');
			this.variantRects[i].draw.removeEventListener('click', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
			this.variantRects[i].draw.removeEventListener('tap', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
			this.variantRects[i].isAble = false;
		}
	}

	onClickVariantRect(variantRect) {
		this.createVariants.call(this, variantRect.field);
	}

	generateTower(field) {

		let circlePro = this.settings.circles[Math.floor(Math.random() * this.settings.circles.length)]

		let circle = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](
			circlePro, 
			field['field'].getX() + this.settings.fieldSize / 2,
			field['field'].getY() + this.settings.fieldSize / 2,
			this.settings.fieldSize / 2 - 2
		);
		field.field.setStroke('black');
		field['field'].removeEventListener('click', () => {this.onClickField.call(this, field)});
		field['field'].removeEventListener('tap', () => {this.onClickField.call(this, field)});
		field['field'].removeEventListener('mouseover', () => {this.onOverField.call(this, field)});
		field['field'].removeEventListener('mouseout', () => {this.onOutField.call(this, field)});
		circle.draw.addEventListener('click', () => { this.createVariants.call(this, field) } ); 
		circle.draw.addEventListener('tap', () => { this.createVariants.call(this, field) } ); 
		circle['coordinates'] = field['coordinates'];
		this.fieldsNewTower.push(circle);
		this.newStones++;

		if (this.newStones >= this.settings.numberTowersInStep) {
			for (let i = 0; i < this.settings.mapSize; i++){
				for (let j = 0; j < this.settings.mapSize; j++){
					this.fields[i][j]['field'].removeEventListener('click', () => {this.onClickField.call(this, this.fields[i][j])});
					this.fields[i][j]['field'].removeEventListener('tap', () => {this.onClickField.call(this, this.fields[i][j])});
					this.fields[i][j]['field'].removeEventListener('mouseover', () => {this.onOverField.call(this, this.fields[i][j])});
					this.fields[i][j]['field'].removeEventListener('mouseout', () => {this.onOutField.call(this, this.fields[i][j])});
				}
			}
			for (let i = 0; i < this.fieldsNewTower.length; i++){
				let x = this.fieldsNewTower[i].coordinates[0];
				let y = this.fieldsNewTower[i].coordinates[1];
				this.fields[x][y].field.setStroke('green');
			}
			for (let j = 0; j < this.fieldsNewTower.length; j++) {
				this.towers[this.fieldsNewTower[j].kind.name]++;
				let variants = this.listVariants();
				for (let i = 0; i < variants.length; i++) {
					for (let s = 0; s < 4; s++) {
						if (variants[i].name == this.variantRects[s].kind.name) {
							this.variantRects[s].isAble = true;
							this.variantRects[s].field = this.fields[this.fieldsNewTower[j].coordinates[0]][this.fieldsNewTower[j].coordinates[1]]
						}
					}
				}
				this.towers[this.fieldsNewTower[j].kind.name]--;
			}
			for (let i = 0; i < this.variantRects.length; i++) {
				if (this.variantRects[i].isAble) {
					this.variantRects[i].draw.setStroke('green');
					this.variantRects[i].draw.addEventListener('click', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
					this.variantRects[i].draw.addEventListener('tap', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
				}
			}
			
		}
	}

	createVariants(field) {
		this.variantsShow = [];

		let currentNewTower;
		let variantStay;
		this.variantsShow = [];
		for (let i = 0; i < this.fieldsNewTower.length; i++) {
			if ((field['field'].getX() + this.settings.fieldSize / 2 == this.fieldsNewTower[i].draw.getX()) && (field['field'].getY() + this.settings.fieldSize / 2 == this.fieldsNewTower[i].draw.getY()) && (this.newStones >= this.settings.numberTowersInStep)) {
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
			variant.draw.addEventListener('tap', () => {this.onClickNewPentagon.call(this, field, variant.kind, cNewTower)});
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
			variantStay.draw.addEventListener('tap', () => {this.onClickStayVariant.call(this, field, variantStay.kind, currentNewTower)});
			this.variantsShow.push(variantStay);
		};
	}

	listVariants(field) {
		let variants = [];
		if (((this.towers['circleRed'] > 0) && (this.towers['circlePink'] > 0) && (this.towers['circleSad'] > 0)) && (!field || (field.tower.kind == this.settings.circleRed) || (field.tower.kind == this.settings.circlePink) || (field.tower.kind == this.settings.circleSad))){
		variants.push(this.settings.pentagonRPS);
		};
		if (((this.towers['circleSad'] > 0) && (this.towers['circleBlue'] > 0) && (this.towers['circleGreen'] > 0)) && (!field || (field.tower.kind == this.settings.circleSad) || (field.tower.kind == this.settings.circleBlue) || (field.tower.kind == this.settings.circleGreen))){
			variants.push(this.settings.pentagonSBG);
		};
		if (((this.towers['circleGreen'] > 0) && (this.towers['circleYellow'] > 0) && (this.towers['circleRed'] > 0)) && (!field || (field.tower.kind == this.settings.circleGreen) || (field.tower.kind == this.settings.circleYellow) || (field.tower.kind == this.settings.circleRed))){
			variants.push(this.settings.pentagonGYR);
		};
		return variants;
	}

	playerStep() {
		for (let i = 0; i < this.fieldsNewTower.length; i++) {
			if (this.fieldsNewTower[i].numberChangesColors > 1) {
				if (this.fieldsNewTower[i].numberChangesColors % 10 === 0) {
					let color = this.settings.circles[Math.floor(Math.random() * this.settings.circles.length)].color;
					this.fieldsNewTower[i].draw.setFill(color);
				}
				this.fieldsNewTower[i].numberChangesColors--;
			} else if (this.fieldsNewTower[i].numberChangesColors === 1) {
				let color = this.fieldsNewTower[i].kind.color;
				this.fieldsNewTower[i].draw.setFill(color);
				this.fieldsNewTower[i].numberChangesColors--;
			}
		}
	}

	gameWave() {

		if (this.path.length === 0) {
			this.path = this.findPath(this.settings.checkpoints);
		}

		if (this.enemiesNumber < this.settings.numberMonstersInWave) {
			let monster = new __WEBPACK_IMPORTED_MODULE_2__gameObjects_monster_js__["a" /* default */](this.settings.triangl);
			monster.health += this.settings.addHPInWave * (this.wave - 1);
			this.enemies.push(monster);
			for (let i = 0; i < this.fieldsWithCircles.length; i++){
				this.fieldsWithCircles[i].tower.bulletes.push([]);
			}
			this.enemiesNumber++;
		}

		for (let i = 0; i < this.fieldsWithCircles.length; i++){
			for (let j = 0; j < this.enemies.length; j++){
				let distY = this.enemies[j].draw.getY() - this.fieldsWithCircles[i].tower.draw.getY();
				let distX = this.enemies[j].draw.getX() - this.fieldsWithCircles[i].tower.draw.getX();
				if (Math.pow(distX * distX + distY * distY, 0.5) <= this.fieldsWithCircles[i].tower.radiusFight){
					this.fieldsWithCircles[i].tower.fire(j);
					break;
				};
			};
			for (let j = 0; j < this.fieldsWithCircles[i].tower.bulletes.length; j++){
				for (let s = 0; s < this.fieldsWithCircles[i].tower.bulletes[j].length; s++){
					let distY = this.enemies[j].draw.getY() - this.fieldsWithCircles[i].tower.bulletes[j][s].getY();
					let distX = this.enemies[j].draw.getX() - this.fieldsWithCircles[i].tower.bulletes[j][s].getX();
					if (Math.abs(distX) < this.enemies[j].kind.size && Math.abs(distY) < this.enemies[j].kind.size){
						this.fieldsWithCircles[i].tower.bulletes[j].splice(s, 1);
						this.enemies[j].health -= 10;
						continue;
					}
					let stepX = this.settings.bulletStep / Math.pow(1 + Math.pow(distY/distX, 2), 0.5) * Math.abs(distX) / distX;
					let stepY = Math.pow(this.settings.bulletStep * this.settings.bulletStep - stepX * stepX, 0.5) * Math.abs(distY) / distY;
					this.fieldsWithCircles[i].tower.bulletes[j][s].setX(this.fieldsWithCircles[i].tower.bulletes[j][s].getX() + stepX);
					this.fieldsWithCircles[i].tower.bulletes[j][s].setY(this.fieldsWithCircles[i].tower.bulletes[j][s].getY() + stepY);
				};
			};
		};

		for (let i = 0; i < this.fieldsWithPentagons.length; i++) {
			this.fieldsWithPentagons[i].tower.bulletes = 0;
			for (let j = 0; j < this.enemies.length; j++) {
				let distY = this.enemies[j].draw.getY() - this.fieldsWithPentagons[i].tower.draw.getY();
				let distX = this.enemies[j].draw.getX() - this.fieldsWithPentagons[i].tower.draw.getX();
				if (Math.pow(distX * distX + distY * distY, 0.5) <= this.fieldsWithPentagons[i].tower.radiusFight){
					this.fieldsWithPentagons[i].tower.fire(this.enemies[j]);
					break;
				}
			}
		}
		for (let i = 0; i < this.enemies.length; i++) {
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

			if (this.enemies[i].killed) {
				this.enemies.splice(i, 1);
				for (let j = 0; j < this.fieldsWithCircles.length; j++){
					this.fieldsWithCircles[j].tower.bulletes.splice(i, 1);
				}
				i--;
				continue;
			}

			if (this.enemies[i].health <= 0) {
				this.enemies[i].killedTics++;
				this.enemies[i].killed = true;
				this.enemies[i].paintRed();
				this.score++;
				this.mediator.emit(__WEBPACK_IMPORTED_MODULE_9__events_js__["a" /* default */].GET_SCORE, {
					score: this.score
				})
			}
		}

		for (let i = 0; i < this.enemies.length; i++) {
			if (this.enemies[i].numberTurns >= this.path.length) {
				this.enemies.splice(i, 1);
				for (let s = 0; s < this.fieldsWithCircles.length; s++){
					this.fieldsWithCircles[s].tower.bulletes.splice(i, 1);
				}
				i--;
				let damage = this.settings.damage + this.settings.addDamageInWave * (this.wave - 1);
				this.throneHealth -= damage;
				this.mediator.emit(__WEBPACK_IMPORTED_MODULE_9__events_js__["a" /* default */].THRONE_DAMAGE, {
					health: (this.throneHealth > 0 ? this.throneHealth : 0)
				})
				if (this.throneHealth <= 0) {
					this.mediator.emit(__WEBPACK_IMPORTED_MODULE_9__events_js__["a" /* default */].GAME_FINISHED, {
						score: this.score,
						death: true
					});
				}
			}
		}

		if (this.enemies.length === 0) {
			this.status = 'playerStep';
			this.wave++;
			this.mediator.emit(__WEBPACK_IMPORTED_MODULE_9__events_js__["a" /* default */].NEW_WAVE_STARTED, {
				wave: this.wave
			});

			this.enemiesNumber = 0;
			for (let i = 0; i < this.settings.mapSize; i++){
				for (let j = 0; j < this.settings.mapSize; j++){
					if (this.fields[i][j].tower === 0) {
						this.fields[i][j]['field'].addEventListener('click', () => {this.onClickField.call(this, this.fields[i][j])});
						this.fields[i][j]['field'].addEventListener('tap', () => {this.onClickField.call(this, this.fields[i][j])});
						this.fields[i][j]['field'].addEventListener('mouseover', () => {this.onOverField.call(this, this.fields[i][j])});
						this.fields[i][j]['field'].addEventListener('mouseout', () => {this.onOutField.call(this, this.fields[i][j])});
					}
				}
			}
			for (let i = 0; i < this.fieldsWithCircles.length; i++){
				this.fieldsWithCircles[i].tower.bulletes = [];
			}
			for (let i = 0; i < this.fieldsWithPentagons.length; i++){
				this.fieldsWithPentagons[i].tower.bulletes = 0;
			}
			this.path = [];
		};
	}

	findPath(checkpoints) {

		let matrix = Array(this.settings.mapSize);
		for (let i = 0; i < this.settings.mapSize; ++i) {
			matrix[i] = Array(this.settings.mapSize);
		}

		for (let i = 0; i < this.settings.mapSize; ++i) {
			for (let j = 0; j < this.settings.mapSize; ++j) {
				if (this.fields[i][j].tower && this.fields[i][j].tower !== 0) {
					matrix[j][i] = 1;
				} else {
					matrix[j][i] = 0;
				}
			}
		}

		const finder = new PF.BiAStarFinder({
			allowDiagonal: true,
			heuristic: PF.Heuristic.euclidean
		});

		let path = [];
		for (let i = 1; i < checkpoints.length; i++) {
			let subStart = checkpoints[i - 1];
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
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(4);


class VariantBlock {
	constructor(number, text) {

		this.settings = new __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */];
		this.isAble = false;
		this.kind = 0;
		this.field = 0;
		switch (number) {
			case (0):
				this.kind = this.settings.pentagonRPS;
				break;
			case (1):
				this.kind = this.settings.pentagonSBG;
				break;
			case (2):
				this.kind = this.settings.pentagonGYR;
				break;
			case (3):
				this.kind = this.settings.star;
				break;
		}
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
			strokeWidth: 5
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
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_menu_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_login_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_registration_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_about_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_leaderboard_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_singleplayer_singleplayer_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_multiplayer_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_authorize_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_http_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modules_router_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__css_styles_scss__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__css_styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__css_styles_scss__);















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
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_mediator_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_events_js__ = __webpack_require__(8);
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
		this.userBlock_title = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('b');
		this.userBlock_text = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('span');
		this.userBlock_title.get().innerHTML = 'Игрок: '
		
		this.scoreBlock = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'left-bar__score'
		});
		this.scoreBlock_title = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('b');
		this.scoreBlock_text = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('span');
		this.scoreBlock_title.get().innerHTML = 'Результат: '
		this.scoreBlock_text.get().innerHTML = '0'
		
		this.waveBlock = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'left-bar__wave'
		})
		this.waveBlock_title = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('b');
		this.waveBlock_text = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('span');
		this.waveBlock_title.get().innerHTML = 'Волна: ';
		this.waveBlock_text.get().innerHTML = '1';

		this.HPBlock = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'left-bar__HP'
		})
		this.HPBlock_title = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('b');
		this.HPBlock_text = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('span');
		this.HPBlock_title.get().innerHTML = 'HP: ';
		this.HPBlock_text.get().innerHTML = '100';
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
			class: 'finish',
			align: 'center'
		})
		this.finishText = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'finish__text'
		})
		this.finishButtons = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'finish__buttons'
		})
		this.exitButton = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('button');
		this.exitButton.get().innerHTML = 'Выйти в меню';
		this.againButton = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('button');
		this.againButton.get().innerHTML = 'Начать сначала';
	}

	makeListeners() {

		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].GAME_FINISHED, (args) => {
			this.finishText.get().innerHTML = 'Игра окончена. </br> Ваш результат: ' + args.score;
			this.get().appendChild(this.finishWindow.get());
		})
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].NEW_WAVE_STARTED, (args) => {
			this.waveBlock_text.get().innerHTML = args.wave;
		})
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].GET_SCORE, (args) => {
			this.scoreBlock_text.get().innerHTML = args.score;
		})
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].THRONE_DAMAGE, (args) => {
			this.HPBlock_text.get().innerHTML = args.health;
		})
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].PLAY_AGAIN, () => {
			this.waveBlock_text.get().innerHTML = 1;
			this.scoreBlock_text.get().innerHTML = 0;
			this.HPBlock_text.get().innerHTML = 100;
		})

		this.quitButton.on('click', () => {
			this.get().appendChild(this.quitConfirm.get());
		})

		this.quitCancelButton.on('click', () => {
			this.get().removeChild(this.quitConfirm.get());
		})

		this.quitConfirmButton.on('click', () => {
			this.get().removeChild(this.quitConfirm.get());
			this.mediator.emit(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].QUIT_CONFIRMED, {
				score: parseInt((this.scoreBlock_text.get().innerHTML))
			});
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
		this.leftBar.get().appendChild(this.scoreBlock.get());
		this.leftBar.get().appendChild(this.waveBlock.get());
		this.leftBar.get().appendChild(this.HPBlock.get());

		this.userBlock.get().appendChild(this.userBlock_title.get());
		this.userBlock.get().appendChild(this.userBlock_text.get());
		this.scoreBlock.get().appendChild(this.scoreBlock_title.get());
		this.scoreBlock.get().appendChild(this.scoreBlock_text.get());
		this.waveBlock.get().appendChild(this.waveBlock_title.get());
		this.waveBlock.get().appendChild(this.waveBlock_text.get());
		this.HPBlock.get().appendChild(this.HPBlock_title.get());
		this.HPBlock.get().appendChild(this.HPBlock_text.get());
		
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
		this.userBlock_text.get().innerHTML = user;
	}

	unloginSwitch(user) {
		this.loginSwitch(user);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SinglePlayerGame;



/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_mediator_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_events_js__ = __webpack_require__(8);







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