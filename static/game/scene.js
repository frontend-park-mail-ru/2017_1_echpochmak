import Settings from './settings.js'

export default
class Scene {
	constructor() {
		this.state = {};
		this.settings = new Settings;

		this.stage = new Konva.Stage({
			container: this.settings.gameFieldId,
			width : this.settings.gameFieldElement.offsetWidth,
			height : this.settings.gameFieldElement.offsetHeight
		});

		this.layer = new Konva.Layer();
	}

	setState(state) {
		this.state = state;
	}

	render() {

		let length = this.layer.children.length;
		for (let i = 0; i < length; i++) {
			this.layer.children[0].remove();
		}

		console.log(this.layer.children.length);

		for (let i = 0; i < this.settings.mapSize; i++){
			for (let j = 0; j < this.settings.mapSize; j++){
				this.layer.add(this.state.fields[i][j].field);
				if (this.state.fields[i][j].tower){
					this.layer.add(this.state.fields[i][j].tower.draw);
				};
				
			};
		};
		for (let i = 0; i < this.state.fieldsNewTower.length; i++){
			this.layer.add(this.state.fieldsNewTower[i].draw)
		}

		for (let i = 0; i < this.state.variantRects.length; i++){
			this.layer.add(this.state.variantRects[i].draw);

		};
		//for (let i = 0; i < this.state.variantElements.length; i++){
		//	this.layer.add(this.state.variantElements[i]);
		//}
		for (let i = 0; i < this.state.variantsShow.length; i++){
			this.layer.add(this.state.variantsShow[i].draw);
		}
		for (let i = 0; i < this.state.enemies.length; i++){
			this.layer.add(this.state.enemies[i].draw);
		}

		for (let i = 0; i < this.state.fieldsWithTowers.length; i++){
			for (let j = 0; j < this.state.fieldsWithTowers[i].tower.bulletes.length; j++){
				this.layer.add(this.state.fieldsWithTowers[i].tower.bulletes[j])
			}
		}

		this.stage.add(this.layer);
	}
}