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
/***/ (function(module, exports) {

var mapSize = 10;
var fieldSize = window.innerHeight * 0.9 / mapSize;
var mapX = window.innerWidth * 0.2;	
var mapY = window.innerHeight * 0.05;
var bulletStep = 10;

var circleRed = {
	name: 'circleRed',
	color: '#FF0000',
	power: 10,
};

var circleBlue = {
	name: 'circleBlue',
	color: '#00FFFF',
	power: 15
};

var circleGreen = {
	name: 'circleGreen',
	color: '#00FF00',
	power: 20
};

var circleYellow = {
	name: 'circleYellow',
	color: '#FFFF00',
	power: 25
};

var circlePink = {
	name: 'circlePink',
	color: '#FF00FF',
	power: 30
};

var circleSad = {
	name: 'circleSad',
	color: '#0000FF',
	power: 35
};

var circles = [circleRed, circleGreen, circleYellow, circleBlue, circleSad, circlePink];

var pentagonRPS = {
	name: 'pentagonRPS',
	power: 70,
	colors: ['#FF0000', '#FF00FF', '#0000FF'],
};

var pentagonSBG = {
	name: 'pentagonSBG',
	power: 80,
	colors: ['#0000FF', '#00FFFF', '#00FF00'],
};

var pentagonGYR = {
	name: 'pentagonGYR',
	power: 70,
	colors: ['#00FF00', '#FFFF00', '#FF0000'],
};

var pentagons = [pentagonRPS, pentagonSBG, pentagonGYR];

var star = {
	name: 'star',
	colors: ['#0000FF', '#00FF00', '#FF0000'],
	power: 100
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__settings_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scene_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gameObjects_monster_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__gameObjects_startower_js__ = __webpack_require__(5);







class SingleStrategy {
	
	constructor() {

		this.scene = new __WEBPACK_IMPORTED_MODULE_1__scene_js__["a" /* default */]();

		this.status = 'playerStep';
		this.fields = Array(mapSize);
		this.variantRects = [];
		for (let i = 0; i < 4; i++){
			variantRects[i] = new Konva.Rect(i);
		}
		this.enemies = [];
		
		for (let i = 0; i < mapSize; i++){
			this.fields[i] = Array(mapSize);
		}
		
		for (let i = 0; i < mapSize; i++){
			for (let j = 0; j < mapSize; j++){
				this.fields[i][j] = {
					tower: 0,
					field: new Konva.Rect({
						x: mapX + j * fieldSize + j * 2,
						y: mapY + i * fieldSize + i * 2,
						width: fieldSize,
						height: fieldSize,
						fill: 'grey',
						stroke: 'black',
						strokeWidth: 2
					})
				};

				this.fields[i][j]['field'].addEventListener('mousedown', onClickField);
			};
		};

		this.fieldsNewTower = [];
		this.newStones = 0;
		this.towers = {
			circleBlue: [],
			circleRed: [],
			circleGreen: [],
			circleYellow: [],
			circlePink: [],
			circleSad: [],
			pentagonRPS: [],
			pentagonSBG: [],
			pentagonGYR: [],
			star: [],
		};

		this.state = {
			fields: fields,
			variantRects: variantRects,
			towers: towers,
			fieldsNewTower: fieldsNewTower,
			variantElements: variantElements,
			variantsShow: variantsShow,
			enemies: enemies 
		}

		this.gameInterval = setInterval(gameLoop, 17);
	}

	gameLoop() {
		if (this.status === 'playerStep') {
			this.playerStep();
		} else {
			this.wave();
		}

		this.updateState();

		this.state.setState(this.state);
		this.state.render();
	}

	updateState() {

	}

	onClickField() {
		this.generateTower(this.fields[i][j]);
		this.fields[i][j]['field'].setStroke('red');
	};

	onClickStayVariant(field, currentNewTower){
		field['tower'] = currentNewTower;
		towers[currentNewTower.kind.name].push(currentNewTower);
		fieldsNewTower = [];
		variantsShow = [];
	};

	onClickWaveButton(){
		this.newStones = 0;
		this.variantRects.length = 4;
		this.status = 'Wave';
	};

	generateTower(field) {

		let circlePro = circles[Math.floor(Math.random() * circles.length)]
		
		let circle = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](
			circlePro, 
			field['field'].getX() + fieldSize / 2,
			field['field'].getY() + fieldSize / 2,
			fieldSize / 2 - 2
		);

		field['field'].removeEventListener('mousedown', onClickField);
		circle.draw.addEventListener('mousedown', () => { createVariants(field) } );

		fieldsNewTower.push(circle);
		this.newStones++;
	}

	createVariants(field) {
		let variantsShow = []
		let currentNewTower;
		let variantStay;
		for (let i = 0; i < this.fieldsNewTower.length; i++) {
			if ((field['field'].getX() + fieldSize / 2 == fieldsNewTower[i]['towerDraw'].getX()) && (field['field'].getY() + fieldSize / 2 == fieldsNewTower[i]['towerDraw'].getY())){
				currentNewTower = fieldsNewTower[i];
				variantStay = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](
					currentNewTower['kind'],
					variantsX + variantsXSize * 0.1,
					variantsY + variantsYSize * 0.5,
					variantsYSize / 2 - 7,
				);
			};
		};
		if (currentNewTower){
			towers[currentNewTower.kind.name].push(1);
			field['tower'] = currentNewTower;
		}
		variants = listVariants(field);
		if (currentNewTower){
			towers[currentNewTower.kind.name].length -= 1;
			field['tower'] = 0
		}
		let alfa = 6.28 / (variants.length + 1);
		beta = alfa;
		variantX = field['field'].getX() + fieldSize / 2 - fieldSize;
		variantY = field['field'].getY() + fieldSize / 2;
		for (var i = 0; i < variants.length; i++){
			variant = new __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__["a" /* default */](
				variants[i],
				variantX,
				variantY,
				variantRadius
			);
			variantX = field['field'].getX() + fieldSize / 2 - Math.cos(beta) * fieldSize;
			variantY = field['field'].getY()  + fieldSize / 2 - Math.sin(beta) * fieldSize;
			beta = beta + alfa;
			variantsShow.push(variant.draw);
		}
		if (currentNewTower){
			variantStay = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](
				currentNewTower.kind,
				variantX,
				variantY,
				variantRadius
			);
			variantStay.addEventListener('mousedown', () => {onClickStayVariant(field, currentNewTower)});
			variantsShow.push(variantStay.draw);
		};
	};

	listVariants(field){
		let variants = [];
		if (((this.towers['circleRed'].length > 0) && (this.towers['circlePink'].length > 0) && (this.towers['circleSad'].length > 0)) && ((field.tower.kind == circleRed) || (field.tower.kind == circlePink) || (field.tower.kind == circleSad))){
		variants.push(pentagonRPS);
		};
		if (((this.towers['circleSad'].length > 0) && (this.towers['circleBlue'].length > 0) && (this.towers['circleGreen'].length > 0)) && ((field.tower.kind == circleSad) || (field.tower.kind == circleBlue) || (field.tower.kind == circleGreen))){
			variants.push(pentagonSBG);
		};
		if (((this.towers['circleGreen'].length > 0) && (this.towers['circleYellow'].length > 0) && (this.towers['circleRed'].length > 0)) && ((field.tower.kind == circleGreen) || (field.tower.kind == circleYellow) || (field.tower.kind == circleRed))){
			variants.push(pentagonGYR);
		};
		return variants;
	}

	playerStep(){
		if (this.newStones >= 5){
			for (let i = 0; i < mapSize; i++){
				for (let j = 0; j < mapSize; j++){
					fields[i][j]['field'].removeEventListener('mousedown', onClickField);
				}
			}
			let waveButton = new variantBlock(4);
			waveButton.addEventListener('mousedown', onClickWaveButton)
			this.variantRects.push(waveButton);
		}
	}

	wave(){
		this.enemies.push(new __WEBPACK_IMPORTED_MODULE_2__gameObjects_monster_js__["a" /* default */](triangl));
		for (let kindTowers in this.towers){
			for (let i = 0; i < this.towers[kindTowers].length; i++){
				if (!isEndWave){
					this.towers[kindTowers][i].fire();
				};
				for (let j = 0; j < this.towers[kindTowers][i].bulletes.length; j++){
					let distY = this.enemies[0].draw.getY() - this.towers[kindTowers][i].bulletes[j].draw.getY();
					let distX = this.enemies[0].draw.getX() - this.towers[kindTowers][i].bulletes[j].darw.getX();
					let stepX = bulletStep / Math.pow(1 + Math.pow(distY/distX, 2), 0.5) * Math.abs(distX) / distX;
					let stepY = Math.pow(bulletStep * bulletStep - stepX * stepX, 0.5) * Math.abs(distY) / distY;
					this.towers[kindTowers][i].bulletes[j].setX(towers[kindTowers][i].bulletes[j].getX() + stepX);
					this.towers[kindTowers][i].bulletes[j].setY(towers[kindTowers][i].bulletes[j].getY() + stepY);
				};
			};
		};
		this.enemies[0].setY(enemies[0].getY() + 1);
		if (enemies[0].getY() > mapY + mapSize * fieldSize){
			this.enemies = [];
			this.status = 'playerStep';
			for (let i = 0; i < mapSize; i++){
				for (let j = 0; j < mapSize; j++){
					this.fields[i][j]['field'].addEventListener('mousedown', onClickField);
				};
			};
		};
	};
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SingleStrategy;
;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
class Monster {
	constructor(name) {
		this.draw = new Konva.RegularPolygon({
			x: mapX,
			y: mapY,
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__settings_js__);


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

		for (let i = 0; i < mapSize; i++){
			for (let j = 0; j < mapSize; j++){
				layer.add(state.fields[i][j].field);
				if (state.fields[i][j].tower){
					layer.add(state.fields[i][j].tower);
				};
				
			};
		};
		for (let i = 0; i < state.fieldsNewTower.length; i++){
			layer.add(state.fieldsNewTower[i].draw);
		}

		for (let i = 0; i < state.variantRects.length; i++){
			layer.add(state.variantRects[i]);
		};
		//for (let i = 0; i < state.variantElements.length; i++){
		//	layer.add(state.variantElements[i]);
		//}
		for (let i = 0; i < state.variantsShow.length; i++){
			layer.add(state.variantsShow[i]);
		}
		for (let i = 0; i < state.enemies.length; i++){
			layer.add(state.enemies[i]);
		}
		for (kindTowers in state.towers){
			for (let i = 0; i < state.towers[kindTowers].length; i++){
				for (let j = 0; j < state.towers[kindTowers][i].bulletes.length; j++) {
					layer.add(state.towers[kindTowers][i].bulletes[j])
				}
			}
		}

		stage.add(layer);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Scene;


/***/ })
/******/ ]);