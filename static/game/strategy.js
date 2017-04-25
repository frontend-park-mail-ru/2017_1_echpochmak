import Settings from './settings.js'
import Scene from './scene.js'
import Monster from './gameObjects/monster.js'
import CircleTower from './gameObjects/circletower.js'
import PentagonTower from './gameObjects/pentagontower.js'
import StarTower from './gameObjects/startower.js'
import VariantBlock from './variantBlock.js'
import Arrow from './gameObjects/arrow.js'

export default
class SingleStrategy {
	
	constructor() {

		this.settings = new Settings();
		this.scene = new Scene();

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
			this.variantRects[i] = new VariantBlock(i);
		}

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++){
				this.variantElements.push(new CircleTower(
					this.settings.variantCircls[i][j],
					this.settings.variantsX + this.settings.variantsXSize * 0.1 * (j * 2 + 1),
					this.settings.variantsY + this.settings.variantsYSize * 0.5 + i * this.settings.betweenVariants,
					this.settings.variantsYSize / 2 - 7
				))
			}
			this.variantElements.push(new Arrow(i));
			this.variantElements.push(new PentagonTower(
				this.settings.pentagons[i],
				this.settings.variantsX + this.settings.variantsXSize * 0.9,
				this.settings.variantsY + this.settings.variantsYSize * 0.5 + i * this.settings.betweenVariants,
				this.settings.variantsYSize / 2 - 7
			))
		}

		for (let i = 0; i < 3; i++) {
			this.variantElements.push(new PentagonTower(
				this.settings.pentagons[i],
				this.settings.variantsX + this.settings.variantsXSize * 0.1 * (i * 2 + 1),
				this.settings.variantsY + this.settings.variantsYSize * 0.5 + 3 * this.settings.betweenVariants,
				this.settings.variantsYSize / 2 - 7
			))
		}
		this.variantElements.push(new Arrow(3));
		this.variantElements.push(new StarTower(
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

	start() {
		requestAnimationFrame(() => {
			this.gameLoop.call(this);
		});
	}

	finish() {
		
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

	isAbleTower(place) {
		return true;
	}

	onClickField(field) {
		if (field.ableTower){
			this.generateTower(field);
			this.variantsShow = [];
			this.variantRects.length = 4;
		} else if (this.variantRects.length < 5){
			let waveButton = new VariantBlock(4, "You cant stop monsters");
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
				this.fields[xCoord][yCoord]['tower'] = new CircleTower(this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
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
		this.fields[x][y].tower = new PentagonTower(kind, xp, yp, this.settings.fieldSize / 2 - 2);
		for (let i = 0; i < this.fieldsWithTowers.length; i++){
			if (this.fieldsWithTowers[i].tower.kind.name === deleteCircles[0]){
				let xCoord = this.fieldsWithTowers[i].coordinates[0];
				let yCoord = this.fieldsWithTowers[i].coordinates[1];
				let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2);
				let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2);
				this.fields[xCoord][yCoord].tower = new CircleTower(this.settings.stone, yPixel, xPixel, this.settings.fieldSize / 2 - 2);
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
				this.fields[xCoord][yCoord].tower = new CircleTower(this.settings.stone, yPixel, xPixel, this.settings.fieldSize / 2 - 2);
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
			this.fields[xCoord][yCoord]['tower'] = new CircleTower(this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
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

		let circle = new CircleTower(
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
			let cNewTower = currentNewTower ? currentNewTower : undefined;
			variant.draw.addEventListener('click', () => {this.onClickNewPentagon.call(this, field, variant.kind, cNewTower)});
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
			this.enemies.push(new Monster(this.settings.triangl));
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
