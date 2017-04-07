import Setting from './settings.js'

export default
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

		for (let i = 0; i < Setting.mapSize; i++){
			for (let j = 0; j < Setting.mapSize; j++){
				// console.log(this.state.fields[i][j].field)
				layer.add(this.state.fields[i][j].field);
				if (this.state.fields[i][j].tower){
					layer.add(this.state.fields[i][j].tower);
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
			layer.add(this.state.variantsShow[i]);
		}
		for (let i = 0; i < this.state.enemies.length; i++){
			layer.add(this.state.enemies[i]);
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
			x: Setting.mapX + 50,
			y: Setting.mapY + 50,
			radius: 50,
			stroke: 'black',
			strokeWidth: 0,
			fill: 'red'
		});

		layer.add(circle);

		stage.add(layer);
	}
}