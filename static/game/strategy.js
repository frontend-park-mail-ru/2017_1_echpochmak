import Setting from './settings.js'
import Scene from './scene.js'
import Monster from './gameObjects/monster.js'
import CircleTower from './gameObjects/circletower.js'
import PentagonTower from './gameObjects/pentagontower.js'
import StarTower from './gameObjects/startower.js'
import VariantBlock from './variantBlock.js'

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
			console.log(Setting.mapX + x * Setting.fieldSize)
			this.fields[x][y]['tower'] = new CircleTower(Setting.stone, Setting.mapX + x * Setting.fieldSize, Setting.mapY + y * Setting.fieldSize, Setting.fieldSize / 2 - 2);
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
			field['tower'] = currentNewTower;
		}
		let variants = this.listVariants(field);
		if (currentNewTower){
			this.towers[currentNewTower.kind.name]--;
			field['tower'] = 0
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
		this.enemies.push(new Monster(Setting.triangl));
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
		if (this.enemies[0].draw.getY() > Setting.mapY + Setting.mapSize * Setting.fieldSize){
			this.enemies = [];
			this.status = 'playerStep';
			for (let i = 0; i < Setting.mapSize; i++){
				for (let j = 0; j < Setting.mapSize; j++){
					this.fields[i][j]['field'].addEventListener('mousedown', () => {this.onClickField.call(this, this.fields[i][j])});
				};
			};
		};
	}
};
