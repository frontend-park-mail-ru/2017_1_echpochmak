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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Setting = {
	mapSize: 10,
	// fieldSize: window.innerHeight * 0.9 / Setting.mapSize,
	mapX: window.innerWidth * 0.2,	
	mapY: window.innerHeight * 0.05,
	variantRadius: 10,
	bulletStep: 20,
	monsterStep: 10,
	numberMonstersInWave: 20,
	bulletRadius: 5,

	circleRed: {
		name: 'circleRed',
		color: '#FF0000',
		power: 10,
		radiusFight: 400,
	},

	circleBlue: {
		name: 'circleBlue',
		color: '#00FFFF',
		power: 15,
		radiusFight: 400,
	},

	circleGreen: {
		name: 'circleGreen',
		color: '#00FF00',
		power: 20,
		radiusFight: 400,
	},

	circleYellow: {
		name: 'circleYellow',
		color: '#FFFF00',
		power: 25,
		radiusFight: 400,
	},

	circlePink: {
		name: 'circlePink',
		color: '#FF00FF',
		power: 30,
		radiusFight: 400,
	},

	circleSad: {
		name: 'circleSad',
		color: '#0000FF',
		power: 35,
		radiusFight: 400,
	},

	triangl: {
		name: 'triangl',
		size: 30,
		color: '#00FF00',
		health: 10,
	},

	stone: {
		name: 'stone',
		color: 'black',
	},

	pentagonRPS: {
		name: 'pentagonRPS',
		power: 70,
		colors: ['#FF0000', '#FF00FF', '#0000FF'],
	},

	pentagonSBG: {
		name: 'pentagonSBG',
		power: 80,
		colors: ['#0000FF', '#00FFFF', '#00FF00'],
	},

	pentagonGYR: {
		name: 'pentagonGYR',
		power: 70,
		colors: ['#00FF00', '#FFFF00', '#FF0000'],
	},

	star: {
		name: 'star',
		colors: ['#0000FF', '#00FF00', '#FF0000'],
		power: 100
	}
};

Setting.pentagonGYR.circles = ['circleGreen', 'circleYellow', 'circleRed'];
Setting.pentagonSBG.circles = ['circleSad', 'circleBlue', 'circleGreen'];
Setting.pentagonRPS.circles = ['circleRed', 'circlePink', 'circleSad'];

Setting.fieldSize = window.innerHeight * 0.9 / Setting.mapSize;

Setting.circles = [
	Setting.circleRed, 
	Setting.circleGreen, 
	Setting.circleYellow, 
	Setting.circleBlue, 
	Setting.circleSad, 
	Setting.circlePink
];

Setting.pentagons = [
	Setting.pentagonRPS, 
	Setting.pentagonSBG, 
	Setting.pentagonGYR
];

Setting.variantsX = window.innerWidth * 0.72;
Setting.variantsY = Setting.mapY;
Setting.variantsXSize = window.innerWidth * 0.25;
Setting.variantsYSize = window.innerHeight * 0.1;
Setting.betweenVariants = 120;

Setting.variantCircls = [[Setting.circleRed, Setting.circlePink, Setting.circleSad],
						[Setting.circleSad, Setting.circleBlue, Setting.circleGreen],
						[Setting.circleGreen, Setting.circleYellow, Setting.circleRed]];


/* harmony default export */ __webpack_exports__["a"] = (Setting);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scene_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gameObjects_monster_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__gameObjects_startower_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__variantBlock_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__gameObjects_arrow_js__ = __webpack_require__(2);









var way = [[1,1], [2, 8], [7,4], [9,1], [9,9]];

class SingleStrategy {
	
