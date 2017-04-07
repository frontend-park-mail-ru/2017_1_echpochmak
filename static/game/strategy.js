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
					})
				};

				console.log(this.fields[i][j].field);
				console.log(Setting);
				console.log(Setting.fieldSize);

				this.fields[i][j]['field'].addEventListener('mousedown', this.onClickField);
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
			fields: this.fields,
			variantRects: this.variantRects,
			towers: this.towers,
			fieldsNewTower: this.fieldsNewTower,
			variantElements: this.variantElements,
			variantsShow: this.variantsShow,
			enemies: this.enemies 
		}

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

		this.scene.setState(this.state);
		this.scene.render();
		// this.scene.testDraw();
	}

	updateState() {

	}

	onClickField() {
		this.generateTower(this.fields[i][j]);
		this.fields[i][j]['field'].setStroke('red');
	}

	onClickStayVariant(field, currentNewTower){
		field['tower'] = currentNewTower;
		towers[currentNewTower.kind.name].push(currentNewTower);
		fieldsNewTower = [];
		variantsShow = [];
	}

	onClickWaveButton(){
		this.newStones = 0;
		this.variantRects.length = 4;
		this.status = 'Wave';
	}

	generateTower(field) {

		let circlePro = circles[Math.floor(Math.random() * circles.length)]
		
		let circle = new CircleTower(
			circlePro, 
			field['field'].getX() + fieldSize / 2,
			field['field'].getY() + fieldSize / 2,
			Setting.fieldSize / 2 - 2
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
				variantStay = new CircleTower(
					currentNewTower['kind'],
					Setting.variantX,
					Setting.variantY,
					Setting.variantRadius
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
			variant = new PentagonTower(
				variants[i],
				Setting.variantX,
				Setting.variantY,
				Setting.variantRadius
			);
			variantX = field['field'].getX() + fieldSize / 2 - Math.cos(beta) * fieldSize;
			variantY = field['field'].getY()  + fieldSize / 2 - Math.sin(beta) * fieldSize;
			beta = beta + alfa;
			variantsShow.push(variant.draw);
		}
		if (currentNewTower){
			variantStay = new CircleTower(
				currentNewTower.kind,
				Setting.variantX,
				Setting.variantY,
				Setting.variantRadius
			);
			variantStay.addEventListener('mousedown', () => {onClickStayVariant(field, currentNewTower)});
			variantsShow.push(variantStay.draw);
		};
	}

	listVariants(field) {
		let variants = [];
		if (((this.towers['circleRed'].length > 0) && (this.towers['circlePink'].length > 0) && (this.towers['circleSad'].length > 0)) && ((field.tower.kind == Setting.circleRed) || (field.tower.kind == Setting.circlePink) || (field.tower.kind == Setting.circleSad))){
		variants.push(Setting.pentagonRPS);
		};
		if (((this.towers['circleSad'].length > 0) && (this.towers['circleBlue'].length > 0) && (this.towers['circleGreen'].length > 0)) && ((field.tower.kind == Setting.circleSad) || (field.tower.kind == Setting.circleBlue) || (field.tower.kind == Setting.circleGreen))){
			variants.push(Setting.pentagonSBG);
		};
		if (((this.towers['circleGreen'].length > 0) && (this.towers['circleYellow'].length > 0) && (this.towers['circleRed'].length > 0)) && ((field.tower.kind == Setting.circleGreen) || (field.tower.kind == Setting.circleYellow) || (field.tower.kind == Setting.circleRed))){
			variants.push(Setting.pentagonGYR);
		};
		return variants;
	}

	playerStep() {
		if (this.newStones >= 5){
			for (let i = 0; i < Setting.mapSize; i++){
				for (let j = 0; j < Setting.mapSize; j++){
					fields[i][j]['field'].removeEventListener('mousedown', onClickField);
				}
			}
			let waveButton = new variantBlock(4);
			waveButton.addEventListener('mousedown', onClickWaveButton)
			this.variantRects.push(waveButton);
		}
	}

	gameWave() {
		this.enemies.push(new Monster(Setting.triangl));
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
		if (enemies[0].getY() > Setting.mapY + Setting.mapSize * Setting.fieldSize){
			this.enemies = [];
			this.status = 'playerStep';
			for (let i = 0; i < Setting.mapSize; i++){
				for (let j = 0; j < Setting.mapSize; j++){
					this.fields[i][j]['field'].addEventListener('mousedown', onClickField);
				};
			};
		};
	}

	findPath() {
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

		const grid = new PF.Grid(matrix);
		const finder = new PF.BiAStarFinder({
			allowDiagonal: true,
			heuristic: PF.Heuristic.euclidean
		});

		const path = finder.findPath(start.x, stert.y, finish.x, finish.y, grid);
	}
}
