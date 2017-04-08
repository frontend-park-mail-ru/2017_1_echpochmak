import Setting from './settings.js'
import Scene from './scene.js'
import Monster from './gameObjects/monster.js'
import CircleTower from './gameObjects/circletower.js'
import PentagonTower from './gameObjects/pentagontower.js'
import StarTower from './gameObjects/startower.js'
import VariantBlock from './variantBlock.js'

var way = [[0,0], [0, 9], [9,0], [9,9]];

export default
class SingleStrategy {
	
	constructor() {

		this.scene = new Scene();

		this.status = 'playerStep';
		this.fields = Array(Setting.mapSize);
		this.variantRects = [];
		this.fieldsWithTowers = [];
		for (let i = 0; i < 4; i++){
			this.variantRects[i] = new VariantBlock(i);
		}
		this.variantsShow = [];
		this.enemies = [];
		this.numberEnemies = 0;
		
		for (let i = 0; i < Setting.mapSize; i++){
			this.fields[i] = Array(Setting.mapSize);
		}
		
		for (let i = 0; i < Setting.mapSize; i++){
			for (let j = 0; j < Setting.mapSize; j++){
				this.fields[i][j] = {
					tower: 0,
					field: new Konva.Rect({
						x: Setting.mapX + j * Setting.fieldSize + j * 2,
						y: Setting.mapY + i * Setting.fieldSize + i * 2,
						width: Setting.fieldSize,
						height: Setting.fieldSize,
						fill: 'grey',
						stroke: 'black',
						strokeWidth: 2
					}),
					coordinates: [i, j]
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

		// this.gameInterval = setInterval(() => {
		// 	this.gameLoop.call(this);
		// }, 17);

		requestAnimationFrame(() => {
			this.gameLoop.call(this);
		});
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

		requestAnimationFrame(() => {
			this.gameLoop.call(this);
		});
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
		this.variantsShow = [];
	}

	onClickStayVariant(field, currentNewTower){
		for (let i = 0; i < this.fieldsNewTower.length; i++){
			let xCoord = this.fieldsNewTower[i]['coordinates'][1];
			let yCoord = this.fieldsNewTower[i]['coordinates'][0];
			let xPixel = Setting.mapX + xCoord * (Setting.fieldSize + 2) + Setting.fieldSize / 2;
			let yPixel = Setting.mapY + yCoord * (Setting.fieldSize + 2) + Setting.fieldSize / 2;
			this.fields[yCoord][xCoord]['tower'] = new CircleTower(Setting.stone, xPixel, yPixel, Setting.fieldSize / 2 - 2);
			//console.log(this.fields[this.fieldsNewTower[i].coordinates[0]][this.fieldsNewTower[i].coordinates[1]].field)
			this.fields[this.fieldsNewTower[i].coordinates[0]][this.fieldsNewTower[i].coordinates[1]].field.setStroke('black');
			//console.log(this.fields[this.fieldsNewTower[i].coordinates[0]][this.fieldsNewTower[i].coordinates[1]].field)
		}
		this.fields[field.coordinates[0]][field.coordinates[1]]['tower'] = currentNewTower;
		this.towers[currentNewTower.kind.name]++;
		this.fieldsWithTowers.push(field);
		this.fieldsNewTower = [];
		this.variantsShow = [];
	}

	onClickWaveButton(){
		this.newStones = 0;
		this.variantRects.length = 4;
		this.status = 'Wave';
		this.variantsShow = [];
	}

	generateTower(field) {

		let circlePro = Setting.circles[Math.floor(Math.random() * Setting.circles.length)]
		
		let circle = new CircleTower(
			circlePro, 
			field['field'].getX() + Setting.fieldSize / 2,
			field['field'].getY() + Setting.fieldSize / 2,
			Setting.fieldSize / 2 - 2
		);

		field['field'].removeEventListener('mousedown', () => {this.onClickField.call(this, field)});
		circle.draw.addEventListener('mousedown', () => { this.createVariants.call(this, field) } ); 
		circle['coordinates'] = field['coordinates'];
		this.fieldsNewTower.push(circle);
		this.newStones++;
	}

	createVariants(field) {
		this.variantsShow = [];

		let currentNewTower;
		let variantStay;
		//this.variantsShow = [];
		for (let i = 0; i < this.fieldsNewTower.length; i++) {
			if ((field['field'].getX() + Setting.fieldSize / 2 == this.fieldsNewTower[i].draw.getX()) && (field['field'].getY() + Setting.fieldSize / 2 == this.fieldsNewTower[i].draw.getY()) && (this.newStones >= 5)){
				currentNewTower = this.fieldsNewTower[i];
				variantStay = new CircleTower(
					currentNewTower['kind'],
					Setting.variantX,
					Setting.variantY,
					Setting.variantRadius
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
		let variantX = field['field'].getX() + Setting.fieldSize / 2 - Setting.fieldSize;
		let variantY = field['field'].getY() + Setting.fieldSize / 2;
		for (var i = 0; i < variants.length; i++){
			let variant = new PentagonTower(
				variants[i],
				variantX,
				variantY,
				Setting.variantRadius
			);
			variantX = field['field'].getX() + Setting.fieldSize / 2 - Math.cos(beta) * Setting.fieldSize;
			variantY = field['field'].getY()  + Setting.fieldSize / 2 - Math.sin(beta) * Setting.fieldSize;
			beta = beta + alfa;
			this.variantsShow.push(variant);
		}
		if (currentNewTower){
			variantStay = new CircleTower(
				currentNewTower.kind,
				variantX,
				variantY,
				Setting.variantRadius
			);
			variantStay.draw.addEventListener('mousedown', () => {this.onClickStayVariant.call(this, field, currentNewTower)});
			this.variantsShow.push(variantStay);
		};
	}

	listVariants(field) {
		let variants = [];
		if (((this.towers['circleRed'] > 0) && (this.towers['circlePink'] > 0) && (this.towers['circleSad'] > 0)) && ((field.tower.kind == Setting.circleRed) || (field.tower.kind == Setting.circlePink) || (field.tower.kind == Setting.circleSad))){
		variants.push(Setting.pentagonRPS);
		};
		if (((this.towers['circleSad'] > 0) && (this.towers['circleBlue'] > 0) && (this.towers['circleGreen'] > 0)) && ((field.tower.kind == Setting.circleSad) || (field.tower.kind == Setting.circleBlue) || (field.tower.kind == Setting.circleGreen))){
			variants.push(Setting.pentagonSBG);
		};
		if (((this.towers['circleGreen'] > 0) && (this.towers['circleYellow'] > 0) && (this.towers['circleRed'] > 0)) && ((field.tower.kind == Setting.circleGreen) || (field.tower.kind == Setting.circleYellow) || (field.tower.kind == Setting.circleRed))){
			variants.push(Setting.pentagonGYR);
		};
		return variants;
	}

	playerStep() {
		if (this.newStones >= 5){
			for (let i = 0; i < Setting.mapSize; i++){
				for (let j = 0; j < Setting.mapSize; j++){
					this.fields[i][j]['field'].removeEventListener('mousedown', () => {this.onClickField.call(this, this.fields[i][j])});
				}
			}
			let waveButton = new VariantBlock(4);
			waveButton.draw.addEventListener('mousedown', () => {this.onClickWaveButton.call(this)})
			this.variantRects.push(waveButton);
		}
	}

	gameWave() {
		if (this.numberEnemies < 20){
			this.enemies.push(new Monster(Setting.triangl));
			this.numberEnemies++;
		};
		for (let i = 0; i < this.fieldsWithTowers.length; i++){
			if (this.status === 'Wave'){
				this.fieldsWithTowers[i].tower.fire();
			};
			for (let j = 0; j < this.fieldsWithTowers[i].tower.bulletes.length; j++){
				let distY = this.enemies[0].draw.getY() - this.fieldsWithTowers[i].tower.bulletes[j].getY();
				let distX = this.enemies[0].draw.getX() - this.fieldsWithTowers[i].tower.bulletes[j].getX();
				if (Math.abs(distX) < this.enemies[0].kind.size && Math.abs(distY) < this.enemies[0].kind.size){
					this.fieldsWithTowers[i].tower.bulletes.splice(j, 1);
					this.enemies[0].health - 10;
					continue;
				}
				let stepX = Setting.bulletStep / Math.pow(1 + Math.pow(distY/distX, 2), 0.5) * Math.abs(distX) / distX;
				let stepY = Math.pow(Setting.bulletStep * Setting.bulletStep - stepX * stepX, 0.5) * Math.abs(distY) / distY;
				this.fieldsWithTowers[i].tower.bulletes[j].setX(this.fieldsWithTowers[i].tower.bulletes[j].getX() + stepX);
				this.fieldsWithTowers[i].tower.bulletes[j].setY(this.fieldsWithTowers[i].tower.bulletes[j].getY() + stepY);
			};
		};
		if (this.enemies[0].numberTurns === way.length){
			this.enemies.splice(0, 1);
		};
		for (let i = 0; i < this.enemies.length; i++){
			console.log(this.enemies[i].numberTurns)
			let place = way[this.enemies[i].numberTurns];
			let distX = -this.enemies[i].draw.getX() + (Setting.mapX + place[0] * (Setting.fieldSize + 2) + Setting.fieldSize / 2);
			let distY = -this.enemies[i].draw.getY() + (Setting.mapY + place[1] * (Setting.fieldSize + 2) + Setting.fieldSize / 2);
			if (Math.abs(distX) < this.enemies[i].kind.size && Math.abs(distY) < this.enemies[i].kind.size){
				this.enemies[i].numberTurns++;
				continue;
			};
			let stepX = Setting.monsterStep / Math.pow(1 + Math.pow(distY/distX, 2), 0.5) * Math.abs(distX) / distX;
			let stepY = Math.pow(Setting.monsterStep * Setting.monsterStep - stepX * stepX, 0.5) * Math.abs(distY) / distY;
			this.enemies[i].draw.setX(this.enemies[i].draw.getX() + stepX);
			this.enemies[i].draw.setY(this.enemies[i].draw.getY() + stepY);
		}
		if (this.enemies.length === 0){
			this.status = 'playerStep';
			this.numberEnemies = 0;
			for (let i = 0; i < Setting.mapSize; i++){
				for (let j = 0; j < Setting.mapSize; j++){
					this.fields[i][j]['field'].addEventListener('mousedown', () => {this.onClickField.call(this, this.fields[i][j])});
				};
			};
			for (let i = 0; i < this.fieldsWithTowers.length; i++){
				this.fields[this.fieldsWithTowers[i].coordinates[0]][this.fieldsWithTowers[i].coordinates[1]].tower.bulletes = [];
			}
		};
	}

	findPath(checkpoints) {
		let matrix = Array(mapSize);
		for (let i = 0; i < mapSize; ++i) {
			matrix[i] = Array(mapSize);
		}

		for (let i = 0; i < mapSize; ++i) {
			for (let j = 0; j < mapSize; ++j) {
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
		curStart = start;
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