	constructor() {

		this.scene = new __WEBPACK_IMPORTED_MODULE_1__scene_js__["a" /* default */]();

		this.status = 'playerStep';
		this.fields = Array(__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize);
		this.variantRects = [];
		this.variantElements = [];
		this.fieldsWithTowers = [];
		this.variantsShow = [];
		this.enemies = [];
		this.tronHealth = 200;
		this.enemiesNumber = 0;

		for (let i = 0; i < 4; i++){
			this.variantRects[i] = new __WEBPACK_IMPORTED_MODULE_6__variantBlock_js__["a" /* default */](i);
		}

		for (let i = 0; i < 3; i++){
			for (let j = 0; j < 3; j++){
				this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](
					__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantCircls[i][j],
					__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsX + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsXSize * 0.1 * (j * 2 + 1),
					__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsY + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsYSize * 0.5 + i * __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].betweenVariants,
					__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsYSize / 2 - 7
				))
			}
			this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_7__gameObjects_arrow_js__["a" /* default */](i));
			this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__["a" /* default */](
				__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].pentagons[i],
				__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsX + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsXSize * 0.9,
				__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsY + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsYSize * 0.5 + i * __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].betweenVariants,
				__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsYSize / 2 - 7
			))
		}

		for (let i = 0; i < 3; i++) {
			this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__["a" /* default */](
				__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].pentagons[i],
				__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsX + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsXSize * 0.1 * (i * 2 + 1),
				__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsY + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsYSize * 0.5 + 3 * __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].betweenVariants,
				__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsYSize / 2 - 7
			))
		}
		this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_7__gameObjects_arrow_js__["a" /* default */](3));
		this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_5__gameObjects_startower_js__["a" /* default */](
				__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].star,
				__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsX + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsXSize * 0.9,
				__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsY + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsYSize * 0.5 + 3 * __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].betweenVariants,
				__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsYSize / 2 - 7
			))
		
		for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize; i++){
			this.fields[i] = Array(__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize);
		}
		
		for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize; i++){
			for (let j = 0; j < __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize; j++){
				this.fields[j][i] = {
					tower: 0,
					field: new Konva.Rect({
						x: __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapX + j * __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize + j * 2,
						y: __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapY + i * __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize + i * 2,
						width: __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize,
						height: __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize,
						fill: 'grey',
						stroke: 'black',
						strokeWidth: 2
					}),
					coordinates: [j, i],
					ableTower: this.isAbleTower([j, i]),
				};

			
				this.fields[j][i]['field'].addEventListener('mousedown', () => {this.onClickField.call(this, this.fields[j][i])});
				this.fields[j][i]['field'].addEventListener('mouseover', () => {this.onOverField.call(this, this.fields[j][i])});
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

		this.gameInterval = setInterval(() => {
			this.gameLoop.call(this);
		}, 17);
	}

	gameLoop() {
		if (this.status === 'playerStep') {
			this.playerStep();
		} else {
			this.gameWave();
		}

		this.updateState();
		this.scene.setState(this.state);
		this.scene.render();
		// this.scene.testDraw();
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
		let i = field.coordinates[0];
		let j = field.coordinates[1];
		this.fields[i + 1 < __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize ? i + 1 : i][j].field.setStroke('black');
		this.fields[i - 1 >= 0 ? i - 1 : i][j].field.setStroke('black');
		this.fields[i][j + 1 < __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize ? j + 1 : j].field.setStroke('black');
		this.fields[i][j - 1 >= 0 ? j - 1 : j].field.setStroke('black');
		this.fields[i + 1 < __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize ? i + 1 : i][j + 1 < __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize ? j + 1 : j].field.setStroke('black');
		this.fields[i + 1 < __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize ? i + 1 : i][j - 1 >= 0 ? j - 1 : j].field.setStroke('black');
		this.fields[i - 1 >= 0 ? i - 1 : i][j + 1 < __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize ? j + 1 : j].field.setStroke('black');
		this.fields[i - 1 >= 0 ? i - 1 : i][j - 1 >= 0 ? j - 1 : j].field.setStroke('black');
		field.field.setStroke(field.ableTower ? 'green' : 'red');
	}

	onClickNewPentagon(field, kind, currentNewTower){
		if (currentNewTower){
			for (let i = 0; i < this.fieldsNewTower.length; i++){
				let xCoord = this.fieldsNewTower[i]['coordinates'][0];
				let yCoord = this.fieldsNewTower[i]['coordinates'][1];
				let xPixel = __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapX + xCoord * (__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize + 2) + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2;
				let yPixel = __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapY + yCoord * (__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize + 2) + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2;
				this.fields[xCoord][yCoord]['tower'] = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].stone, xPixel, yPixel, __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2 - 2);
				this.fields[this.fieldsNewTower[i].coordinates[0]][this.fieldsNewTower[i].coordinates[1]].field.setStroke('black');
			}
			this.fieldsNewTower = [];
			this.newStones = 0;
			this.status = 'Wave';
		}
		let x = field.coordinates[0];
		let y = field.coordinates[1];
		let xp = __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapX + x * (__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize + 2) + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2;
		let yp = __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapY + y * (__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize + 2) + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2;
		let deleteCircles = new Array(...kind.circles);
		for (let i = 0; i < deleteCircles.length; i++){
			if (deleteCircles[i] === (currentNewTower ? currentNewTower.kind.name : field.tower.kind.name)) {
				deleteCircles.splice(i, 1);
			}
		}
		this.fields[x][y].tower = new __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__["a" /* default */](kind, xp, yp, __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2 - 2);
		for (let i = 0; i < this.fieldsWithTowers.length; i++){
			if (this.fieldsWithTowers[i].tower.kind.name === deleteCircles[0]){
				let xCoord = this.fieldsWithTowers[i].coordinates[0];
				let yCoord = this.fieldsWithTowers[i].coordinates[1];
				let xPixel = __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapX + xCoord * (__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize + 2);
				let yPixel = __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapY + yCoord * (__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize + 2);
				this.fields[xCoord][yCoord].tower = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].stone, yPixel, xPixel, __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2 - 2);
				this.fieldsWithTowers.splice(i, 1);
				break;
			};
		};
		for (let i = 0; i < this.fieldsWithTowers.length; i++){
			if (this.fieldsWithTowers[i].tower.kind.name === deleteCircles[1]){
				let xCoord = this.fieldsWithTowers[i].coordinates[0];
				let yCoord = this.fieldsWithTowers[i].coordinates[1];
				let xPixel = __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapX + xCoord * (__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize + 2);
				let yPixel = __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapY + yCoord * (__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize + 2);
				this.fields[xCoord][yCoord].tower = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].stone, yPixel, xPixel, __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2 - 2);
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
			let xPixel = __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapX + xCoord * (__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize + 2) + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2;
			let yPixel = __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapY + yCoord * (__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize + 2) + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2;
			this.fields[xCoord][yCoord]['tower'] = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].stone, xPixel, yPixel, __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2 - 2);
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

		let circlePro = __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].circles[Math.floor(Math.random() * __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].circles.length)]
		
		let circle = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](
			circlePro, 
			field['field'].getX() + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2,
			field['field'].getY() + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2,
			__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2 - 2
		);

		field['field'].removeEventListener('mousedown', () => {this.onClickField.call(this, field)});
		field['field'].removeEventListener('mouseover', () => {this.onOverField.call(this, field)});
		circle.draw.addEventListener('mousedown', () => { this.createVariants.call(this, field) } ); 
		circle['coordinates'] = field['coordinates'];
		this.fieldsNewTower.push(circle);
		this.newStones++;
	}

	createVariants(field) {
		let currentNewTower;
		let variantStay;
		this.variantsShow = [];
		for (let i = 0; i < this.fieldsNewTower.length; i++) {
			if ((field['field'].getX() + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2 == this.fieldsNewTower[i].draw.getX()) && (field['field'].getY() + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2 == this.fieldsNewTower[i].draw.getY()) && (this.newStones >= 5)){
				currentNewTower = this.fieldsNewTower[i];
				variantStay = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](
					currentNewTower['kind'],
					__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantX,
					__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantY,
					__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantRadius
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
		let variantX = field['field'].getX() + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2 - __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize;
		let variantY = field['field'].getY() + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2;
		for (var i = 0; i < variants.length; i++){
			let variant = new __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__["a" /* default */](
				variants[i],
				variantX,
				variantY,
				__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantRadius
			);
			let cNewTower = currentNewTower ? currentNewTower : undefined;
			variant.draw.addEventListener('mousedown', () => {this.onClickNewPentagon.call(this, field, variant.kind, cNewTower)});
			variantX = field['field'].getX() + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2 - Math.cos(beta) * __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize;
			variantY = field['field'].getY()  + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2 - Math.sin(beta) * __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize;
			beta = beta + alfa;
			this.variantsShow.push(variant);
		}
		if (currentNewTower){
			variantStay = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](
				currentNewTower.kind,
				variantX,
				variantY,
				__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantRadius
			);
			variantStay.draw.addEventListener('mousedown', () => {this.onClickStayVariant.call(this, field, variantStay.kind, currentNewTower)});
			this.variantsShow.push(variantStay);
		};
	}

	listVariants(field) {
		let variants = [];
		if (((this.towers['circleRed'] > 0) && (this.towers['circlePink'] > 0) && (this.towers['circleSad'] > 0)) && ((field.tower.kind == __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].circleRed) || (field.tower.kind == __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].circlePink) || (field.tower.kind == __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].circleSad))){
		variants.push(__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].pentagonRPS);
		};
		if (((this.towers['circleSad'] > 0) && (this.towers['circleBlue'] > 0) && (this.towers['circleGreen'] > 0)) && ((field.tower.kind == __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].circleSad) || (field.tower.kind == __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].circleBlue) || (field.tower.kind == __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].circleGreen))){
			variants.push(__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].pentagonSBG);
		};
		if (((this.towers['circleGreen'] > 0) && (this.towers['circleYellow'] > 0) && (this.towers['circleRed'] > 0)) && ((field.tower.kind == __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].circleGreen) || (field.tower.kind == __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].circleYellow) || (field.tower.kind == __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].circleRed))){
			variants.push(__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].pentagonGYR);
		};
		return variants;
	}

	playerStep() {
		if (this.newStones >= 5){
			for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize; i++){
				for (let j = 0; j < __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize; j++){
					this.fields[i][j]['field'].removeEventListener('mousedown', () => {this.onClickField.call(this, this.fields[i][j])});
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

	gameWave() {
		if (this.enemiesNumber < 20){
			this.enemies.push(new __WEBPACK_IMPORTED_MODULE_2__gameObjects_monster_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].triangl));
			for (let i = 0; i < this.fieldsWithTowers.length; i++){
				this.fieldsWithTowers[i].tower.bulletes.push([]);
			}
			this.enemiesNumber++;
		};
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
					let stepX = __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].bulletStep / Math.pow(1 + Math.pow(distY/distX, 2), 0.5) * Math.abs(distX) / distX;
					let stepY = Math.pow(__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].bulletStep * __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].bulletStep - stepX * stepX, 0.5) * Math.abs(distY) / distY;
					this.fieldsWithTowers[i].tower.bulletes[j][s].setX(this.fieldsWithTowers[i].tower.bulletes[j][s].getX() + stepX);
					this.fieldsWithTowers[i].tower.bulletes[j][s].setY(this.fieldsWithTowers[i].tower.bulletes[j][s].getY() + stepY);
				};
			};
		};
		if (this.enemies[0].numberTurns === way.length){
			this.enemies.splice(0, 1);
			for (let s = 0; s < this.fieldsWithTowers; s++){
				this.fieldsWithTowers[s].tower.bulletes.splice(0, 1);
			}
		};
		for (let i = 0; i < this.enemies.length; i++){
			let place = way[this.enemies[i].numberTurns];
			let distX = -this.enemies[i].draw.getX() + (__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapX + place[0] * (__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize + 2) + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2);
			let distY = -this.enemies[i].draw.getY() + (__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapY + place[1] * (__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize + 2) + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2);
			if (Math.abs(distX) < this.enemies[i].kind.size && Math.abs(distY) < this.enemies[i].kind.size){
				this.enemies[i].numberTurns++;
				continue;
			};
			let stepX = __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].monsterStep / Math.pow(1 + Math.pow(distY/distX, 2), 0.5) * Math.abs(distX) / distX;
			let stepY = Math.pow(__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].monsterStep * __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].monsterStep - stepX * stepX, 0.5) * Math.abs(distY) / distY;
			this.enemies[i].draw.setX(this.enemies[i].draw.getX() + stepX);
			this.enemies[i].draw.setY(this.enemies[i].draw.getY() + stepY);
			if (this.enemies[i].health <= 0) {
				this.enemies.splice(i, 1);
				for (let j = 0; j < this.fieldsWithTowers.length; j++){
					this.fieldsWithTowers[j].tower.bulletes.splice(i, 1);
				}
			}
		}
		if (this.enemies.length === 0){
			this.status = 'playerStep';
			this.enemiesNumber = 0;
			for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize; i++){
				for (let j = 0; j < __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize; j++){
					this.fields[i][j]['field'].addEventListener('mousedown', () => {this.onClickField.call(this, this.fields[i][j])});
					this.fields[i][j]['field'].addEventListener('mouseover', () => {this.onOverField.call(this, this.fields[i][j])});
					this.fields[i][j].ableTower = this.isAbleTower([i, j]);
				};
			};
			for (let i = 0; i < this.fieldsWithTowers.length; i++){
				this.fields[this.fieldsWithTowers[i].coordinates[0]][this.fieldsWithTowers[i].coordinates[1]].tower.bulletes = [];
			}
		};
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SingleStrategy;
;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(0);


