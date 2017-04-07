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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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
	bulletStep: 10,

	circleRed: {
		name: 'circleRed',
		color: '#FF0000',
		power: 10,
	},

	circleBlue: {
		name: 'circleBlue',
		color: '#00FFFF',
		power: 15
	},

	circleGreen: {
		name: 'circleGreen',
		color: '#00FF00',
		power: 20
	},

	circleYellow: {
		name: 'circleYellow',
		color: '#FFFF00',
		power: 25
	},

	circlePink: {
		name: 'circlePink',
		color: '#FF00FF',
		power: 30
	},

	circleSad: {
		name: 'circleSad',
		color: '#0000FF',
		power: 35
	},

	triangl: {
		name: 'triangl',
		size: 30,
		color: '#00FF00',
		healh: 100,
	},

	stone: {
		name: 'stone',
		color: 'black',
	},

	// circles: [
	// 	this.circleRed, 
	// 	this.circleGreen, 
	// 	this.circleYellow, 
	// 	this.circleBlue, 
	// 	this.circleSad, 
	// 	this.circlePink
	// ],

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

	// pentagons: [
	// 	this.pentagonRPS, 
	// 	this.pentagonSBG, 
	// 	this.pentagonGYR
	// ],

	star: {
		name: 'star',
		colors: ['#0000FF', '#00FF00', '#FF0000'],
		power: 100
	}
};

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

/* harmony default export */ __webpack_exports__["a"] = (Setting);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scene_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gameObjects_monster_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__gameObjects_startower_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__variantBlock_js__ = __webpack_require__(8);








class SingleStrategy {
	
	constructor() {

		this.scene = new __WEBPACK_IMPORTED_MODULE_1__scene_js__["a" /* default */]();

		this.status = 'playerStep';
		this.fields = Array(__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize);
		this.variantRects = [];
		this.fieldsWithTowers = [];
		for (let i = 0; i < 4; i++){
			this.variantRects[i] = new __WEBPACK_IMPORTED_MODULE_6__variantBlock_js__["a" /* default */](i);
		}
		this.variantsShow = [];
		this.enemies = [];
		
		for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize; i++){
			this.fields[i] = Array(__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize);
		}
		
		for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize; i++){
			for (let j = 0; j < __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize; j++){
				this.fields[i][j] = {
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
					coordinates: [j, i]
				};

			
				this.fields[i][j]['field'].addEventListener('mousedown', () => {this.onClickField.call(this, this.fields[i][j])});
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

	onClickField(field) {
		this.generateTower(field);
		field.field.setStroke('red');
		//this.variantsShow = [];
	}

	onClickStayVariant(field, currentNewTower){
		for (let i = 0; i < this.fieldsNewTower.length; i++){
			let x = this.fieldsNewTower[i]['coordinates'][0];
			let y = this.fieldsNewTower[i]['coordinates'][1];
			console.log(__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapX + x * __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize)
			this.fields[x][y]['tower'] = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].stone, __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapX + x * __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize, __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapY + y * __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize, __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize / 2 - 2);
			console.log(this.fields[x][y]);
		}
		field['tower'] = currentNewTower;
		this.towers[currentNewTower.kind.name]++;
		this.fieldsWithTowers.push(field);
		this.fieldsNewTower = [];
		//variantsShow = [];
	}

	onClickWaveButton(){
		this.newStones = 0;
		this.variantRects.length = 4;
		this.status = 'Wave';
		//this.variantsShow = [];
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
		circle.draw.addEventListener('mousedown', () => { this.createVariants.call(this, field) } ); 
		circle['coordinates'] = field['coordinates'];
		this.fieldsNewTower.push(circle);
		this.newStones++;
	}

	createVariants(field) {
		let currentNewTower;
		let variantStay;
		//this.variantsShow = [];
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
			field['tower'] = currentNewTower;
		}
		let variants = this.listVariants(field);
		if (currentNewTower){
			this.towers[currentNewTower.kind.name]--;
			field['tower'] = 0
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
			variantStay.draw.addEventListener('mousedown', () => {this.onClickStayVariant.call(this, field, currentNewTower)});
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
				}
			}
			let waveButton = new __WEBPACK_IMPORTED_MODULE_6__variantBlock_js__["a" /* default */](4);
			waveButton.draw.addEventListener('mousedown', () => {this.onClickWaveButton.call(this)})
			this.variantRects.push(waveButton);
		}
	}

	gameWave() {
		this.enemies.push(new __WEBPACK_IMPORTED_MODULE_2__gameObjects_monster_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].triangl));
		for (let i = 0; i < this.fieldsWithTowers.length; i++){
			if (this.status === 'Wave'){
				this.fieldsWithTowers[i].tower.fire();
			};
			for (let j = 0; j < this.fieldsWithTowers[i].tower.bulletes.length; j++){
				let distY = this.enemies[0].draw.getY() - this.fieldsWithTowers[i].tower.bulletes[j].draw.getY();
				let distX = this.enemies[0].draw.getX() - this.fieldsWithTowers[i].tower.bulletes[j].draw.getX();
				let stepX = bulletStep / Math.pow(1 + Math.pow(distY/distX, 2), 0.5) * Math.abs(distX) / distX;
				let stepY = Math.pow(bulletStep * bulletStep - stepX * stepX, 0.5) * Math.abs(distY) / distY;
				this.fieldsWithTowers[i].tower.bulletes[j].setX(this.towers[kindTowers][i].bulletes[j].getX() + stepX);
				this.fieldsWithTowers[i].tower.bulletes[j].setY(this.towers[kindTowers][i].bulletes[j].getY() + stepY);
			};
		};
		this.enemies[0].draw.setY(this.enemies[0].draw.getY() + 1);
		if (this.enemies[0].draw.getY() > __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapY + __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize * __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].fieldSize){
			this.enemies = [];
			this.status = 'playerStep';
			for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize; i++){
				for (let j = 0; j < __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapSize; j++){
					this.fields[i][j]['field'].addEventListener('mousedown', () => {this.onClickField.call(this, this.fields[i][j])});
				};
			};
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
	}

	fire() {
		this.bulletes.push(new Konva.Circle({
			x: this.draw.x,
			y: this.draw.y,
			radius: 5,
			stroke: 'black',
			strokeWidth: 0,
			fill: this.draw.fill
		}));
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CircleTower;


/***/ }),
/* 3 */
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
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Monster;


