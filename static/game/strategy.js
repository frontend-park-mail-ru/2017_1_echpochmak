import Settings from './settings.js'
import Scene from './scene.js'
import Monster from './gameObjects/monster.js'
import CircleTower from './gameObjects/circletower.js'
import PentagonTower from './gameObjects/pentagontower.js'
import StarTower from './gameObjects/startower.js'
import VariantBlock from './variantBlock.js'

export default
class SingleStrategy {
	
	constructor() {

		this.settings = new Settings();
		this.scene = new Scene();

		this.status = 'playerStep';
		this.fields = Array(this.settings.mapSize);
		this.variantRects = [];
		this.fieldsWithTowers = [];
		for (let i = 0; i < 4; i++){
			this.variantRects[i] = new VariantBlock(i);
		}
		this.variantsShow = [];
		this.enemies = [];
		this.numberEnemies = 0;
		this.path = [];

		for (let i = 0; i < this.settings.mapSize; i++){
			this.fields[i] = Array(this.settings.mapSize);
		}
		
		for (let i = 0; i < this.settings.mapSize; i++){
			for (let j = 0; j < this.settings.mapSize; j++){
				this.fields[i][j] = {
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
			let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
			let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
			this.fields[yCoord][xCoord]['tower'] = new CircleTower(this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
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

		let circlePro = this.settings.circles[Math.floor(Math.random() * this.settings.circles.length)]
		
		console.log(circlePro);
		console.log(this.settings.circles);

		let circle = new CircleTower(
			circlePro, 
			field['field'].getX() + this.settings.fieldSize / 2,
			field['field'].getY() + this.settings.fieldSize / 2,
			this.settings.fieldSize / 2 - 2
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
			if ((field['field'].getX() + this.settings.fieldSize / 2 == this.fieldsNewTower[i].draw.getX()) && (field['field'].getY() + this.settings.fieldSize / 2 == this.fieldsNewTower[i].draw.getY()) && (this.newStones >= 5)){
				currentNewTower = this.fieldsNewTower[i];
				variantStay = new CircleTower(
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
			let variant = new PentagonTower(
				variants[i],
				variantX,
				variantY,
				this.settings.variantRadius
			);
			variantX = field['field'].getX() + this.settings.fieldSize / 2 - Math.cos(beta) * this.settings.fieldSize;
			variantY = field['field'].getY()  + this.settings.fieldSize / 2 - Math.sin(beta) * this.settings.fieldSize;
			beta = beta + alfa;
			this.variantsShow.push(variant);
		}
		if (currentNewTower){
			variantStay = new CircleTower(
				currentNewTower.kind,
				variantX,
				variantY,
				this.settings.variantRadius
			);
			variantStay.draw.addEventListener('mousedown', () => {this.onClickStayVariant.call(this, field, currentNewTower)});
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
		if (this.newStones >= 5){
			for (let i = 0; i < this.settings.mapSize; i++){
				for (let j = 0; j < this.settings.mapSize; j++){
					this.fields[i][j]['field'].removeEventListener('mousedown', () => {this.onClickField.call(this, this.fields[i][j])});
				}
			}
			let waveButton = new VariantBlock(4);
			waveButton.draw.addEventListener('mousedown', () => {this.onClickWaveButton.call(this)})
			this.variantRects.push(waveButton);
		}
	}

	gameWave() {

		if (this.path.length === 0) {
			this.path = this.findPath(this.settings.checkpoints);
		}

		if (this.numberEnemies < 20){
			this.enemies.push(new Monster(this.settings.triangl));
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
				let stepX = this.settings.bulletStep / Math.pow(1 + Math.pow(distY/distX, 2), 0.5) * Math.abs(distX) / distX;
				let stepY = Math.pow(this.settings.bulletStep * this.settings.bulletStep - stepX * stepX, 0.5) * Math.abs(distY) / distY;
				this.fieldsWithTowers[i].tower.bulletes[j].setX(this.fieldsWithTowers[i].tower.bulletes[j].getX() + stepX);
				this.fieldsWithTowers[i].tower.bulletes[j].setY(this.fieldsWithTowers[i].tower.bulletes[j].getY() + stepY);
			};
		};
		if (this.enemies[0].numberTurns === this.path.length){
			this.enemies.splice(0, 1);
		};
		for (let i = 0; i < this.enemies.length; i++){
			console.log(this.enemies[i].numberTurns)
			let place = this.path[this.enemies[i].numberTurns];
			let distX = -this.enemies[i].draw.getX() + (this.settings.mapX + place[0] * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2);
			let distY = -this.enemies[i].draw.getY() + (this.settings.mapY + place[1] * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2);
			if (Math.abs(distX) < this.enemies[i].kind.size && Math.abs(distY) < this.enemies[i].kind.size){
				this.enemies[i].numberTurns++;
				continue;
			};
			let stepX = this.settings.monsterStep / Math.pow(1 + Math.pow(distY/distX, 2), 0.5) * Math.abs(distX) / distX;
			let stepY = Math.pow(this.settings.monsterStep * this.settings.monsterStep - stepX * stepX, 0.5) * Math.abs(distY) / distY;
			this.enemies[i].draw.setX(this.enemies[i].draw.getX() + stepX);
			this.enemies[i].draw.setY(this.enemies[i].draw.getY() + stepY);
		}
		if (this.enemies.length === 0) {
			this.status = 'playerStep';
			this.numberEnemies = 0;
			for (let i = 0; i < this.settings.mapSize; i++){
				for (let j = 0; j < this.settings.mapSize; j++){
					this.fields[i][j]['field'].addEventListener('mousedown', () => {this.onClickField.call(this, this.fields[i][j])});
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