class Arrow {
	constructor(row){
		this.draw = new Konva.Arrow({
			x: __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsX + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsXSize * 0.7,
			y: __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsY + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsYSize * 0.5 + row * __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].betweenVariants,
			points: [-__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsXSize * 0.1, 0, __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsXSize * 0.1, 0],
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(0);

class CircleTower {
	constructor(name, x, y, radius) {
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
		//for (let i = 0; i < Setting.numberMonstersInWave; i++){
		//	this.bulletes.push(Array(numberMonstersInWave));
		//}
	}

	fire(enemie) {
		this.bulletes[enemie].push(new Konva.Circle({
			x: this.draw.getX(),
			y: this.draw.getY(),
			radius: __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].bulletRadius,
			stroke: 'black',
			strokeWidth: 0,
			fill: this.draw.getFill()
		}));
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CircleTower;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(0);

class Monster {
	constructor(name) {
		this.draw = new Konva.RegularPolygon({
			x: __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapX,
			y: __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapY,
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(0);

class PentagonTower {
	constructor(name, x, y, radius) {
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
			radius: __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].bulletRadius,
			stroke: 'black',
			strokeWidth: 0,
			fill: this.kind.colors[0],
		}));
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PentagonTower;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(0);

class StarTower {
	constructor(name, x, y, radius) {
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategy_js__ = __webpack_require__(1);


const strategy = new __WEBPACK_IMPORTED_MODULE_0__strategy_js__["a" /* default */]();

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(0);


class Scene {
	constructor() {
		this.state = {};
	}

	setState(state) {
		this.state = state;
	}



	render() {
		let stage = new Konva.Stage({
			container: 'konva',
			width : window.innerWidth,
			height : window.innerHeight
		});
		var layer = new Konva.Layer();

		for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize; i++){
			for (let j = 0; j < __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize; j++){
				// console.log(this.state.fields[i][j].field)
				layer.add(this.state.fields[i][j].field);
				if (this.state.fields[i][j].tower){
					layer.add(this.state.fields[i][j].tower.draw);
					//console.log(this.state.fields[i][j])
				};
				
			};
		};
		for (let i = 0; i < this.state.fieldsNewTower.length; i++){
			layer.add(this.state.fieldsNewTower[i].draw)
			console.log(this.state.fieldsNewTower.length)
		}

		for (let i = 0; i < this.state.variantRects.length; i++){
			layer.add(this.state.variantRects[i].draw);
			if (this.state.variantRects[i].text) {
				layer.add(this.state.variantRects[i].text);
			}

		};
		for (let i = 0; i < this.state.variantElements.length; i++){
			layer.add(this.state.variantElements[i].draw);
		}
		for (let i = 0; i < this.state.variantsShow.length; i++){
			layer.add(this.state.variantsShow[i].draw);
		}
		for (let i = 0; i < this.state.enemies.length; i++){
			layer.add(this.state.enemies[i].draw);
		}

		for (let i = 0; i < this.state.fieldsWithTowers.length; i++){
			for (let j = 0; j < this.state.fieldsWithTowers[i].tower.bulletes.length; j++){
				for (let s = 0; s < this.state.fieldsWithTowers[i].tower.bulletes[j].length; s++){
					layer.add(this.state.fieldsWithTowers[i].tower.bulletes[j][s])
				}
				
			}
		}

		stage.add(layer);
	}

	testDraw() {
		let stage = new Konva.Stage({
			container: 'konva',
			width : window.innerWidth,
			height : window.innerHeight
		});
		var layer = new Konva.Layer();

		let circle = new Konva.Circle({
			x: __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapX + 50,
			y: __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapY + 50,
			radius: 50,
			stroke: 'black',
			strokeWidth: 0,
			fill: 'red'
		});

		layer.add(circle);

		stage.add(layer);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Scene;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(0);


class VariantBlock {
	constructor(number, text) {
		if (text) {
			this.text = new Konva.Text({
				x: __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsX,
				y: __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsY + number * __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].betweenVariants,
				width: variantsXSize,
				text: text,
				fontSize: 18,
				fill: 'red',
				padding: 15,
				align: 'center',
			});
		};
		this.draw = new Konva.Rect({
			x: __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsX,
			y: __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsY + number * __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].betweenVariants,
			width: __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsXSize,
			height: (text ? this.text.getHeight() : __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].variantsYSize),
			fill: 'grey',
			stroke: 'black',
			strokeWidth: 2
		});
	};
}
/* harmony export (immutable) */ __webpack_exports__["a"] = VariantBlock;
;


/***/ })
/******/ ]);