class SingleStrategy {
	
	constructor() {

		this.status = 'playerStep';
		this.fields = Array(mapSize);
		this.variantRects = [];
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
			variants: []
		}
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
		
		let circle = new CircleTower(
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
				variantStay = new CircleTower(
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
			variant = new PentagonTower(
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
			variantStay = new CircleTower(
				currentNewTower.kind,
				variantX,
				variantY,
				variantRadius
			);
			variantStay.addEventListener('mousedown', () => {onClickStayVariant(field, currentNewTower)});
			variantsShow.push(variantStay.draw);
		};
	};
};

function listVariants(field){
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

function playerStep(){
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

function wave(){
	this.enemies.push(new Monster(triangl));
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