/***/ }),
/* 4 */
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
/* harmony export (immutable) */ __webpack_exports__["a"] = PentagonTower;


/***/ }),
/* 5 */
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
/* unused harmony export default */


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategy_js__ = __webpack_require__(1);


const strategy = new __WEBPACK_IMPORTED_MODULE_0__strategy_js__["a" /* default */]();

/***/ }),
/* 7 */
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
				};
				
			};
		};
		for (let i = 0; i < this.state.fieldsNewTower.length; i++){
			layer.add(this.state.fieldsNewTower[i].draw);
		}

		for (let i = 0; i < this.state.variantRects.length; i++){
			layer.add(this.state.variantRects[i].draw);
		};
		//for (let i = 0; i < this.state.variantElements.length; i++){
		//	layer.add(this.state.variantElements[i]);
		//}
		for (let i = 0; i < this.state.variantsShow.length; i++){
			layer.add(this.state.variantsShow[i].draw);
		}
		for (let i = 0; i < this.state.enemies.length; i++){
			layer.add(this.state.enemies[i].draw);
		}

		// for (kindTowers in this.state.towers) {
		// 	for (let i = 0; i < this.state.towers[kindTowers].length; i++){
		// 		for (let j = 0; j < this.state.towers[kindTowers][i]['bulletes'].length; j++) {
		// 			layer.add(this.state.towers[kindTowers][i]['bulletes'][j])
		// 		}
		// 	}
		// }

		// for (let towerKind of Object.keys(this.state.towers)) {
		// 	for (let i = 0; i < this.state.towers.towerKind.length; i++){
		// 		for (let j = 0; j < this.state.towers.towerKind[i].bulletes.length; j++) {
		// 			layer.add(this.state.towers.towerKind[i].bulletes[j])
		// 		}
		// 	}
		// }

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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(0);


class VariantBlock {
	constructor(number) {
		this.draw = new Konva.Rect({
				x: window.innerWidth * 0.72,
				y: __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */].mapY + number * 120,
				width: window.innerWidth * 0.25,
				height: window.innerHeight * 0.1,
				fill: 'grey',
				stroke: 'black',
				strokeWidth: 2
			});
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = VariantBlock;
;

/***/ })
/******/ ]);