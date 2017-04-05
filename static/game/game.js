(function () {

	var mapSize = 10;
	var fieldSize = window.innerHeight * 0.9 / mapSize;

	var mapX = window.innerWidth * 0.2;
	var mapY = window.innerHeight * 0.05;
	var variantsX = window.innerWidth * 0.72;
	var variantsY = mapY;
	var variantsXSize = window.innerWidth * 0.25;
	var variantsYSize = window.innerHeight * 0.1;
	var betweenVariants = 120;
	var newStones = 0;
	var isEndWave = false;
	var bulletStep = 10;
	var fieldsNewTower = []

	var variantsShow = []
	var enemies = []
	var towers = {
		circleBlue: new Array(),
		circleRed: new Array(),
		circleGreen: new Array(),
		circleYellow: new Array(),
		circlePink: new Array(),
		circleSad: new Array(),
		pentagonRPS: [],
		pentagonSBG: [],
		pentagonGYR: [],
		star: [],
	};

	var enemie = {
		x: mapX,
		y: mapY,
		width: 30,
		height: 30,
		fill: 'blue',
		stroke: 'black',
		strokeWidth: 0,
	}

	var circleRed = {
		name: 'circleRed',
		color: '#FF0000',
		power: 10,
		draw: {

		}
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
		draw: {
			x: variantsX + variantsXSize * 0.9,
			y: variantsY + variantsYSize * 0.5,
			sides: 5,
			radius: variantsYSize / 2 - 7,
			fillRadialGradientStartPoint: 0,
			fillRadialGradientStartRadius: 0,
			fillRadialGradientEndPoint: 0,
			fillRadialGradientEndRadius: variantsYSize / 2 - 7,
			fillRadialGradientColorStops: [0, circleRed['color'], 0.5, circlePink['color'], 1, circleSad['color']],
			stroke: 'black',
			strokeWidth: 0
		},
		power: 70
	};

	var pentagonSBG = {
		draw: {
			x: variantsX + variantsXSize * 0.9,
			y: variantsY + variantsYSize * 0.5 + betweenVariants,
			sides: 5,
			radius: variantsYSize / 2 - 7,
			fillRadialGradientStartPoint: 0,
			fillRadialGradientStartRadius: 0,
			fillRadialGradientEndPoint: 0,
			fillRadialGradientEndRadius: variantsYSize / 2 - 7,
			fillRadialGradientColorStops: [0, circleSad['color'], 0.5, circleBlue['color'], 1, circleGreen['color']],
			stroke: 'black',
			strokeWidth: 0
		},
		power: 80
	};

	var pentagonGYR = {
		draw: {
			x: variantsX + variantsXSize * 0.9,
			y: variantsY + variantsYSize * 0.5 + betweenVariants * 2,
			sides: 5,
			radius: variantsYSize / 2 - 7,
			fillRadialGradientStartPoint: 0,
			fillRadialGradientStartRadius: 0,
			fillRadialGradientEndPoint: 0,
			fillRadialGradientEndRadius: variantsYSize / 2 - 7,
			fillRadialGradientColorStops: [0, circleGreen['color'], 0.5, circleYellow['color'], 1, circleRed['color']],
			stroke: 'black',
			strokeWidth: 0
		},
		power: 70
	};

	var pentagons = [pentagonRPS, pentagonSBG, pentagonGYR];

	var star = {
		color: '#BD931D',
		power: 100
	};

	let fields = Array(mapSize);
		for (let i = 0; i < mapSize; i++){
			fields[i] = Array(mapSize);
		}
		
		for (let i = 0; i < mapSize; i++){
			for (let j = 0; j < mapSize; j++){
				fields[i][j] = {
					tower: 0,
				};

				fields[i][j]['field'] = new Konva.Rect({
					x: mapX + j * fieldSize + j * 2,
					y: mapY + i * fieldSize + i * 2,
					width: fieldSize,
					height: fieldSize,
					fill: 'grey',
					stroke: 'black',
					strokeWidth: 2
				});

				fields[i][j]['field'].addEventListener('mousedown', function(){
					variantsShow = []
					generateTower(fields[i][j]);
					fields[i][j]['field'].setStroke('red');
					draw();
				});
			};
		};

		var variantRects = []
		for (let i = 0; i < 4; i++){
			rect = new Konva.Rect({
				x: variantsX,
				y: variantsY + i * betweenVariants,
				width: variantsXSize,
				height: variantsYSize,
				fill: 'grey',
				stroke: 'black',
				strokeWidth: 2
			})
			variantRects[i] = rect;
		}
		variantElements = []
		variantElements[0] = new Konva.Circle({
			x: variantsX + variantsXSize * 0.1,
			y: variantsY + variantsYSize * 0.5,
			radius: variantsYSize / 2 - 7,
			fill: circleRed['color'],
			stroke: 'black',
			strokeWidth: 0
		});

		variantElements[1] = new Konva.Circle({
			x: variantsX + variantsXSize * 0.3,
			y: variantsY + variantsYSize * 0.5,
			radius: variantsYSize / 2 - 7,
			fill: circlePink['color'],
			stroke: 'black',
			strokeWidth: 0
		});

		variantElements[2] = new Konva.Circle({
			x: variantsX + variantsXSize * 0.5,
			y: variantsY + variantsYSize * 0.5,
			radius: variantsYSize / 2 - 7,
			fill: circleSad['color'],
			stroke: 'black',
			strokeWidth: 0
		});

		variantElements[3] = new Konva.Arrow({
			x: variantsX + variantsXSize * 0.7,
			y: variantsY + variantsYSize * 0.5,
			points: [-variantsXSize * 0.1, 0, variantsXSize * 0.1, 0],
			pointerLength: 20,
			pointerWidth: 20,
			fill: 'red',
			stroke: 'red',
			strokeWidth: 4
		})

		variantElements[4] = new Konva.RegularPolygon(pentagonRPS['draw'])

		variantElements[5] = new Konva.Circle({
			x: variantsX + variantsXSize * 0.1,
			y: variantsY + variantsYSize * 0.5 + betweenVariants,
			radius: variantsYSize / 2 - 7,
			fill: circleSad['color'],
			stroke: 'black',
			strokeWidth: 0
		});

		variantElements[6] = new Konva.Circle({
			x: variantsX + variantsXSize * 0.3,
			y: variantsY + variantsYSize * 0.5 + betweenVariants,
			radius: variantsYSize / 2 - 7,
			fill: circleBlue['color'],
			stroke: 'black',
			strokeWidth: 0
		});

		variantElements[7] = new Konva.Circle({
			x: variantsX + variantsXSize * 0.5,
			y: variantsY + variantsYSize * 0.5 + betweenVariants,
			radius: variantsYSize / 2 - 7,
			fill: circleGreen['color'],
			stroke: 'black',
			strokeWidth: 0
		});

		variantElements[8] = new Konva.Arrow({
			x: variantsX + variantsXSize * 0.7,
			y: variantsY + variantsYSize * 0.5 + betweenVariants,
			points: [-variantsXSize * 0.1, 0, variantsXSize * 0.1, 0],
			pointerLength: 20,
			pointerWidth: 20,
			fill: 'red',
			stroke: 'red',
			strokeWidth: 4
		})

		variantElements[9] = new Konva.RegularPolygon(pentagonSBG['draw']);

		variantElements[10] = new Konva.Circle({
			x: variantsX + variantsXSize * 0.1,
			y: variantsY + variantsYSize * 0.5 + betweenVariants * 2,
			radius: variantsYSize / 2 - 7,
			fill: circleGreen['color'],
			stroke: 'black',
			strokeWidth: 0
		});

		variantElements[11] = new Konva.Circle({
			x: variantsX + variantsXSize * 0.3,
			y: variantsY + variantsYSize * 0.5 + betweenVariants * 2,
			radius: variantsYSize / 2 - 7,
			fill: circleYellow['color'],
			stroke: 'black',
			strokeWidth: 0
		});

		variantElements[12] = new Konva.Circle({
			x: variantsX + variantsXSize * 0.5,
			y: variantsY + variantsYSize * 0.5 + betweenVariants * 2,
			radius: variantsYSize / 2 - 7,
			fill: circleRed['color'],
			stroke: 'black',
			strokeWidth: 0
		});

		variantElements[13] = new Konva.Arrow({
			x: variantsX + variantsXSize * 0.7,
			y: variantsY + variantsYSize * 0.5 + betweenVariants * 2,
			points: [-variantsXSize * 0.1, 0, variantsXSize * 0.1, 0],
			pointerLength: 20,
			pointerWidth: 20,
			fill: 'red',
			stroke: 'red',
			strokeWidth: 4
		})

		variantElements[14] = new Konva.RegularPolygon(pentagonGYR['draw'])

		variantElements[15] = new Konva.RegularPolygon({
			x: variantsX + variantsXSize * 0.1,
			y: variantsY + variantsYSize * 0.5 + betweenVariants * 3,
			sides: 5,
			radius: variantsYSize / 2 - 7,
			fillRadialGradientStartPoint: 0,
			fillRadialGradientStartRadius: 0,
			fillRadialGradientEndPoint: 0,
			fillRadialGradientEndRadius: variantsYSize / 2 - 7,
			fillRadialGradientColorStops: [0, circleRed['color'], 0.5, circlePink['color'], 1, circleSad['color']],
			stroke: 'black',
			strokeWidth: 0
		})

		variantElements[16] = new Konva.RegularPolygon({
			x: variantsX + variantsXSize * 0.3,
			y: variantsY + variantsYSize * 0.5 + betweenVariants * 3,
			sides: 5,
			radius: variantsYSize / 2 - 7,
			fillRadialGradientStartPoint: 0,
			fillRadialGradientStartRadius: 0,
			fillRadialGradientEndPoint: 0,
			fillRadialGradientEndRadius: variantsYSize / 2 - 7,
			fillRadialGradientColorStops: [0, circleSad['color'], 0.5, circleBlue['color'], 1, circleGreen['color']],
			stroke: 'black',
			strokeWidth: 0
		})

		variantElements[17] = new Konva.RegularPolygon({
			x: variantsX + variantsXSize * 0.5,
			y: variantsY + variantsYSize * 0.5 + betweenVariants * 3,
			sides: 5,
			radius: variantsYSize / 2 - 7,
			fillRadialGradientStartPoint: 0,
			fillRadialGradientStartRadius: 0,
			fillRadialGradientEndPoint: 0,
			fillRadialGradientEndRadius: variantsYSize / 2 - 7,
			fillRadialGradientColorStops: [0, circleGreen['color'], 0.5, circleYellow['color'], 1, circleRed['color']],
			stroke: 'black',
			strokeWidth: 0
		})

		variantElements[18] = new Konva.Arrow({
			x: variantsX + variantsXSize * 0.7,
			y: variantsY + variantsYSize * 0.5 + betweenVariants * 3,
			points: [-variantsXSize * 0.1, 0, variantsXSize * 0.1, 0],
			pointerLength: 20,
			pointerWidth: 20,
			fill: 'red',
			stroke: 'red',
			strokeWidth: 4
		})

		variantElements[19] = new Konva.Star({
			x: variantsX + variantsXSize * 0.9,
			y: variantsY + variantsYSize * 0.5 + betweenVariants * 3,
			numPoints: 5,
			innerRadius: variantsYSize / 4 - 7,
			outerRadius: variantsYSize / 2 - 7,
			radius: variantsYSize / 2 - 7,
			fillRadialGradientStartPoint: 0,
			fillRadialGradientStartRadius: 0,
			fillRadialGradientEndPoint: 0,
			fillRadialGradientEndRadius: variantsYSize / 2 - 7,
			fillRadialGradientColorStops: [0, circleGreen['color'], 0.5, circleSad['color'], 1, circleRed['color']],
			stroke: 'black',
			strokeWidth: 0
		})

	function draw(){
		let stage = new Konva.Stage({
			container: 'konva',
			width : window.innerWidth,
			height : window.innerHeight
		});
		var layer = new Konva.Layer();

		for (let i = 0; i < mapSize; i++){
			for (let j = 0; j < mapSize; j++){
				layer.add(fields[i][j]['field']);
				if (fields[i][j]['tower']){
					layer.add(fields[i][j]['tower']);
				}
				
			};
		};
		
		for (let i = 0; i < variantRects.length; i++){
			layer.add(variantRects[i]);
		};
		for (let i = 0; i < variantElements.length; i++){
			layer.add(variantElements[i]);
		}
		for (let i = 0; i < variantsShow.length; i++){
			layer.add(variantsShow[i]);
		}
		for (let i = 0; i < enemies.length; i++){
			layer.add(enemies[i]);
		}
		for (kindTowers in towers){
			for (let i = 0; i < towers[kindTowers].length; i++){
				for (let j = 0; j < towers[kindTowers][i]['bulletes'].length; j++) {
					layer.add(towers[kindTowers][i]['bulletes'][j])
				}
			}
		}

		for (let i = 0; i < fieldsNewTower.length; i++){
			layer.add(fieldsNewTower[i]['towerDraw'])
		}


		stage.add(layer);
	}

	function show_variants(field){
		variantsShow = []
		//console.log(field);
		let currentNerTower = undefined
		let variantStay;
		for (let i = 0; i < fieldsNewTower.length; i++){
			if ((field['field'].getX() + fieldSize / 2 == fieldsNewTower[i]['towerDraw'].getX()) && (field['field'].getY() + fieldSize / 2 == fieldsNewTower[i]['towerDraw'].getY())){
				currentNerTower = fieldsNewTower[i];
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

	function listVariantsForNew(field){
		let variants = [];

	}

	function listVariants(field){
		let variants = [];
		if (((towers['circleRed'].length > 0) && (towers['circlePink'].length > 0) && (towers['circleSad'].length > 0))){
			variants.push(pentagonRPS);
		};
		if ((towers['circleSad'].length > 0) && (towers['circleBlue'].length > 0) && (towers['circleGreen'].length > 0)){
			variants.push(pentagonSBG);
		};
		if ((towers['circleGreen'].length > 0) && (towers['circleYellow'].length > 0) && (towers['circleRed'].length > 0)){
			variants.push(pentagonGYR);
		};
		return variants
	}

	function generateTower(field){

		let circlePro = circles[Math.floor(Math.random() * circles.length)]
		let circle = new Konva.Circle({
			x: field['field'].getX() + fieldSize / 2,
			y: field['field'].getY() + fieldSize / 2,
			radius: fieldSize / 2 - 2,
			fill: circlePro['color'],
			stroke: 'black',
			strokeWidth: 0
		});
		field['field'].removeEventListener('mousedown', function(){
			variantsShow = []
			generateTower(fields[i][j]);
			fields[i][j]['field'].setStroke('red');
			draw();
		});
		circle['bulletes'] = []
		circle.addEventListener('mousedown', function(){show_variants(field)} );
		newTower = {
			towerKind: circlePro,
			towerDraw: circle,
		}
		fieldsNewTower.push(newTower);
		//towers[circlePro['name']].push(circle);
		//field['tower'] = circle;
		newStones++;
	}

	function game(){
		draw()
		playerStep()
	}

	function playerStep(){
		var playerStepTimer = setInterval(function(){
			draw()
			if (newStones >= 5){
				for (let i = 0; i < mapSize; i++){
					for (let j = 0; j < mapSize; j++){
						fields[i][j]['field'].removeEventListener('mousedown', function(){
							variantsShow = []
							generateTower(fields[i][j]);
							fields[i][j]['field'].setStroke('red');
							draw();
						});
					}
				}
				waveButton = new Konva.Rect({
					x: variantsX,
					y: variantsY + 4 * betweenVariants,
					width: variantsXSize,
					height: variantsYSize,
					fill: 'grey',
					stroke: 'black',
					strokeWidth: 2
				})
				waveButton.addEventListener('mousedown', function(){
					newStones = 0;
					variantRects.length = 4
					clearInterval(playerStepTimer);
					wave()
				})
				variantRects.push(waveButton);
			}
		}, 100/6)

	}

	function wave(){

		for (kindTowers in towers){
			for (let i = 0; i < towers[kindTowers].length; i++){
				towers[kindTowers][i].bulletes = [];
				
				let currentTower = towers[kindTowers][i]
				towers[kindTowers][i]['bulletTimer'] = setInterval(function(){
					if (!isEndWave){
						bullet  = new Konva.Circle({
							x: currentTower.getX(),
							y: currentTower.getY(),
							radius: 5,
							fill: circleRed['color'],
							stroke: 'black',
							strokeWidth: 0
						})
						currentTower.bulletes.push(bullet);
					}
					for (kindTowers in towers){
						for (let i = 0; i < towers[kindTowers].length; i++){
							let distY = enemies[0].getY() - towers[kindTowers][i].getY()
							let distX = enemies[0].getX() - towers[kindTowers][i].getX()
							let stepX = bulletStep / Math.pow(1 + Math.pow(distY/distX, 2), 0.5) * Math.abs(distX) / distX;
							let stepY = Math.pow(bulletStep * bulletStep - stepX * stepX, 0.5) * Math.abs(distY) / distY
							for (let j = 0; j < towers[kindTowers][i]['bulletes'].length; j++){
								towers[kindTowers][i]['bulletes'][j].setX(towers[kindTowers][i]['bulletes'][j].getX() + stepX);
								towers[kindTowers][i]['bulletes'][j].setY(towers[kindTowers][i]['bulletes'][j].getY() + stepY);
							}
						}
					}
				}, 100/6)
			};
		};

		enemies.push(new Konva.Rect(enemie))
		var waveTimer = setInterval(function(){
			draw()
			enemies[0].setY(enemies[0].getY() + 10)
			if (enemies[0].getY() > mapY + mapSize * fieldSize){
				clearInterval(waveTimer);
				enemies = []
				endWave()
			}
		}, 100/6)
	}

	function endWave(){
		for (let i = 0; i < mapSize; i++){
			for (let j = 0; j < mapSize; j++){
				fields[i][j]['field'].addEventListener('mousedown', function(){
					variantsShow = []
					generateTower(fields[i][j]);
					fields[i][j]['field'].setStroke('red');
					draw();
				});
			}
		}
		playerStep()
	}

	game();
	//draw()


})();
