class SingleStrategy {
	
	constructor() {
		
		this.fields = Array(mapSize);
		
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

		this.state = {
			fields: fields,
			variants: []
		}
	}

	onClickField() {
		this.generateTower(this.fields[i][j]);
		this.fields[i][j]['field'].setStroke('red');
	}

	generateTower(field) {

		let circlePro = circles[Math.floor(Math.random() * circles.length)]
		// let circle = new Konva.Circle({
		// 	x: field['field'].getX() + fieldSize / 2,
		// 	y: field['field'].getY() + fieldSize / 2,
		// 	radius: fieldSize / 2 - 2,
		// 	fill: circlePro['color'],
		// 	stroke: 'black',
		// 	strokeWidth: 0
		// });
		
		let circle = new CircleTower(
			circlePro, 
			field['field'].getX() + fieldSize / 2,
			field['field'].getY() + fieldSize / 2,
			fieldSize / 2 - 2
		);

		field['field'].removeEventListener('mousedown', onClickField);
		circle.draw.addEventListener('mousedown', () => { createVariants(field) } );

		fieldsNewTower.push(circle);
		//towers[circlePro['name']].push(circle);
		//field['tower'] = circle;
		this.newStones++;
	}

	createVariants(field) {
		let variantsShow = []
		let currentNewTower;
		let variantStay;
		for (let i = 0; i < this.fieldsNewTower.length; i++) {
			if ((field['field'].getX() + fieldSize / 2 == fieldsNewTower[i]['towerDraw'].getX()) && (field['field'].getY() + fieldSize / 2 == fieldsNewTower[i]['towerDraw'].getY())){
				currentNewTower = fieldsNewTower[i];
				variantStay = new Konva.Circle({
					x: variantsX + variantsXSize * 0.1,
					y: variantsY + variantsYSize * 0.5,
					radius: variantsYSize / 2 - 7,
					fill: circleRed['color'],
					stroke: 'black',
					strokeWidth: 0
				});
			};
		};
		if (currentNerTower){
			towers[currentNerTower['towerKind']['name']].push(1);
			field['tower'] = currentNerTower['towerDraw'];
		}
		variants = listVariants(field);
		if (currentNerTower){
			towers[currentNerTower['towerKind']['name']].length -= 1;
			field['tower'] = 0
		}
		console.log(variants);
		let alfa = 6.28 / (variants.length + 1);
		beta = alfa;
		variantX = field['field'].getX() + fieldSize / 2 - fieldSize;
		variantY = field['field'].getY() + fieldSize / 2;
		for (var i = 0; i < variants.length; i++){
			variant = new Konva.RegularPolygon(variants[i]['draw']);
			variant.setX(variantX);
			variant.setY(variantY);
			console.log(variant);
			

			variantX = field['field'].getX() + fieldSize / 2 - Math.cos(beta) * fieldSize;
			variantY = field['field'].getY()  + fieldSize / 2 - Math.sin(beta) * fieldSize;
			beta = beta + alfa;
			variantsShow.push(variant);
		}
		if (currentNerTower){
			variantStay = new Konva.Circle({
				x: variantX,
				y: variantY,
				radius: 20,
				fill: currentNerTower['towerDraw'].getFill(),
				stroke: 'black',
				strokeWidth: 0
			});
			variantStay.addEventListener('mousedown', function(){
				field['tower'] = currentNerTower['towerDraw'];
				towers[currentNerTower['towerKind']['name']].push(currentNerTower['towerDraw']);
				fieldsNewTower = [];
				variantsShow = [];
			})
			variantsShow.push(variantStay)
		}

		draw();
	}
}